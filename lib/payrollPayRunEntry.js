/**
 * One employee's line in one pay run, from the external payroll provider
 * (Staffology today). Keyed on the provider's entry id.
 *
 * `TaxYear` is the calendar year the tax year starts in (2026 = 2026/27).
 * `StartDate`/`EndDate` are the pay period the provider paid for, so consumers
 * can compare against their own records by date range without matching week
 * numbering schemes.
 *
 * `PayBasis`, `BaseHourlyRate`, `BaseDailyRate`, `PayAmount` and
 * `PayAmountMultiplier` are the entry's basic pay options: the rate actually
 * paid that period (which can differ from the employee's current rate) and the
 * hours or days paid at it. Optional; entries stored before they existed lack
 * them. `PayLines` holds the extra regular pay lines (overtime and the like).
 */
const totalsFields = {
  Gross: Number,
  BasicPay: Number,
  Additions: Number,
  Deductions: Number,
  Tax: Number,
  EmployeeNi: Number,
  EmployerNi: Number,
  EmployeePension: Number,
  EmployerPension: Number,
  NetPay: Number,
  TakeHomePay: Number,
  TotalCost: Number,
};

const payLineFields = {
  Code: String,
  Description: String,
  Value: Number,
  Rate: Number,
  Multiplier: Number,
};

const fields = {
  Source: { type: String, required: true },
  ExternalId: { type: String, required: true },
  EmployerId: String,
  EmployeeExternalId: String,
  PayrollCode: String,
  EmployeeName: String,
  TaxYear: Number,
  PayPeriod: String,
  Period: Number,
  Ordinal: Number,
  StartDate: Date,
  EndDate: Date,
  PaymentDate: Date,
  IsClosed: Boolean,
  PayBasis: String,
  BaseHourlyRate: Number,
  BaseDailyRate: Number,
  PayAmount: Number,
  PayAmountMultiplier: Number,
  Totals: totalsFields,
  PayLines: [payLineFields],
  SyncedAt: Date,
};

const indexes = [
  { fields: { Source: 1, ExternalId: 1 }, options: { unique: true } },
  { fields: { TaxYear: 1, PayPeriod: 1, Period: 1 } },
  { fields: { PayrollCode: 1, StartDate: 1 } },
];

export default { collection: 'payrollpayrunentries', fields, indexes, totalsFields, payLineFields };
