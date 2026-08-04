// Invoice payment lines. Deliberately NOT the same set as
// purchase.paymentLineFields: invoices carry Reference and InvoiceNumber, and
// purchases carry PayDate. Both carry BankReconciliationId, which is absent
// from KashFlow's published docs but present on every live payload and is the
// only field linking a payment to KashFlow's own reconciliation.
//
// Note that BankTransactionId is 0 on every live invoice and purchase, so
// despite its name it is NOT a usable link to a bank transaction. The real
// link runs the other way, via bankTransaction.EntityName + ResourceNumber.
const paymentLineFields = {
  Id: Number,
  InvoiceNumber: Number,
  Date: Date,
  Amount: Number,
  Method: Number,
  Reference: String,
  Note: String,
  AccountId: Number,
  BulkId: Number,
  BulkPaymentNumber: Number,
  BFSTransactionId: {},
  BankTransactionId: Number,
  BankReconciliationId: Number,
  PaymentProcessor: Number,
  PaymentProcessorEnumValue: Number,
  Permalink: String,
  VATReturnId: Number,
  IsPaymentCreditNote: Boolean,
};

const fields = {
  Id: Number,
  Number: { type: Number, unique: true, required: true },
  CustomerId: Number,
  CustomerName: String,
  CustomerCode: String,
  CustomerKey: String,
  CustomerReference: String,
  CustomerContactName: String,
  CustomerContactFirstName: String,
  CustomerContactLastName: String,
  CreatedDate: Date,
  Currency: {},
  NetAmount: Number,
  GrossAmount: Number,
  VATAmount: Number,
  HomeCurrencyGrossAmount: Number,
  HomeCurrencyVATAmount: Number,
  AmountPaid: Number,
  TotalPaidAmount: Number,
  Paid: Number,
  DueAmount: Number,
  FormattedDueAmount: String,
  IssuedDate: Date,
  DueDate: Date,
  PaidDate: Date,
  LastPaymentDate: Date,
  Status: String,
  Type: String,
  LineItems: [{}],
  // Kept as Mixed here for backward compatibility: consumers that just spread
  // `...invoice.fields` (as hcs-app did before 2.1.0) keep working unchanged.
  // Consumers wanting the typed sub-document wrap `paymentLineFields` and set
  // `PaymentLines` *after* the spread, which overrides this. Purchases omit the
  // field entirely instead, because every consumer already wraps them.
  PaymentLines: [{}],
  Address: {},
  DeliveryAddress: {},
  UseCustomDeliveryAddress: Boolean,
  Permalink: String,
  PackingSlipPermalink: String,
  ReminderLetters: [{}],
  PreviousNumber: Number,
  NextNumber: Number,
  OverdueDays: Number,
  EmailCount: Number,
  FileCount: Number,
  AutomaticCreditControlEnabled: Boolean,
  CustomerDiscount: Number,
  InvoiceInECMemberState: Boolean,
  InvoiceOutsideECMemberState: Boolean,
  IsArchived: Boolean,
  IsCISReverseCharge: Boolean,
  IsWhtDeductionToBeApplied: Boolean,
  CISRCNetAmount: Number,
  CISRCVatAmount: Number,
  PayOnlinePaymentProcessor: Number,
  ProjectNumber: Number,
  ProjectName: String,
  ProjectGrossAmount: Number,
  SuppressNumber: Number,
  TradeBorderType: String,
  UpdateCustomerAddress: Boolean,
  UpdateCustomerDeliveryAddress: Boolean,
  VATNumber: String,
  VATReturnId: Number,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  // Reconciliation: candidate lookup by issue date, and resolving a
  // 'invoicebatchpayment' bank line to the invoices it settled.
  { fields: { IssuedDate: -1 } },
  { fields: { 'PaymentLines.BulkPaymentNumber': 1 }, options: { sparse: true } },
];

export default { collection: 'invoices', fields, paymentLineFields, indexes };
