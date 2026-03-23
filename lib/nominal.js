'use strict';

const fields = {
  Id: Number,
  Code: Number,
  Name: String,
  Type: { type: String, set: v => (v == null ? v : String(v)) },
  NomType: Number,
  Sa103Code: Number,
  DefaultProduct: {},
  Disallowed: Boolean,
  ComplianceCode: String,
  Archived: Boolean,
  DigitalService: Boolean,
  IsProduct: Number,
  AutoFillLineItem: Boolean,
  Price: Number,
  WholeSalePrice: Number,
  VATRate: Number,
  VATExempt: Boolean,
  Description: String,
  Special: Number,
  Classification: String,
  ControlAccountClassification: String,
  AllowDelete: Boolean,
  PlOption: Number,
  BsOption: Number,
  IRISCoAName: String,
  IsIRISCoA: Boolean,
  ManageStockLevel: Boolean,
  QuantityInStock: Number,
  StockWarningQuantity: Number,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
];

module.exports = { collection: 'nominals', fields, indexes };
