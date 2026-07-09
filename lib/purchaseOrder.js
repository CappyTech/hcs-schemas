'use strict';

// KashFlow purchase order (GET /purchaseorders, GET /purchaseorders/{number}).
// Mirrors the purchase shape; LineItems kept as Mixed.
const fields = {
  Id: Number,
  Number: Number,
  IssuedDate: Date,
  DueDate: Date,
  DeliveryDate: Date,
  SupplierId: Number,
  SupplierCode: String,
  SupplierName: String,
  SupplierReference: String,
  Currency: {},
  LineItems: [{}],
  NetAmount: Number,
  VATAmount: Number,
  GrossAmount: Number,
  HomeCurrencyGrossAmount: Number,
  Status: String,
  Category: {},
  CategoryNumber: Number,
  ProjectNumber: Number,
  ProjectName: String,
  FileCount: Number,
  IsEmailSent: Boolean,
  Permalink: String,
  PreviousNumber: Number,
  NextNumber: Number,
  TradeBorderType: String,
  Type: String,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  { fields: { Number: 1 }, options: { sparse: true } },
];

module.exports = { collection: 'purchaseorders', fields, indexes };
