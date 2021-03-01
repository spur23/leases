import { PaymentFrequency } from '../enums/PaymentFrequency';

export interface PaymentValues {
  payment: number;
  frequency: PaymentFrequency;
  startDate: string;
  endDate: string;
}
