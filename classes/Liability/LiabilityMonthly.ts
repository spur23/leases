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
    this.interestPayment = interestPayment;
    if (this.prepaid) {
      this.principal = payment - this.interestPayment;
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
