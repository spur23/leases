import { LeaseClassification } from '../../enums';
import { LiabilitySchedule } from '../../interfaces';
import { calculateAssetSchedule } from '../../utils';
import { AssetBase } from './AssetBase';

export class AssetOperating extends AssetBase {
  private straightLineRent: number;

  setPropertiesOperating(
    startDate: string,
    startingBalance: number,
    life: number,
    liabilitySchedule: LiabilitySchedule[]
  ): void {
    this.setProperties(startDate, startingBalance, life);
    this.setMonthlyTransactions(
      this.calculateMonthlySchedule(liabilitySchedule)
    );
  }

  calculateMonthlySchedule(liabilitySchedule: LiabilitySchedule[]) {
    const totalPayments = liabilitySchedule.reduce(
      (accumulator, currentValue) => accumulator + currentValue.payment,
      0
    );

    return (startDate, life, startingBalance) => {
      this.straightLineRent = totalPayments / life;

      const assetData = {
        startDate,
        life,
        startingBalance,
        liabilitySchedule,
        totalPayments,
        classification: LeaseClassification.OPERATING
      };

      const assetSchedule = calculateAssetSchedule(assetData);

      return assetSchedule;
    };
  }
}
