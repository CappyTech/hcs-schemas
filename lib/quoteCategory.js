'use strict';

// KashFlow quote category (GET /quotecategories).
const fields = {
  Number: Number,
  Name: String,
  IconId: Number,
  IconType: String,
  IconColor: String,
};

const indexes = [
  { fields: { Number: 1 }, options: { unique: true, sparse: true } },
];

module.exports = { collection: 'quotecategories', fields, indexes };
