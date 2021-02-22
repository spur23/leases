import { LiabilitySchedule } from '../../interfaces';
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

    this.calculateMonthlySchedule();
  }

  calculateMonthlySchedule(
    startDate: Date,
    life: number,
    startingBalance: number,
    liabilitySchedule
  ) {
    let result = [];

    // calculate the net total lease payments
    this.liabilitySchedule.this.straightLineRent =
      this.straightLineRent / this.liabilitySchedule.length;
  }
}
