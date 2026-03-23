'use strict';

const fields = {
  Number: Number,
  ObjectType: { type: String, required: true },
  ObjectNumber: { type: Number, required: true },
  Text: { type: String, required: true },
  Date: Date,
  LastModifiedBy: String,
  CreatedDate: Date,
  LastUpdatedDate: Date,
  Author: String,
  Permalink: String,
};

const indexes = [];

module.exports = { collection: 'notes', fields, indexes };
