import { PaymentStream } from '../../interfaces';
import { addMonth } from '../../utils';
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

  paymentStream(): PaymentStream[] {
    let arr = [];
    // loop through all payment streams
    for (let i = 0; i < this.payments.length; i++) {
      const { startDate } = this.payments[i].getPaymentInformation();
      const streamLength = this.payments[i].getPaymentInformation().payments;

      // loop through payments to create an array of payments with dates to pass to the liability
      for (let y = 0; y < streamLength; y++) {
        const { payment } = this.payments[i].getPaymentInformation();
        if (y === 0) {
          arr.push({
            month: new Date(startDate),
            payment
          });
        } else {
          const nextMonth = addMonth(new Date(startDate), y);

          arr.push({
            month: nextMonth,
            payment
          });
        }
      }
    }

    return arr;
  }
}
