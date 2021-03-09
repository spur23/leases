import { AssetMonthly } from './AssetMonthly';
import { calculateAssetSchedule } from '../../utils/index';
import { AssetBase } from './AssetBase';
import { LeaseClassification } from '../../enums';

export class AssetFinance extends AssetBase {
  setPropertiesFinance(
    startDate: string,
    startingBalance: number,
    life: number,
    useEconomicLife: boolean,
    economicLife?: number
  ): void {
    if (useEconomicLife) {
      // economic life is corrected to months
      const calculatedLife = economicLife * 12;
      this.setProperties(startDate, startingBalance, calculatedLife);
      this.calculateDepreciationWithEconomicLife(calculatedLife);
    } else {
      this.setProperties(startDate, startingBalance, life);
      this.calculateDepreciation();
    }

    this.setMonthlyTransactions(this.calculateMonthlySchedule);
  }

  calculateDepreciationWithEconomicLife(economicLife): void {
    const depreciation = this.getStartingBalance() / economicLife;

    this.setMonthlyDepreciation(depreciation);
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
