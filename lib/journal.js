'use strict';

// KashFlow journal (GET /journals, GET /journals/{number}).
// Lines hold nominal debit/credit pairs; kept as Mixed since KashFlow's
// journal line shape is not fully documented.
const fields = {
  Id: Number,
  Number: Number,
  Date: Date,
  Description: String,
  Lines: [{}],
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  { fields: { Number: 1 }, options: { sparse: true } },
];

module.exports = { collection: 'journals', fields, indexes };
