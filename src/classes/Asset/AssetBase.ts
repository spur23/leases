import { AssetSchedulePrint } from '../../interfaces';
import { roundNumber } from '../../utils';
import { AssetMonthly } from './AssetMonthly';

export class AssetBase {
  startDate!: Date;
  monthlyDepreciation!: number;
  monthlyTransactions!: AssetMonthly[];
  startingBalance!: number;
  life!: number;

  setProperties(startDate: string, startingBalance: number, life: number) {
    this.startDate = new Date(startDate);
    this.startingBalance = roundNumber(startingBalance, 2);
    this.life = life;
  }

  setPropertiesFromJSON(schedule: any) {
    const { date, beginningBalance } = schedule[0];
    const life = schedule.length;
    this.setProperties(date, beginningBalance, life);

    this.setMonthlyTransactionsFromJSON(schedule);
  }

  getStartingBalance(): number {
    return this.startingBalance;
  }

  getLife(): number {
    return this.life;
  }

  getMonthlyTransactions(): AssetMonthly[] {
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
          depreciation: roundNumber(endingBalance + depreciation, 2),
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

  setMonthlyTransactions(callback: Function): void {
    this.monthlyTransactions = callback(
      this.startDate,
      this.life,
      this.startingBalance,
      this.monthlyDepreciation
    );
  }

  setMonthlyTransactionsFromJSON(data: any): void {
    this.monthlyTransactions = data.map(
      (month) =>
        new AssetMonthly(
          new Date(month.date),
          month.beginningBalance,
          month.depreciation
        )
    );
  }
}
