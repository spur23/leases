import { Payments } from './Payments';
// parent class
export class Lease {
  private name: string;
  private description: string;
  private totalPayments: number;
  private presentValue: number;
  private interestRate: number;
  private payments: Payments;

  constructor(
    name: string,
    description: string,
    payments: Payments,
    interestRate: number
  ) {
    this.name = name;
    this.description = description;
    this.payments = payments;
    this.interestRate = interestRate / 100;

    this.totalPayments = this.getQuantityOfPayments();

    this.presentValue =
      (this.payments.sumAllPayments() / (1 + this.interestRate)) ^
      this.getQuantityOfPayments();
  }

  getPayments() {
    return this.payments.paymentInformation();
  }

  getLeaseInformation() {
    const startDate = this.payments
      .paymentInformation()
      .sort(
        (a, b) =>
          new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()
      );

    const endDate = startDate[startDate.length - 1].endDate;

    return {
      lease: this.name,
      description: this.description,
      interestRate: this.interestRate,
      totalPayments: this.totalPayments,
      presentValue: this.presentValue,
      startDate: startDate[0].startDate,
      endDate: endDate,
      payments: this.getPayments()
    };
  }

  getSumOfPayments() {
    return this.payments.sumAllPayments();
  }

  getQuantityOfPayments() {
    return this.payments.quantityOfPayments();
  }
}
