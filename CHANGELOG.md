# Changelog

All notable changes to hcs-schemas will be documented here. Format follows [Keep a Changelog](https://keepachangelog.com/). Versioning follows [Semantic Versioning](https://semver.org/).

## [2.1.0] - 2026-08-03

Groundwork for bank reconciliation in hcs-app. Additive: no field is removed or
retyped in a way that drops data, so consumers can adopt it independently.

### Added
- **`bankReconciliation`** (`bankreconciliations`) — KashFlow's own reconciliation
  headers from `GET /bankaccounts/{id}/reconciliations`, mirrored **read-only**.
  Also exports `transactionFields` for the detail endpoint's `Transactions[]`.
  Keyed on a synthetic `ReconKey` (`"<AccountId>:<Id>"`) rather than a bare
  `Id`: KashFlow's reconciliation Id is only known to be unique *within* an
  account (the account appears solely in the request URL), and hcs-sync's upsert
  engine matches on a single key field, so the composite is materialised as a
  real field. `AccountId` and `ReconKey` are both injected by hcs-sync during
  the per-account fan-out — KashFlow returns neither.
- **`invoice.paymentLineFields`** — invoice payment lines were previously
  `PaymentLines: [{}]` (untyped Mixed with raw `"YYYY-MM-DD HH:mm:ss"` date
  strings), which made them unqueryable. Now a declared sub-document shape, as
  purchases already had. Deliberately **not** the same field set as
  `purchase.paymentLineFields`: invoices carry `Reference` and `InvoiceNumber`,
  purchases carry `PayDate`. `invoice.fields.PaymentLines` is **deliberately
  left as `[{}]`** so a consumer that only spreads `...invoice.fields` keeps
  working; wrapping is opt-in by setting `PaymentLines` after the spread.
- **`BankReconciliationId`** on both payment-line shapes. Undocumented upstream
  but present on every live payload, and the only link from a payment to
  KashFlow's own reconciliation.
- **`bankTransaction.EntityName`** — previously left to `strict:false` as a
  server-computed list-only field. `EntityName` + `ResourceNumber` is how a bank
  line resolves to the document it settles, so it is now declared and indexed.
- Indexes for reconciliation access paths: `bankTransaction`
  `{AccountId, Reconciled, Date}` and `{EntityName, ResourceNumber}`;
  `invoice`/`purchase` `{IssuedDate}` and `{PaymentLines.BulkPaymentNumber}`
  (the latter resolves a batch-payment bank line to the documents it settled).

### Changed
- `purchase.paymentLineFields.PaymentProcessorEnumValue` retyped `Number` → `{}`
  (Mixed). KashFlow returns it as a string enum name (`'NoCardPayments'`) on
  purchases but a number on invoices; the `Number` declaration would fail to
  cast on hydration. Lossless — nothing was storing a number there.

### Notes
- `PaymentLines[].BankTransactionId` is `0` on **every** live invoice and
  purchase. Despite its name it is not a usable link to a bank transaction; it
  is kept in the shape only so the field round-trips.
- `bankTransaction.Date` is declared `Date` here but hcs-sync currently stores a
  string, because sync upserts through the native driver with `$literal` and so
  bypasses Mongoose casting. Fixing that requires a `transform` in hcs-sync —
  declaring the type in this package is not sufficient on its own.

## [2.0.0] - 2026-07-23

### Changed
- **Package converted from CommonJS to ESM** (`"type": "module"`). All `lib/*.js` files now use `export default`; `index.js` provides both named exports (`import { customer, uuidField } from '@cappytech/hcs-schemas'`) and a default export (`import schemas from '@cappytech/hcs-schemas'`), so both existing consumer styles keep working unchanged.
- Added an `exports` map (`".": "./index.js"`).

### Breaking
- CommonJS consumers can no longer `require('@cappytech/hcs-schemas')` on Node < 20.19 (Node 20.19+/22.12+ support `require(esm)`). hcs-app and hcs-sync both consume it via `import` from their ESM builds.

## [1.1.0] - 2026-07-09

### Added
Ten new KashFlow entity definitions, extending API parity toward the full KashFlow v2 surface. Each exports the usual `{ collection, fields, indexes }` and is wired into `index.js`:

- **`bankTransaction`** (`banktransactions`) — per-account transactions from `GET /bankaccounts/{accountId}/transactions`. Unique sparse `Id`, compound `AccountId+Date`.
- **`journal`** (`journals`) — `GET /journals`; `Lines` kept as Mixed (line shape undocumented).
- **`product`** (`products`) — `GET /products`; stock fields included.
- **`purchaseOrder`** (`purchaseorders`) — `GET /purchaseorders`; mirrors the purchase shape with `DeliveryDate`/`Category`.
- **`purchaseOrderCategory`** (`purchaseordercategories`) and **`quoteCategory`** (`quotecategories`) — `{Number, Name, IconId, IconType, IconColor}` with unique `Number`.
- **`currency`** (`currencies`) — `GET /currencies`.
- **`country`** (`countries`) — `GET /countries` (`Id`, `Code`, `Name`, `IsEU`).
- **`accountingPeriod`** (`accountingperiods`) — `GET /accountingperiods`.
- **`vatReturn`** (`vatreturns`) — `GET /vatreturns`; full Box1–Box9 + submission/ECSL metadata.

Test suite now asserts all 20 exported entities.

## [1.0.2] - 2026-07-08

### Added
- **`bankAccount` entity** (`lib/bankAccount.js`, collection `bankaccounts`) — full KashFlow bank account shape from `GET /bankaccounts` / `GET /bankaccounts/{id}`, including detail-only fields (`StartingDate`, `StartingAmount`, `ShowPaidInFirst`, `IncludeOnDashBoard`, `Note`, `OverrideTransactionLock`). Unique sparse index on `Id`, secondary on `Code`. Consumed by hcs-sync (sync target) and hcs-app (payment-line account selector on subcontractor drafts).

### Fixed
- **`purchase.paymentLineFields` was missing `BankTransactionId`.** KashFlow documents it on both the payment-line request and response, but because the payment-line subdocument schema is strict (the parent purchase's `strict: false` does not cascade into typed sub-schemas), the field was silently stripped from synced payment lines.

## [1.0.1] - 2026-06-10

Initial changelog entry. Version reflects the state of the codebase at this point.
