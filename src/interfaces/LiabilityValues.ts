import { PaymentStream } from '.';
import { LiabilityMonthly } from '../classes/Liability/LiabilityMonthly';
export interface LiabilityValues {
  startDate: Date;
  monthlyTransactions: LiabilityMonthly[];
  payment: number;
  paymentStream: PaymentStream[];
  interestRate: number;
  startingBalance: number;
  life: number;
  prepaid: boolean;
}
