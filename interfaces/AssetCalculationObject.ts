import { LiabilitySchedule } from '.';
import { LeaseClassification } from '../enums';

export interface AssetCalculationObject {
  startDate: Date;
  life: number;
  startingBalance: number;
  monthlyDepreciation?: number;
  liabilitySchedule?: LiabilitySchedule[];
  totalPayments?: number;
  classification: LeaseClassification;
}
