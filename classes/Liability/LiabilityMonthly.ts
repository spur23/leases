import { roundNumber } from '../../utils';

export class LiabilityMonthly {
  private interestExpense: number;
  private principal: number;
  private endingBalance: number;
  private shortTermBalance: number;
  private longTermBalance: number;

  constructor(
    private date: Date,
    private payment: number,
    private beginningBalance: number,
    private interestRate: number,
    private prepaid?: boolean
  ) {
    this.date = date;
    this.beginningBalance = beginningBalance;
    this.interestRate = interestRate / 12;
    this.interestExpense = roundNumber(
      this.beginningBalance * this.interestRate,
      2
    );

    this.principal = payment - this.interestExpense;
    this.endingBalance = roundNumber(this.beginningBalance - this.principal, 2);
  }

  getMonthlyData() {
    return {
      date: this.date,
      beginningBalance: this.beginningBalance,
      interestExpense: this.interestExpense,
      principal: this.principal,
      endingBalance: this.endingBalance
    };
  }
}
