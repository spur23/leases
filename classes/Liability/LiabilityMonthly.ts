export class LiabilityMonthly {
  private interestExpense: number;
  private principal: number;
  private endingBalance: number;
  private shortTermBalance: number;
  private longTermBalance: number;

  constructor(
    private date: Date,
    private beginningBalance: number,
    private interestRate: number
  ) {
    this.date = date;
    this.beginningBalance = beginningBalance;
    this.interestRate = interestRate / 12;

    this.interestExpense = this.beginningBalance * this.interestRate;
  }
}
