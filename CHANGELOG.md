# Changelog

All notable changes to hcs-schemas will be documented here. Format follows [Keep a Changelog](https://keepachangelog.com/). Versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.2] - 2026-07-08

### Added
- **`bankAccount` entity** (`lib/bankAccount.js`, collection `bankaccounts`) — full KashFlow bank account shape from `GET /bankaccounts` / `GET /bankaccounts/{id}`, including detail-only fields (`StartingDate`, `StartingAmount`, `ShowPaidInFirst`, `IncludeOnDashBoard`, `Note`, `OverrideTransactionLock`). Unique sparse index on `Id`, secondary on `Code`. Consumed by hcs-sync (sync target) and hcs-app (payment-line account selector on subcontractor drafts).

### Fixed
- **`purchase.paymentLineFields` was missing `BankTransactionId`.** KashFlow documents it on both the payment-line request and response, but because the payment-line subdocument schema is strict (the parent purchase's `strict: false` does not cascade into typed sub-schemas), the field was silently stripped from synced payment lines.

## [1.0.1] - 2026-06-10

Initial changelog entry. Version reflects the state of the codebase at this point.
