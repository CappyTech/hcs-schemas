'use strict';

// KashFlow bank account (GET /bankaccounts, GET /bankaccounts/{id}).
// StartingDate/StartingAmount/ShowPaidInFirst/IncludeOnDashBoard/Note/
// OverrideTransactionLock are only returned by the detail endpoint.
const fields = {
  Id: Number,
  AccountName: String,
  Code: Number,
  IsDefaultAccount: Boolean,
  TransactionLockEnabled: Boolean,
  TransactionLockDate: Date,
  ReconcileDate: Date,
  StartingDate: Date,
  StartingAmount: Number,
  ShowPaidInFirst: Boolean,
  IncludeOnDashBoard: Boolean,
  Note: String,
  OverrideTransactionLock: Boolean,
  IsArchived: Boolean,
  FeedAccountNumber: String,
  FeedSiteName: String,
  FeedAccountName: String,
  FeedAccountHolder: String,
  FeedSource: String,
  LastTransactionImportDate: Date,
  BankFeedsAccountId: Number,
  BankBalance: Number,
  IsBankEmpty: Boolean,
  Order: Number,
  Period: String,
  IconId: Number,
  DefaultInvoicePaymentType: {},
  DefaultPurchasePaymentType: {},
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  { fields: { Code: 1 }, options: { sparse: true } },
];

module.exports = { collection: 'bankaccounts', fields, indexes };
