import { PaymentFrequency } from '../enums/PaymentFrequency';

export interface PaymentStream {
  month: string;
  payment: number;
  frequency: PaymentFrequency;
}
