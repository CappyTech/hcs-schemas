const fields = {
  CountryCode: { type: String, required: true },
  Rate: { type: Number, required: true },
  VATId: { type: Number },
  VATRate: { type: Number },
  VATText: { type: String },
};

const indexes = [
  { fields: { CountryCode: 1, Rate: 1 } },
  { fields: { VATId: 1 }, options: { unique: true, sparse: true } },
];

export default { collection: 'vatrates', fields, indexes };
