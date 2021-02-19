import { AssetMonthly } from './AssetMonthly';
import { roundNumber, addMonth } from '../../utils/index';

// class to house the finance lease asset schedule
export class AssetFinance {
  private startDate: Date;
  private monthlyDepreciation: number;
  private monthlyTransactions: AssetMonthly[];

  constructor(
    startDate: string,
    private startingBalance: number,
    private life: number
  ) {
    this.startDate = new Date(startDate);
    this.startingBalance = startingBalance;
    this.life = life;

    const depreciation = this.startingBalance / this.life;

    this.monthlyDepreciation = roundNumber(depreciation, 2);

    this.monthlyTransactions = this.calculateMonthlySchedule();
  }

  calculateMonthlySchedule(): AssetMonthly[] {
    let result = [];
    for (let i = 0; i < this.life; i++) {
      if (i === 0) {
        const month = new AssetMonthly(
          this.startDate,
          this.startingBalance,
          this.monthlyDepreciation
        );

        result.push(month);
      } else {
        const { endingBalance } = result[i - 1].getMonthlyData();
        const nextMonth = addMonth(this.startDate, i);
        const month = new AssetMonthly(
          nextMonth,
          endingBalance,
          this.monthlyDepreciation
        );

        result.push(month);
      }
    }

    return result;
  }

  getAssetData(): {
    monthlyDepreciation: number;
    schedule: any[];
  } {
    const schedule = this.monthlyTransactions.map((month) => {
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

    return {
      monthlyDepreciation: this.monthlyDepreciation,
      schedule
    };
  }
}
