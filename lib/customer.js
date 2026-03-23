'use strict';

/**
 * Customer field definitions — superset of hcs-app + hcs-sync.
 *
 * Types use JS built-ins (String, Number, Boolean, Date) and {} for Mixed,
 * so this file has zero dependencies. Both repos wrap these into Mongoose schemas.
 */

const fields = {
  Id: Number,
  Code: String,
  Name: String,
  DisplayName: String,
  Note: String,
  CreatedDate: Date,
  LastUpdatedDate: Date,
  FirstInvoiceDate: Date,
  LastInvoiceDate: Date,
  InvoiceCount: Number,
  InvoicedNetAmount: Number,
  InvoicedVATAmount: Number,
  OutstandingBalance: Number,
  TotalPaidAmount: Number,
  DiscountRate: Number,
  DefaultNominalCode: Number,
  DefaultCustomerReference: String,
  VATNumber: String,
  IsRegisteredInEC: Boolean,
  IsRegisteredOutsideEC: Boolean,
  IsArchived: Boolean,
  ReceivesWholesalePricing: Boolean,
  ApplyWHT: Boolean,
  WHTRate: Number,
  WHTReferences: [{}],
  AutoIncludeVATNumber: Boolean,
  AverageDaysToPay: Number,
  UseCustomDeliveryAddress: Boolean,
  AutomaticCreditControlEnabled: Boolean,
  IsGoCardlessMandateSet: Boolean,
  Key: String,
  Source: Number,
  PaymentTerms: {},
  Currency: {},
  Contacts: [{}],
  Addresses: [{}],
  DeliveryAddresses: [{}],
  CustomCheckBoxes: [{}],
  CustomTextBoxes: [{}],
  Email: String,
  EmailTemplateNumber: Number,
  FaxNumber: String,
  MobileNumber: String,
  TelephoneNumber: String,
  UniqueEntityNumber: String,
  Website: String,
  ShowDiscount: Boolean,
  CreateCustomerCodeIfDuplicate: Boolean,
  CreateCustomerNameIfEmptyOrNull: Boolean,
  InvoiceFileFormat: Number,
  OverrideInvoiceFileFormat: Boolean,
  EnvelopeUrl: String,
  PDFThemeId: Number,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
];

module.exports = { collection: 'customers', fields, indexes };
