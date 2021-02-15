import { PaymentFrequency } from '../enums/PaymentFrequency';
import { PaymentValues } from '../interfaces/PaymentValues';

export class Payment {
  private payment: number;
  private frequency: PaymentFrequency;
  private startDate: Date;
  private endDate: Date;
  private payments: number;

  constructor(config: PaymentValues) {
    this.payment = config.payment;
    this.frequency = config.frequency;
    this.startDate = new Date(config.startDate);
    this.endDate = new Date(config.endDate);

    // calculate the number of months between the start date and end date
    let years = this.endDate.getFullYear() - this.startDate.getFullYear();
    let months =
      years * 12 + (this.endDate.getMonth() - this.startDate.getMonth()) + 1;

    if (months <= 0) {
      this.payments = 0;
    } else if (this.frequency === PaymentFrequency.Monthly) {
      this.payments = months;
    } else if (this.frequency === PaymentFrequency.Quarterly) {
      this.payments = months / 4;
    } else if (this.frequency === PaymentFrequency.SemiAnnual) {
      this.payments = months / 6;
    } else if (this.frequency === PaymentFrequency.Annual) {
      this.payments = months / 12;
    }
  }

  getPaymentInformation() {
    return {
      payment: this.payment,
      frequency: this.frequency,
      startDate: this.startDate,
      endDate: this.endDate,
      payments: this.payments
    };
  }

  sumPayments(): number {
    return this.payment * this.payments;
  }
}
