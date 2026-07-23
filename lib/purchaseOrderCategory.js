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

export default { collection: 'purchaseordercategories', fields, indexes };
