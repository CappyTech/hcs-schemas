# hcs-schemas

Shared REST schema field definitions for [hcs-app](https://github.com/CappyTech/hcs-app) and [hcs-sync](https://github.com/CappyTech/hcs-sync).

Zero dependencies. Exports plain JS field definitions that both repos wrap into Mongoose schemas.

## Entities

customer, supplier, invoice, purchase, quote, project, nominal, note, vatRate

## Usage

```js
// CommonJS (hcs-app)
const { customer, uuidField } = require('@cappytech/hcs-schemas');

// ESM (hcs-sync)
import schemas from '@cappytech/hcs-schemas';
const { customer, uuidField } = schemas;

// Each entity: { collection, fields, indexes }
const schema = new mongoose.Schema({
  uuid: uuidField,
  ...customer.fields,
}, { timestamps: true });

customer.indexes.forEach(idx => schema.index(idx.fields, idx.options));
```

## Publishing

Tag a release to publish to GitHub Packages:

```bash
npm version patch   # or minor / major
git push --follow-tags
```

## Installing in consuming repos

Add to `.npmrc`:
```
@cappytech:registry=https://npm.pkg.github.com
```

Then:
```bash
npm install @cappytech/hcs-schemas
```

For Docker builds, pass the token as a build secret — see each repo's Dockerfile.
