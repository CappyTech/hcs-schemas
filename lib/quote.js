'use strict';

const fields = {
  Id: Number,
  Number: { type: Number, unique: true, required: true },
  CustomerId: Number,
  CustomerName: String,
  CustomerCode: String,
  CustomerReference: String,
  Date: Date,
  GrossAmount: Number,
  HomeCurrencyGrossAmount: Number,
  NetAmount: Number,
  VATAmount: Number,
  LineItems: [{}],
  Addresses: [{}],
  DeliveryAddresses: [{}],
  UseCustomDeliveryAddress: Boolean,
  Permalink: String,
  PreviousNumber: Number,
  NextNumber: Number,
  Status: String,
  Category: {},
  Currency: {},
  ProjectNumber: Number,
  ProjectName: String,
  FileCount: Number,
  IsEmailSent: Boolean,
  SuppressAmount: Boolean,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
];

module.exports = { collection: 'quotes', fields, indexes };
