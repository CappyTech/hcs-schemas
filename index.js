'use strict';

const crypto = require('crypto');

/**
 * Shared REST schema definitions for hcs-app and hcs-sync.
 *
 * Each entity exports { collection, fields, indexes } (and optionally
 * sub-schema fields like paymentLineFields for purchases).
 *
 * Types use JS built-ins (String, Number, Boolean, Date) and {} for Mixed.
 * No Mongoose dependency — both repos wrap these into Mongoose schemas
 * with their own options (timestamps, strict, sync metadata, etc.).
 */

const uuidField = {
  type: String,
  unique: true,
  required: true,
  default: () => crypto.randomUUID(),
};

module.exports = {
  uuidField,
  customer:  require('./lib/customer'),
  supplier:  require('./lib/supplier'),
  invoice:   require('./lib/invoice'),
  purchase:  require('./lib/purchase'),
  quote:     require('./lib/quote'),
  project:   require('./lib/project'),
  nominal:   require('./lib/nominal'),
  note:      require('./lib/note'),
  vatRate:   require('./lib/vatRate'),
  bankAccount: require('./lib/bankAccount'),
  bankTransaction: require('./lib/bankTransaction'),
  journal:   require('./lib/journal'),
  product:   require('./lib/product'),
  purchaseOrder: require('./lib/purchaseOrder'),
  purchaseOrderCategory: require('./lib/purchaseOrderCategory'),
  quoteCategory: require('./lib/quoteCategory'),
  currency:  require('./lib/currency'),
  country:   require('./lib/country'),
  accountingPeriod: require('./lib/accountingPeriod'),
  vatReturn: require('./lib/vatReturn'),
};
