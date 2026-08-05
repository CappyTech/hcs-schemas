import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import schemas from '../index.js';

describe('hcs-schemas', () => {
  const entityNames = [
    'customer', 'supplier', 'invoice', 'purchase',
    'quote', 'project', 'nominal', 'note', 'vatRate',
    'bankAccount', 'bankTransaction', 'bankReconciliation', 'journal', 'product',
    'purchaseOrder', 'purchaseOrderCategory', 'quoteCategory',
    'currency', 'country', 'accountingPeriod', 'vatReturn',
  ];

  it('exports all entities', () => {
    for (const name of entityNames) {
      assert.ok(schemas[name], `missing entity: ${name}`);
    }
  });

  it('exports uuidField with default function', () => {
    assert.equal(schemas.uuidField.type, String);
    assert.equal(schemas.uuidField.unique, true);
    assert.equal(schemas.uuidField.required, true);
    assert.equal(typeof schemas.uuidField.default, 'function');
    const uuid = schemas.uuidField.default();
    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  for (const name of entityNames) {
    describe(name, () => {
      it('has collection, fields, and indexes', () => {
        const entity = schemas[name];
        assert.equal(typeof entity.collection, 'string');
        assert.equal(typeof entity.fields, 'object');
        assert.ok(Array.isArray(entity.indexes));
      });

      it('fields use only plain JS types and objects', () => {
        const entity = schemas[name];
        for (const [key, val] of Object.entries(entity.fields)) {
          const t = typeof val;
          assert.ok(
            t === 'function' || t === 'object',
            `${name}.${key} has unexpected type: ${t}`
          );
        }
      });
    });
  }

  it('purchase exports paymentLineFields', () => {
    assert.equal(typeof schemas.purchase.paymentLineFields, 'object');
    assert.ok(schemas.purchase.paymentLineFields.Amount === Number);
  });

  it('invoice exports paymentLineFields', () => {
    assert.equal(typeof schemas.invoice.paymentLineFields, 'object');
    assert.ok(schemas.invoice.paymentLineFields.Amount === Number);
  });

  it('invoice keeps PaymentLines in fields for backward compatibility', () => {
    // A consumer that only spreads `...invoice.fields` (hcs-app before 2.1.0)
    // must still get PaymentLines, or it silently loses them on the next build
    // — the schemas dependency is a branch tip, so that happens with no version
    // bump. Consumers wanting typing set PaymentLines after the spread.
    assert.deepEqual(schemas.invoice.fields.PaymentLines, [{}]);
  });

  it('purchase omits PaymentLines from fields', () => {
    // Unlike invoices, every purchase consumer already wraps paymentLineFields,
    // so a stray [{}] here would just be dead weight.
    assert.equal(schemas.purchase.fields.PaymentLines, undefined);
  });

  it('both payment line shapes carry the fields reconciliation joins on', () => {
    for (const name of ['invoice', 'purchase']) {
      const pl = schemas[name].paymentLineFields;
      assert.equal(pl.Date, Date, `${name}.PaymentLines.Date must be a Date`);
      assert.equal(pl.AccountId, Number, `${name}.PaymentLines.AccountId`);
      assert.equal(pl.BulkPaymentNumber, Number, `${name}.PaymentLines.BulkPaymentNumber`);
      // Undocumented upstream, but present on every live payload and the only
      // link to KashFlow's own reconciliation.
      assert.equal(pl.BankReconciliationId, Number, `${name}.PaymentLines.BankReconciliationId`);
    }
  });

  it('bankTransaction declares the document-link fields', () => {
    // EntityName + ResourceNumber is how a bank line resolves to the document
    // it settles. Both must be declared, not left to strict:false.
    assert.equal(schemas.bankTransaction.fields.EntityName, String);
    assert.equal(schemas.bankTransaction.fields.ResourceNumber, Number);
  });

  it('bankTransaction keys on (AccountId, Id), not a bare Id', () => {
    // An internal transfer is two ledger lines sharing one KashFlow Id, one per
    // account. A unique index on Id alone merges them and the per-account sync
    // then overwrites one half with the other on every run.
    const unique = schemas.bankTransaction.indexes.filter(i => i.options?.unique);
    assert.equal(unique.length, 1);
    assert.deepEqual(unique[0].fields, { AccountId: 1, Id: 1 });

    // Id must stay indexed for lookups by KashFlow id, just not uniquely.
    const byId = schemas.bankTransaction.indexes
      .find(i => Object.keys(i.fields).length === 1 && i.fields.Id === 1);
    assert.ok(byId, 'expected a single-field index on Id');
    assert.ok(!byId.options?.unique, 'the Id index must not be unique');
  });

  it('bankReconciliation keys on the composite, not a bare Id', () => {
    // KashFlow's reconciliation Id is only known to be unique within an
    // account, so a bare unique index on Id could collide across accounts.
    const unique = schemas.bankReconciliation.indexes.filter(i => i.options?.unique);
    assert.equal(unique.length, 1);
    assert.deepEqual(unique[0].fields, { ReconKey: 1 });
    assert.equal(schemas.bankReconciliation.fields.ReconKey, String);
  });

  it('bankReconciliation exports transactionFields', () => {
    assert.equal(typeof schemas.bankReconciliation.transactionFields, 'object');
    assert.equal(schemas.bankReconciliation.transactionFields.PaidIn, Number);
  });

  it('supplier CISRate has enum constraint', () => {
    const cis = schemas.supplier.fields.CISRate;
    assert.deepEqual(cis.enum, [null, 0, 0.2, 0.3]);
  });

  it('each uuid default generates unique values', () => {
    const a = schemas.uuidField.default();
    const b = schemas.uuidField.default();
    assert.notEqual(a, b);
  });

  it('named exports match default export', async () => {
    const named = await import('../index.js');
    for (const name of entityNames) {
      assert.equal(named[name], schemas[name], `named export mismatch: ${name}`);
    }
    assert.equal(named.uuidField, schemas.uuidField);
  });
});
