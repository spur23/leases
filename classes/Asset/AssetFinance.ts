import { AssetMonthly } from './AssetMonthly';
import { calculateAssetSchedule } from '../../utils/index';
import { AssetBase } from './AssetBase';
import { LeaseClassification } from '../../enums';

export class AssetFinance extends AssetBase {
  setPropertiesFinance(
    startDate: string,
    startingBalance: number,
    life: number
  ): void {
    this.setProperties(startDate, startingBalance, life);
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
    const assetData = {
      startDate,
      life,
      startingBalance,
      monthlyDepreciation,
      classification: LeaseClassification.FINANCE
    };

    const assetSchedule = calculateAssetSchedule(assetData);

    return assetSchedule;
  }
}
