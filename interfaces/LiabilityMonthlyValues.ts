export interface LiabilityMonthlyValues {
  date: Date;
  beginningBalance: number;
  payment: number;
  interestExpense: number;
  interestPayment: number;
  principal: number;
  endingBalance: number;
  shortTermBalance: number;
  longTermBalance: number;
}
