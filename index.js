import crypto from 'node:crypto';

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

import customer from './lib/customer.js';
import supplier from './lib/supplier.js';
import invoice from './lib/invoice.js';
import purchase from './lib/purchase.js';
import quote from './lib/quote.js';
import project from './lib/project.js';
import nominal from './lib/nominal.js';
import note from './lib/note.js';
import vatRate from './lib/vatRate.js';
import bankAccount from './lib/bankAccount.js';
import bankTransaction from './lib/bankTransaction.js';
import bankReconciliation from './lib/bankReconciliation.js';
import journal from './lib/journal.js';
import product from './lib/product.js';
import purchaseOrder from './lib/purchaseOrder.js';
import purchaseOrderCategory from './lib/purchaseOrderCategory.js';
import quoteCategory from './lib/quoteCategory.js';
import currency from './lib/currency.js';
import country from './lib/country.js';
import accountingPeriod from './lib/accountingPeriod.js';
import vatReturn from './lib/vatReturn.js';

const uuidField = {
  type: String,
  unique: true,
  required: true,
  default: () => crypto.randomUUID(),
};

export {
  uuidField,
  customer,
  supplier,
  invoice,
  purchase,
  quote,
  project,
  nominal,
  note,
  vatRate,
  bankAccount,
  bankTransaction,
  bankReconciliation,
  journal,
  product,
  purchaseOrder,
  purchaseOrderCategory,
  quoteCategory,
  currency,
  country,
  accountingPeriod,
  vatReturn,
};

export default {
  uuidField,
  customer,
  supplier,
  invoice,
  purchase,
  quote,
  project,
  nominal,
  note,
  vatRate,
  bankAccount,
  bankTransaction,
  bankReconciliation,
  journal,
  product,
  purchaseOrder,
  purchaseOrderCategory,
  quoteCategory,
  currency,
  country,
  accountingPeriod,
  vatReturn,
};
