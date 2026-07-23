// KashFlow VAT return (GET /vatreturns, GET /vatreturns/{id}).
const fields = {
  Id: Number,
  StartDate: Date,
  EndDate: Date,
  DueDate: Date,
  Box1: Number,
  Box2: Number,
  Box3: Number,
  Box4: Number,
  Box5: Number,
  Box6: Number,
  Box7: Number,
  Box8: Number,
  Box9: Number,
  PeriodId: String,
  Status: String,
  PaidStatus: String,
  FileDate: Date,
  SubmissionErrorMessage: String,
  SubmissionResponseTimeStamp: Date,
  ECSLStatus: String,
  ECSLSubmissionErrorMessage: String,
  ECSLSubmissionResponseTimeStamp: Date,
  IsSourceMTD: Boolean,
  AreVatNumbersValid: Boolean,
  IsCashAccounting: Boolean,
  IsFRS: Boolean,
  FRSRate: Number,
  HasCSV: Boolean,
  TransactionsCount: Number,
  SubmittedBy: Number,
  VatReturnBatchItemId: Number,
  RegisteredIn: String,
};

const indexes = [
  { fields: { Id: 1 }, options: { unique: true, sparse: true } },
  { fields: { EndDate: -1 } },
];

export default { collection: 'vatreturns', fields, indexes };
