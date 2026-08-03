// KashFlow bank reconciliation
// (GET /bankaccounts/{bankaccountId}/reconciliations,
//  GET /bankaccounts/{bankaccountId}/reconciliations/{reconciliationId}).
//
// Mirrored READ-ONLY. hcs-app keeps its own reconciliation state in its
// INTERNAL namespace and never writes back to KashFlow; this collection exists
// so we can compare our state against KashFlow's and take free balance anchors
// (StartBalance/EndBalance) for period sign-off.
//
// AccountId is NOT returned by KashFlow — reconciliation IDs are scoped under
// an account in the URL. hcs-sync injects it during the per-account fan-out;
// without it the documents cannot be attributed to an account.
//
// The list and detail endpoints differ: `Status` is list-only, `AccountName`
// and `Transactions` are detail-only. Both shapes are declared here and
// consumers use strict:false, so a document is whichever the sync last wrote.
const transactionFields = {
  Id: Number,
  Date: Date,
  Comment: String,
  Type: String,
  Reconciled: Boolean,
  Payee: String,
  ReconciledId: Number,
  PaidIn: Number,
  PaidOut: Number,
  TransactionType: Number,
  PaymentType: String,
  Balance: Number,
  IsSystemGeneratedTransaction: Boolean,
  ResourceNumber: Number,
  EntityName: String,
  // EditLink is deliberately omitted: server-computed and churns the sync hash.
};

const fields = {
  // Synthetic "<AccountId>:<Id>" composite, set by hcs-sync during the
  // per-account fan-out. KashFlow's reconciliation Id is only known to be
  // unique *within* an account (the account appears solely in the URL), and
  // the sync engine upserts on a single key field — so the composite is
  // materialised here rather than assuming a globally unique Id.
  ReconKey: String,
  Id: Number,
  AccountId: Number,
  AccountName: String,
  StartDate: Date,
  StartBalance: Number,
  EndDate: Date,
  EndBalance: Number,
  Status: String,
  LatestReconciliation: Boolean,
  ReconciliationDone: Boolean,
  Transactions: [{}],
};

const indexes = [
  { fields: { ReconKey: 1 }, options: { unique: true, sparse: true } },
  { fields: { AccountId: 1, EndDate: -1 } },
];

export default {
  collection: 'bankreconciliations',
  fields,
  transactionFields,
  indexes,
};
