import { LiabilityMonthlyValues } from '../../interfaces';

export class LiabilityMonthly {
  shortTermBalance?: number;
  longTermBalance?: number;

  constructor(
    public date: Date,
    public payment: number,
    public principal: number,
    public beginningBalance: number,
    public interestRate: number,
    public interestExpense: number,
    public interestPayment: number,
    public endingBalance: number,
    public prepaid?: boolean
  ) {
    this.date = date;
    this.beginningBalance = beginningBalance;
    this.interestExpense = interestRate;
    this.interestExpense = interestExpense;
    this.payment = payment;
    this.principal = principal;
    this.endingBalance = endingBalance;
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
