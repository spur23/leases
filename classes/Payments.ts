import { Payment } from './Payment';
// paymets class
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

  quantityOfPayments() {
    return this.payments.reduce((a, b) => a + b.getPayments(), 0);
  }

  paymentStream() {
    for (let i = 0; i < this.payments.length; i++) {}
  }
}
