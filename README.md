# hcs-schemas

Shared Mongo field definitions for [hcs-app](https://github.com/CappyTech/hcs-app) and [hcs-sync](https://github.com/CappyTech/hcs-sync). It is the contract between them: a sync adapter writes these collections, and hcs-app reads them without knowing which provider filled them.

It has no dependencies and no Mongoose. It exports plain field definitions (`String`, `Number`, `Boolean`, `Date`, `{}` for Mixed), and each consumer wraps them in its own Mongoose schemas with its own options.

## Entities

Each entity is `{ collection, fields, indexes }`, and some also export sub-document shapes.

### Accounting: KashFlow mirror (hcs-sync → REST database)

| Entity | Collection | Notes |
|---|---|---|
| `customer` | `customers` | |
| `supplier` | `suppliers` | |
| `invoice` | `invoices` | `invoice.paymentLineFields` |
| `purchase` | `purchases` | `purchase.paymentLineFields` |
| `quote` | `quotes` | |
| `project` | `projects` | |
| `nominal` | `nominals` | |
| `note` | `notes` | |
| `vatRate` | `vatrates` | |
| `bankAccount` | `bankaccounts` | |
| `bankTransaction` | `banktransactions` | Keyed on `(AccountId, Id)`; a transfer is two lines |
| `bankReconciliation` | `bankreconciliations` | `bankReconciliation.transactionFields` |
| `journal` | `journals` | |
| `product` | `products` | |
| `purchaseOrder` | `purchaseorders` | |
| `purchaseOrderCategory` | `purchaseordercategories` | |
| `quoteCategory` | `quotecategories` | |
| `currency` | `currencies` | |
| `country` | `countries` | |
| `accountingPeriod` | `accountingperiods` | |
| `vatReturn` | `vatreturns` | |

### Payroll: external payroll provider (hcs-sync → `staffology` database), 3.1.0+

These are provider-neutral: `Source` names the provider (`'staffology'` today) and `ExternalId` is that provider's id. They live in their **own database**, not the accounting mirror.

| Entity | Collection | Notes |
|---|---|---|
| `payrollEmployee` | `payrollemployees` | Payroll code, name, status, pay basis, period and rates. Keyed on `(Source, ExternalId)`. |
| `payrollPayRunEntry` | `payrollpayrunentries` | One employee's line in one pay run: tax year (start year, so 2026 = 2026/27), period, start/end/payment dates, closed flag, the basic pay options paid that period (`PayBasis`, `BaseHourlyRate`, `BaseDailyRate`, `PayAmount`, `PayAmountMultiplier`), `Totals`, `PayLines`. Keyed on `(Source, ExternalId)`. Also exports `totalsFields` and `payLineFields`. |

No NI numbers, dates of birth, addresses or bank details: hcs-app matches employees by `PayrollCode` against its own `employee.payroll.payrollId`.

`uuidField` is exported alongside the entities: a required, unique string with a `crypto.randomUUID()` default.

## Usage

The package is ESM (`"type": "module"`). Import the **default export and destructure** it; don't use named imports. This works on both sides of the 1.x (CJS) → 2.x (ESM) boundary.

```js
import mongoose from 'mongoose';
import schemas from '@cappytech/hcs-schemas';
const { customer, uuidField } = schemas;

const schema = new mongoose.Schema(
  { uuid: uuidField, ...customer.fields },
  { collection: customer.collection, timestamps: true },
);
customer.indexes.forEach((idx) => schema.index(idx.fields, idx.options));
```

**Guard new entities.** A consumer pinned to an older release gets `undefined` for an entity added later, and building a schema from `undefined` throws at import time. Check that the entity exists and skip that model if it doesn't:

```js
if (schemas.payrollEmployee) { /* build the model */ }
```

## How consumers get a new version

Both consumers depend on `"@cappytech/hcs-schemas": "github:CappyTech/hcs-schemas"`. Their `package-lock.json` pins that to a **commit**, and their CI installs with `npm ci`. So merging here changes nothing downstream until each consumer re-resolves the dependency and commits its lockfile:

```bash
# in hcs-sync and hcs-app
npm update @cappytech/hcs-schemas
git add package-lock.json && git commit -m "Update @cappytech/hcs-schemas to x.y.z"
```

Keep changes additive wherever possible, so a consumer still pinned to an older commit keeps working.

## Releasing

1. Edit `lib/<entity>.js`. For a new entity, also register it in **both** the named `export {}` block and the `export default {}` object in `index.js`, and add it to `entityNames` in `test/index.test.js`.
2. Run `npm test`.
3. Add a `CHANGELOG.md` entry.
4. Run `npm version minor` for new entities or fields, `patch` for fixes, or `major` for a rename or removal (consumers must change).
5. Run `git push --follow-tags`. The `v*` tag runs **Build & Publish** to GitHub Packages. A push without a tag only runs the tests.
6. Re-pin both consumers, as shown above.

Only this repo gets `v*` tags. hcs-app and hcs-sync don't.
