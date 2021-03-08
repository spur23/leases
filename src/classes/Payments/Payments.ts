import { PaymentStream } from '../../interfaces';
import { monthlyCalculation } from '../../utils';
import { Payment } from './Payment';
import { PaymentInformation } from '../../interfaces/PaymentInformation';

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

  paymentInformation(): PaymentInformation[] {
    return this.payments.map((payment) => payment.getPaymentInformation());
  }

  quantityOfPayments(): number {
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
          payment: monthlyPayment,
          frequency: frequency
        });
      }
    }

    return arr;
  }
}
