import { AssetMonthly } from './AssetMonthly';
import { addMonth } from '../../utils/index';
import { AssetSchedule } from '../../interfaces';
import { AssetBase } from './AssetBase';

export class AssetFinance extends AssetBase {
  constructor(startDate: string, startingBalance: number, life: number) {
    super(startDate, startingBalance, life);
    this.calculateDepreciation();

    this.setMonthlyTransactions(this.calculateMonthlySchedule);
  }

  calculateDepreciation(): void {
    const depreciation = this.getStartingBalance() / this.getLife();

    this.setMonthlyDepreciation(depreciation);
  }

  calculateMonthlySchedule(
    startDate: Date,
    life: number,
    startingBalance: number,
    monthlyDepreciation: number
  ): AssetMonthly[] {
    let result = [];
    for (let i = 0; i < life; i++) {
      if (i === 0) {
        const month = new AssetMonthly(
          startDate,
          startingBalance,
          monthlyDepreciation
        );

        result.push(month);
      } else {
        const { endingBalance } = result[i - 1].getMonthlyData();
        const nextMonth = addMonth(startDate, i);
        const month = new AssetMonthly(
          nextMonth,
          endingBalance,
          monthlyDepreciation
        );

        result.push(month);
      }
    }

    return result;
  }

  getAssetData(): AssetSchedule[] {
    const schedule = this.getMonthlyTransactions().map((month) => {
      const {
        date,
        beginningBalance,
        depreciation,
        endingBalance
      } = month.getMonthlyData();

      // check if the ending balance is less than 1
      // if so add it to the depreciation amount to account for rounding
      // set ending balance to 0
      if (endingBalance < 1) {
        return {
          date,
          beginningBalance,
          depreciation: endingBalance + depreciation,
          endingBalance: endingBalance - endingBalance
        };
      } else {
        return {
          date,
          beginningBalance,
          depreciation,
          endingBalance
        };
      }
    });

    return schedule;
  }
}
