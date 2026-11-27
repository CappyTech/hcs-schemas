/**
 * An employee as the external payroll provider holds them (Staffology today).
 *
 * Provider-neutral on purpose: `Source` names the provider and `ExternalId` is
 * that provider's id, so a different payroll adapter can fill the same
 * collection. Lives in its own database (hcs-sync writes it, hcs-app reads it),
 * not alongside the accounting mirror.
 *
 * No NI number or bank details: employees are matched to hcs-app by
 * `PayrollCode`, which is all the comparison needs.
 */
const fields = {
  Source: { type: String, required: true },
  ExternalId: { type: String, required: true },
  EmployerId: String,
  PayrollCode: String,
  FirstName: String,
  LastName: String,
  Status: String, // Current | Former | Upcoming
  JobTitle: String,
  PayBasis: String, // Hourly | Daily | Monthly ...
  PayPeriod: String, // Weekly | Monthly ...
  BaseHourlyRate: Number,
  BaseDailyRate: Number,
  PayAmount: Number,
  StartDate: Date,
  LeaveDate: Date,
  SyncedAt: Date,
};

const indexes = [
  { fields: { Source: 1, ExternalId: 1 }, options: { unique: true } },
  { fields: { PayrollCode: 1 } },
];

export default { collection: 'payrollemployees', fields, indexes };
