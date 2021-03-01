export interface LiabilitySchedule {
  date: Date;
  beginningBalance: number;
  payment: number;
  interestExpense: number;
  principal: number;
  endingBalance: number;
  shortTermBalance: number;
  longTermBalance: number;
}
