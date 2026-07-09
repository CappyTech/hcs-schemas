'use strict';

// KashFlow purchase order category (GET /purchaseordercategories).
// Same shape as quote categories.
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

module.exports = { collection: 'purchaseordercategories', fields, indexes };
