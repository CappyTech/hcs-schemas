# hcs-schemas — AI Agent Reference

Shared REST schema field definitions for **hcs-app** and **hcs-sync**.

## Key Facts

- **Zero dependencies** — no Mongoose, no runtime libs.
- **CJS format** — ESM imports CJS natively, so both repos can consume it.
- **Published to GitHub Packages** as `@cappytech/hcs-schemas`.
- **9 entities:** customer, supplier, invoice, purchase, quote, project, nominal, note, vatRate.

## Structure

Each entity file in `lib/` exports `{ collection, fields, indexes }`. The purchase also exports `paymentLineFields` for the PaymentLines sub-document.

`index.js` re-exports all entities plus `uuidField` (a field definition with `crypto.randomUUID()` default).

## Workflow

1. Edit field definitions in `lib/<entity>.js`
2. Run `npm test`
3. `npm version patch && git push --follow-tags`
4. CI publishes to GitHub Packages
5. Update `@cappytech/hcs-schemas` in hcs-app and hcs-sync

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
