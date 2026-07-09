'use strict';

// KashFlow country (GET /countries).
const fields = {
  Id: Number,
  Code: String,
  Name: String,
  IsEU: Boolean,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  { fields: { Code: 1 }, options: { sparse: true } },
];

module.exports = { collection: 'countries', fields, indexes };
