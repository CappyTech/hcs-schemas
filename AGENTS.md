# hcs-schemas — AI Agent Reference

Shared REST schema field definitions for **hcs-app** and **hcs-sync**.

## Key Facts

- **Zero dependencies** — no Mongoose, no runtime libs.
- **ESM** (`"type": "module"`). Consumers import the **default export and
  destructure** — never named imports. That is the interop path that works
  across the 1.x (CJS) → 2.x (ESM) boundary, so app and schema releases are not
  deploy-order-coupled.
- **21 entities:** customer, supplier, invoice, purchase, quote, project,
  nominal, note, vatRate, bankAccount, bankTransaction, bankReconciliation,
  journal, product, purchaseOrder, purchaseOrderCategory, quoteCategory,
  currency, country, accountingPeriod, vatReturn.

## Structure

Each entity file in `lib/` exports `{ collection, fields, indexes }`. Sub-document
shapes are exported alongside for consumers to wrap: `invoice.paymentLineFields`,
`purchase.paymentLineFields`, `bankReconciliation.transactionFields`. A
sub-document shape must **not** also appear in `fields` — a stray `PaymentLines:
[{}]` there silently wins and drops the typing. There is a test for this.

`index.js` re-exports all entities plus `uuidField` (a field definition with
`crypto.randomUUID()` default). **Register a new entity in BOTH the named
`export {}` block and the `export default {}` object** — they are separate lists
and adding to only one is the easiest mistake to make here. The test suite
cross-checks them.

## Workflow

1. Edit field definitions in `lib/<entity>.js`
2. Add the entity to `entityNames` in `test/index.test.js`; run `npm test`
3. `npm version minor` (new entities/fields) or `patch`; `git push --follow-tags`
4. Update `@cappytech/hcs-schemas` in hcs-app and hcs-sync

> **Deploy-order hazard.** Both consumers depend on
> `"@cappytech/hcs-schemas": "github:CappyTech/hcs-schemas"` — a *branch-tip*
> git dependency, not a version range. Pushing `main` changes what the next
> image build of **both** repos installs, with no version bump required and no
> signal that anything changed. Keep every change additive, or pin both
> consumers to a tag (`#v2.1.0`) in the same change that lands the schema edit.

## Gotchas found in live data

- `bankTransaction.Date` is declared `Date` but hcs-sync writes it as a
  **string**: sync upserts through the native driver with `$literal`, which
  bypasses Mongoose casting entirely. Declaring a type here does not guarantee
  the stored type — the sync needs an explicit `transform`.
- `PaymentLines[].BankTransactionId` is `0` on every live invoice and purchase.
  Despite the name it is **not** a usable link to a bank transaction; the link
  runs the other way via `bankTransaction.EntityName` + `ResourceNumber`.
- `PaymentLines[].PaymentProcessorEnumValue` comes back as a **string** enum
  name on purchases (`'NoCardPayments'`) and a **number** on invoices, so it is
  typed `{}` rather than `Number`.
- `BankReconciliationId` on payment lines is undocumented upstream but present
  on every live payload, and is the only link to KashFlow's own reconciliation.

## Types

Uses JS built-in constructors and plain objects that Mongoose understands natively:

| This package | Mongoose interprets as |
|---|---|
| `String` | SchemaTypes.String |
| `Number` | SchemaTypes.Number |
| `Boolean` | SchemaTypes.Boolean |
| `Date` | SchemaTypes.Date |
| `{}` | SchemaTypes.Mixed |
| `[{}]` | Array of Mixed |
