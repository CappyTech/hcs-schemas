// KashFlow bank transaction (GET /bankaccounts/{accountId}/transactions,
// GET /bankaccounts/{accountId}/transactions/{transactionId}).
// Server-computed list-only fields (EditLink, ProjectUrl, Balance, EntityName,
// CustomerSupplierName, VATPaid, LineProjectsCount) are still persisted via
// strict:false in consumers but not declared here.
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
];

export default { collection: 'banktransactions', fields, indexes };
