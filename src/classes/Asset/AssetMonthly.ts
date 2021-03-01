import { roundNumber } from '../../utils/index';

export class AssetMonthly {
  private endingBalance: number;

  constructor(
    private date: Date,
    private beginningBalance: number,
    private depreciation: number
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
