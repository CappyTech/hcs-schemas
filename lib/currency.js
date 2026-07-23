// KashFlow currency (GET /currencies).
const fields = {
  Id: Number,
  Code: String,
  Name: String,
  Symbol: String,
  DisplaySymbolOnRight: Boolean,
  ExchangeRate: Number,
  IsDefault: Boolean,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  { fields: { Code: 1 }, options: { sparse: true } },
];

export default { collection: 'currencies', fields, indexes };
