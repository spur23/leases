import { LeaseClassification } from '../../enums';
import { LiabilitySchedule } from '../../interfaces';
import { addMonth, calculateAssetSchedule } from '../../utils';
import { AssetBase } from './AssetBase';
import { AssetMonthly } from './AssetMonthly';

export class AssetOperating extends AssetBase {
  private straightLineRent: number;

  constructor(
    startDate: string,
    startingBalance: number,
    life: number,
    liabilitySchedule: LiabilitySchedule[]
  ) {
    super(startDate, startingBalance, life);

    this.setMonthlyTransactions(
      this.calculateMonthlySchedule(liabilitySchedule)
    );
  }

  calculateMonthlySchedule(liabilitySchedule) {
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
