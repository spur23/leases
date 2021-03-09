import { AssetMonthly } from './AssetMonthly';
import { calculateAssetSchedule } from '../../utils/index';
import { AssetBase } from './AssetBase';
import { LeaseClassification } from '../../enums';

export class AssetFinance extends AssetBase {
  setPropertiesFinance(
    startDate: string,
    startingBalance: number,
    life: number,
    purchaseOption: boolean,
    economicLife?: number
  ): void {
    this.setProperties(startDate, startingBalance, life);
    if (purchaseOption) {
      this.calculateDepreciationWithPurchaseOption(economicLife);
    } else {
      this.calculateDepreciation();
    }

    this.setMonthlyTransactions(this.calculateMonthlySchedule);
  }

  calculateDepreciationWithPurchaseOption(economicLife): void {
    const depreciation = this.getStartingBalance() / (economicLife * 12);

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
