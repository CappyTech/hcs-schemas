# Changelog

All notable changes to hcs-schemas will be documented here. Format follows [Keep a Changelog](https://keepachangelog.com/). Versioning follows [Semantic Versioning](https://semver.org/).

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
