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

export default { collection: 'quotecategories', fields, indexes };
