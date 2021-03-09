import { LiabilitySchedulePrint } from '../../interfaces';
import { PaymentStream } from '../../interfaces';
import { generateLiability } from '../../utils';
import { LiabilityMonthly } from './LiabilityMonthly';
import { LiabilityValues } from '../../interfaces/LiabilityValues';
import { LeaseClassification } from '../../enums/LeaseClassification';

export class Liability implements LiabilityValues {
  startDate: Date;
  monthlyTransactions: LiabilityMonthly[];
  payment: number;
  paymentStream: PaymentStream[];
  interestRate: number;
  startingBalance: number;
  life: number;
  prepaid: boolean;

  setProperties(
    startDate: string,
    payment: number,
    paymentStream: PaymentStream[],
    interestRate: number,
    startingBalance: number,
    life: number,
    prepaid: boolean,
    classification: string
  ) {
    if (classification === LeaseClassification.OPERATING) {
      this.startingBalance = startingBalance;
    } else {
      this.startingBalance = startingBalance;
    }

    this.startDate = new Date(startDate);
    this.paymentStream = paymentStream;
    this.payment = payment;
    this.interestRate = interestRate;
    this.life = life;
    this.prepaid = prepaid;

    this.monthlyTransactions = this.calculateMonthlySchedule();
  }

  setPropertiesJSON(data, paymentStream, interestRate, life, prepaid) {
    // const { date, beginningBalance, payment } = data[0];
    // this.startingBalance = beginningBalance;
    // this.startDate = new Date(date);
    // this.paymentStream = paymentStream;
    // this.payment = payment;
    // this.interestRate = interestRate;
    // this.life = life;
    // this.prepaid = prepaid;
    // const liabilityMonthly = data.map((month) => {
    //   const monthLblity = new LiabilityMonthly(
    //     new Date(month.date),
    //     month.payment,
    //     month.beginningBalance,
    //     this.interestRate,
    //     month.interestPayment,
    //     this.prepaid
    //   );
    //   monthLblity.shortTermBalance = month.shortTermBalance;
    //   monthLblity.longTermBalance = month.longTermBalance;
    //   return monthLblity;
    // });
    // this.monthlyTransactions = liabilityMonthly;
  }

  calculateMonthlySchedule(): LiabilityMonthly[] {
    const monthlySchedule = generateLiability(
      this.paymentStream,
      this.startingBalance,
      this.interestRate,
      this.prepaid
    );

    return monthlySchedule;
  }

  getLiabilityData(): LiabilitySchedulePrint[] {
    const schedule = this.monthlyTransactions.map((month) => {
      const {
        date,
        beginningBalance,
        payment,
        interestExpense,
        interestPayment,
        principal,
        endingBalance,
        shortTermBalance,
        longTermBalance
      } = month.getMonthlyData();

      return {
        date: date.toLocaleDateString(),
        beginningBalance,
        payment,
        interestExpense,
        interestPayment,
        principal,
        endingBalance,
        shortTermBalance,
        longTermBalance
      };
    });

    return schedule;
  }
}
