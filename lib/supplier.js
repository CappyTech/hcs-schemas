'use strict';

const fields = {
  Id: Number,
  Code: String,
  Name: String,
  Note: String,
  CreatedDate: Date,
  LastUpdatedDate: Date,
  FirstPurchaseDate: Date,
  LastPurchaseDate: Date,
  OutstandingBalance: Number,
  TotalPaidAmount: Number,
  DefaultNominalCode: Number,
  VatNumber: String,
  IsRegisteredInEC: Boolean,
  IsArchived: Boolean,
  ApplyWithholdingTax: Boolean,
  BankAccount: {},
  BilledNetAmount: Number,
  BilledVatAmount: Number,
  PaymentTerms: {},
  Currency: {},
  Contacts: [{}],
  Address: {},
  DeliveryAddresses: [{}],
  DefaultPdfTheme: Number,
  DefaultVatRate: Number,
  DoesSupplierHasTransactionsInVATReturn: Boolean,
  IsCISReverseCharge: Boolean,
  IsVatRateEnabled: Boolean,
  PaymentMethod: Number,
  CreateSupplierCodeIfDuplicate: Boolean,
  CreateSupplierNameIfEmptyOrNull: Boolean,
  SourceName: String,
  TradeBorderType: String,
  UniqueEntityNumber: String,
  UsesDefaultPdftTheme: Boolean,
  VatExempt: Boolean,
  WithholdingTaxRate: Number,
  WithholdingTaxReferences: [{ Name: String, Value: String }],
  // CIS fields — written by hcs-app, protected from sync overwrite.
  Subcontractor: { type: Boolean, default: false },
  IsSubcontractor: { type: Boolean, default: false },
  CISRate: { type: Number, enum: [null, 0, 0.2, 0.3], default: null },
  CISNumber: { type: String, default: null },
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  { fields: { 'WithholdingTaxReferences.Name': 1, 'WithholdingTaxReferences.Value': 1 } },
];

module.exports = { collection: 'suppliers', fields, indexes };
