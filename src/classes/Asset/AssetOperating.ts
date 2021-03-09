import { LeaseClassification } from '../../enums';
import { LiabilitySchedule } from '../../interfaces';
import { calculateAssetSchedule } from '../../utils';
import { AssetBase } from './AssetBase';

export class AssetOperating extends AssetBase {
  private straightLineRent: number;

  setPropertiesOperating(
    startDate: string,
    startingBalance: number,
    deferredRent: number,
    leaseIncentive: number,
    initialDirectCosts: number,
    life: number,
    liabilitySchedule: LiabilitySchedule[]
  ): void {
    // beginning balance is equal to PV less deferred rent less lease incentives plus initial direct costs
    const beginningBalance =
      startingBalance - deferredRent - leaseIncentive + initialDirectCosts;

    this.setProperties(startDate, beginningBalance, life);
    this.setMonthlyTransactions(
      this.calculateMonthlySchedule(
        liabilitySchedule,
        leaseIncentive,
        deferredRent,
        initialDirectCosts
      )
    );
  }

  calculateMonthlySchedule(
    liabilitySchedule: LiabilitySchedule[],
    leaseIncentive: number,
    deferredRent: number,
    initialDirectCosts: number
  ) {
    const totalPayments = liabilitySchedule.reduce(
      (accumulator, currentValue) => accumulator + currentValue.payment,
      0
    );

    return (startDate: Date, life: number, startingBalance: number) => {
      this.straightLineRent =
        (totalPayments - leaseIncentive - deferredRent + initialDirectCosts) /
        life;

      const assetData = {
        startDate,
        life,
        startingBalance,
        liabilitySchedule,
        totalPayments,
        classification: LeaseClassification.OPERATING
      };

      const assetSchedule = calculateAssetSchedule(
        assetData,
        this.straightLineRent
      );

      return assetSchedule;
    };
  }
}
