import { PaymentFrequency } from '../../enums';
import { PaymentStream } from '../../interfaces';
import { addMonth, monthlyCalculation } from '../../utils';
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
        const { payment, frequency } = this.payments[i].getPaymentInformation();
        const { nextMonth, monthlyPayment } = monthlyCalculation(
          y,
          startDate,
          payment,
          frequency
        );

        arr.push({
          month: nextMonth,
          payment: monthlyPayment
        });
      }
    }

    return arr;
  }
}
