import { PaymentFrequency } from '../../enums';
import { PaymentValues } from '../../interfaces';
// payment class
export class Payment {
  private payment: number;
  private frequency: PaymentFrequency;
  private startDate: Date;
  private endDate: Date;
  private payments: number;

  constructor(config: PaymentValues) {
    const { payment, frequency, startDate, endDate } = config;

    this.payment = payment;
    this.frequency = frequency;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);

    // calculate the number of months between the start date and end date
    let years = this.endDate.getFullYear() - this.startDate.getFullYear();
    let months =
      years * 12 + (this.endDate.getMonth() - this.startDate.getMonth()) + 1;

    if (months <= 0) {
      this.payments = 0;
    } else {
      this.payments = months;
    }
  }

  getPaymentInformation() {
    return {
      payment: this.payment,
      frequency: this.frequency,
      startDate: this.startDate.toLocaleDateString(),
      endDate: this.endDate.toLocaleDateString(),
      payments: this.payments
    };
  }

  sumPayments(): number {
    return this.payment * this.payments;
  }

  getPayments() {
    return this.payments;
  }
}
