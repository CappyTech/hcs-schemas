'use strict';

// KashFlow product (GET /products, GET /products/{id}).
const fields = {
  Id: Number,
  Code: String,
  Name: String,
  Description: String,
  Price: Number,
  WholesalePrice: Number,
  VATRate: Number,
  NominalCode: Number,
  NominalId: Number,
  AutoFill: Boolean,
  ManagesStock: Boolean,
  QuantityInStock: Number,
  WarnAt: Number,
  IsArchived: Boolean,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  { fields: { Code: 1 }, options: { sparse: true } },
];

module.exports = { collection: 'products', fields, indexes };
