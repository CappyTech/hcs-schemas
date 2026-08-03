// KashFlow bank transaction (GET /bankaccounts/{accountId}/transactions,
// GET /bankaccounts/{accountId}/transactions/{transactionId}).
// Server-computed list-only fields (EditLink, ProjectUrl, Balance,
// CustomerSupplierName, VATPaid, LineProjectsCount) are still persisted via
// strict:false in consumers but not declared here.
//
// EntityName is the exception: it is list-only and server-computed, but
// EntityName + ResourceNumber is the link from a bank line to the document it
// settles ('purchase'/'invoice' -> that document's Number;
// 'purchasebatchpayment'/'invoicebatchpayment' -> PaymentLines.BulkPaymentNumber;
// 'banktransaction' -> no document at all). Reconciliation depends on it, so it
// is declared and indexed rather than left to strict:false.
const fields = {
  Id: Number,
  AccountId: Number,
  Date: Date,
  MoneyType: Number,
  TransactionType: Number,
  TransactionNumber: Number,
  Type: String,
  Comment: String,
  PaidIn: Number,
  PaidOut: Number,
  VATAble: Boolean,
  VATAmount: Number,
  VATRate: Number,
  VATReturnId: Number,
  Reconciled: Boolean,
  ReconciledId: Number,
  ProjectNumber: Number,
  ProjectName: String,
  ResourceNumber: Number,
  EntityName: String,
  CustomerCode: String,
  CustomerName: String,
  SupplierCode: String,
  SupplierName: String,
  IsSystemGeneratedTransaction: Boolean,
  BFSTransactionId: {},
  Disallowed: Boolean,
  PaymentId: Number,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  { fields: { AccountId: 1, Date: -1 } },
  // Reconciliation access paths: the per-account unreconciled worklist, and
  // resolving a bank line to the document it settles.
  { fields: { AccountId: 1, Reconciled: 1, Date: -1 } },
  { fields: { EntityName: 1, ResourceNumber: 1 } },
];

export default { collection: 'banktransactions', fields, indexes };
