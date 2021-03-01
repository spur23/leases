import { roundNumber } from '../../utils/index';

export class AssetMonthly {
  public endingBalance: number;

  constructor(
    public date: Date,
    public beginningBalance: number,
    public depreciation: number
  ) {
    this.beginningBalance = beginningBalance;
    this.depreciation = depreciation;

    const endBalance = this.beginningBalance - this.depreciation;
    this.endingBalance = roundNumber(endBalance, 2);

    this.date = date;
  }

  getMonthlyData() {
    return {
      date: this.date,
      beginningBalance: this.beginningBalance,
      depreciation: this.depreciation,
      endingBalance: this.endingBalance
    };
  }
}
