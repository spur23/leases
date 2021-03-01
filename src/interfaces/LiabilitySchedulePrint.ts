export interface LiabilitySchedulePrint {
  date: string;
  beginningBalance: number;
  payment: number;
  interestExpense: number;
  principal: number;
  endingBalance: number;
  shortTermBalance: number;
  longTermBalance: number;
}
