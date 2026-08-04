// See invoice.paymentLineFields for why BankTransactionId is not a usable link
// to a bank transaction, and what BankReconciliationId is for.
const paymentLineFields = {
  BulkPaymentNumber: Number,
  Permalink: String,
  // KashFlow returns this as a string enum name ('NoCardPayments') on
  // purchases but as a number on invoices. Left untyped so neither is coerced.
  PaymentProcessorEnumValue: {},
  IsPaymentCreditNote: Boolean,
  VATReturnId: Number,
  Id: Number,
  Date: Date,
  BankTransactionId: Number,
  BankReconciliationId: Number,
  BulkId: Number,
  BFSTransactionId: {},
  PaymentProcessor: Number,
  AccountId: Number,
  Note: String,
  Method: Number,
  Amount: Number,
  PayDate: Date,
};

const fields = {
  Id: Number,
  Number: { type: Number, unique: true, required: true },
  SupplierId: Number,
  SupplierCode: String,
  SupplierName: String,
  SupplierReference: String,
  Currency: {},
  DueDate: Date,
  GrossAmount: Number,
  HomeCurrencyGrossAmount: Number,
  IssuedDate: Date,
  FileCount: Number,
  LineItems: [{}],
  NetAmount: Number,
  NextNumber: Number,
  OverdueDays: Number,
  PaidDate: Date,
  // PaymentLines handled separately via paymentLineFields (needs sub-schema wrapping)
  Permalink: String,
  PreviousNumber: Number,
  PurchaseInECMemberState: Boolean,
  ProjectGrossAmount: Number,
  ProjectNumber: Number,
  ProjectName: String,
  Status: String,
  StockManagementApplicable: Boolean,
  TotalPaidAmount: Number,
  TradeBorderType: String,
  Type: String,
  VATAmount: Number,
  VATReturnId: Number,
  AdditionalFieldValue: String,
  CISRCNetAmount: Number,
  CISRCVatAmount: Number,
  DueAmount: Number,
  IsCISReverseCharge: Boolean,
  IsEmailSent: Boolean,
  IsWhtDeductionToBeApplied: Boolean,
  ReadableString: String,
  SubmissionDate: Date,
  TaxMonth: Number,
  TaxYear: Number,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  // Reconciliation: candidate lookup by issue date, and resolving a
  // 'purchasebatchpayment' bank line to the purchases it settled.
  { fields: { IssuedDate: -1 } },
  { fields: { 'PaymentLines.BulkPaymentNumber': 1 }, options: { sparse: true } },
];

export default { collection: 'purchases', fields, paymentLineFields, indexes };
