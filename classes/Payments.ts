import { Payment } from './Payment';

export class Payments {
  payments: Payment[];
  constructor(payments: Payment[]) {
    this.payments = payments;
  }

  sumAllPayments(): number {
    let result = 0;
    this.payments.forEach((payment) => {
      result += payment.sumPayments();
    });

    return result;
  }

  paymentInformation() {
    return this.payments.map((payment) => payment.getPaymentInformation());
  }
}
