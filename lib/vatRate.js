'use strict';

const fields = {
  CountryCode: { type: String, required: true },
  Rate: { type: Number, required: true },
  VATId: { type: Number },
  VATRate: { type: Number },
  VATText: { type: String },
};

const indexes = [
  { fields: { CountryCode: 1, Rate: 1 }, options: { unique: true } },
  { fields: { VATId: 1 }, options: { unique: true, sparse: true } },
];

module.exports = { collection: 'vatrates', fields, indexes };
