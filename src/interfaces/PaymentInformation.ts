import { PaymentFrequency } from '../enums/PaymentFrequency';

export interface PaymentInformation {
  payment: number;
  frequency: PaymentFrequency;
  startDate: string;
  endDate: string;
  payments: number;
}
