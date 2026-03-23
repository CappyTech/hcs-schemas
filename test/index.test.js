'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const schemas = require('../index');

describe('hcs-schemas', () => {
  const entityNames = [
    'customer', 'supplier', 'invoice', 'purchase',
    'quote', 'project', 'nominal', 'note', 'vatRate',
  ];

  it('exports all 9 entities', () => {
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

  it('supplier CISRate has enum constraint', () => {
    const cis = schemas.supplier.fields.CISRate;
    assert.deepEqual(cis.enum, [null, 0, 0.2, 0.3]);
  });

  it('each uuid default generates unique values', () => {
    const a = schemas.uuidField.default();
    const b = schemas.uuidField.default();
    assert.notEqual(a, b);
  });
});
