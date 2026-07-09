'use strict';

// KashFlow accounting period (GET /accountingperiods).
const fields = {
  Id: Number,
  StartDate: Date,
  EndDate: Date,
  IsLocked: Boolean,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
];

module.exports = { collection: 'accountingperiods', fields, indexes };
