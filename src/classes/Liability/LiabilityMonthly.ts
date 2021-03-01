import { LiabilityMonthlyValues } from '../../interfaces';
import { roundNumber } from '../../utils';

export class LiabilityMonthly {
  private interestExpense: number;
  private principal: number;
  private endingBalance: number;
  shortTermBalance: number;
  longTermBalance: number;

  constructor(
    private date: Date,
    private payment: number,
    private beginningBalance: number,
    private interestRate: number,
    private interestPayment: number,
    private prepaid?: boolean
  ) {
    this.date = date;
    this.beginningBalance = beginningBalance;
    this.interestRate = interestRate / 12;
    this.interestExpense = roundNumber(
      this.beginningBalance * this.interestRate,
      2
    );

    if (this.prepaid) {
      // check if the month has a cash payment if it does not set the payment to 0
      // else calculate the principal payment
      if (payment === 0) {
        this.principal = 0;
        this.interestPayment = 0;
      } else {
        this.principal = payment - this.interestPayment;
        this.interestPayment = interestPayment;
      }

      this.endingBalance = roundNumber(
        this.beginningBalance +
          this.interestExpense -
          this.principal -
          this.interestPayment,
        2
      );
    } else {
      this.principal = payment - this.interestExpense;
      this.endingBalance = roundNumber(
        this.beginningBalance - this.principal,
        2
      );
    }
  }

  getMonthlyData(): LiabilityMonthlyValues {
    return {
      date: this.date,
      beginningBalance: this.beginningBalance,
      payment: this.payment,
      interestExpense: this.interestExpense,
      interestPayment: this.interestPayment,
      principal: this.principal,
      endingBalance: this.endingBalance,
      shortTermBalance: this.shortTermBalance,
      longTermBalance: this.longTermBalance
    };
  }
}