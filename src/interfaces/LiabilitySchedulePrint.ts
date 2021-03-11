export interface LiabilitySchedulePrint {
  date: string;
  beginningBalance: number;
  payment: number;
  interestExpense: number;
  interestPayment: number;
  principal: number;
  endingBalance: number;
  shortTermBalance: number;
  longTermBalance: number;
}
