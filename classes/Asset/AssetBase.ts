import { AssetSchedulePrint } from '../../interfaces';
import { roundNumber } from '../../utils';
import { AssetMonthly } from './AssetMonthly';

export class AssetBase {
  private startDate: Date;
  private monthlyDepreciation: number;
  private monthlyTransactions: AssetMonthly[];
  private startingBalance: number;
  private life: number;

  setProperties(startDate: string, startingBalance: number, life: number) {
    this.startDate = new Date(startDate);
    this.startingBalance = roundNumber(startingBalance, 2);
    this.life = life;
  }

  getStartingBalance(): number {
    return this.startingBalance;
  }

  getLife(): number {
    return this.life;
  }

  getMonthlyTransactions() {
    return this.monthlyTransactions;
  }

  getAssetData(): AssetSchedulePrint[] {
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
          date: date.toLocaleDateString(),
          beginningBalance,
          depreciation: endingBalance + depreciation,
          endingBalance: endingBalance - endingBalance
        };
      } else {
        return {
          date: date.toLocaleDateString(),
          beginningBalance,
          depreciation,
          endingBalance
        };
      }
    });

    return schedule;
  }

  setMonthlyDepreciation(depreciation: number): void {
    this.monthlyDepreciation = roundNumber(depreciation, 2);
  }

  setMonthlyTransactions(callback) {
    this.monthlyTransactions = callback(
      this.startDate,
      this.life,
      this.startingBalance,
      this.monthlyDepreciation
    );
  }

  setMonthlyTransactionsFromJSON(date) {
    this.monthlyTransactions;
  }
}
