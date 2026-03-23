'use strict';

const fields = {
  Id: Number,
  Number: Number,
  Name: String,
  Description: String,
  Reference: String,
  CustomerCode: String,
  CustomerName: String,
  Status: String,
  Note: String,
  StartDate: Date,
  EndDate: Date,
  ExcludeVAT: Boolean,
  AssociatedQuotesCount: Number,
  ActualSalesAmount: Number,
  ActualSalesVATAmount: Number,
  ActualPurchasesAmount: Number,
  ActualPurchasesVATAmount: Number,
  ActualJournalsAmount: Number,
  TargetSalesAmount: Number,
  TargetPurchasesAmount: Number,
  WorkInProgressAmount: Number,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
];

module.exports = { collection: 'projects', fields, indexes };
