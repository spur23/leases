import { LeaseClassification } from '../enums';
import { PaymentStream } from '../interfaces';
import { roundNumber } from '../utils';
import { AssetFinance } from './Asset/AssetFinance';
import { AssetOperating } from './Asset/AssetOperating';
import { Liability } from './Liability/Liability';
import { LiabilityFromJSON } from './Liability/LiabilityFromJSON';
import { Payments } from './Payments/Payments';

// parent class
export class Lease {
  private totalPayments: number;
  private paymentStream: PaymentStream[];
  private quantityOfPayments: number;
  private presentValue: number;
  private startDate: string;
  private endDate: string;

  constructor(
    private name: string,
    private description: string,
    private classification: LeaseClassification,
    private interestRate: number,
    private payments: Payments,
    private prepaid: boolean,
    private fromJSON: boolean,
    private liability?: any,
    private asset?: any
  ) {
    this.name = name;
    this.description = description;
    this.classification = classification;
    this.payments = payments;
    this.totalPayments = this.getSumOfPayments();
    this.interestRate = interestRate / 100;
    this.prepaid = prepaid;
    this.quantityOfPayments = this.getQuantityOfPayments();

    // create and sor thte payments array to get the start and end dates of the lease
    const paymentsArray = this.payments
      .paymentInformation()
      .sort(
        (a, b) =>
          new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()
      );

    this.startDate = paymentsArray[0].startDate;
    this.endDate = paymentsArray[paymentsArray.length - 1].endDate;
    this.paymentStream = this.getPaymentStream();

    this.presentValue = this.calculatePresentValue();

    // Liability is calculated first because it is needed to calculate the
    // operating lease asset schedule
    if (fromJSON) {
      // this.liability = new LiabilityFromJSON().fromJSON();
    } else {
      this.liability = new Liability(
        this.startDate,
        this.getSumOfPayments(),
        this.paymentStream,
        this.interestRate,
        this.presentValue,
        this.quantityOfPayments,
        this.prepaid
      );

      // create and calculate a new asset based off of classification
      if (this.classification === LeaseClassification.FINANCE) {
        this.asset = new AssetFinance(
          this.startDate,
          this.presentValue,
          this.paymentStream.length
        );
      } else if (this.classification === LeaseClassification.OPERATING) {
        this.asset = new AssetOperating(
          this.startDate,
          this.presentValue,
          this.paymentStream.length,
          this.getLiabilitySchedule()
        );
      } else {
        throw new Error(
          'Lease must be classified as either an operating or finance'
        );
      }
    }
  }

  getPayments() {
    return this.payments.paymentInformation();
  }

  getLeaseInformation() {
    return {
      lease: this.name,
      prepaid: this.prepaid,
      description: this.description,
      classification: this.classification,
      interestRate: this.interestRate,
      totalPayments: this.totalPayments,
      quantityOfPayments: this.quantityOfPayments,
      presentValue: this.presentValue,
      startDate: this.startDate,
      endDate: this.endDate,
      payments: this.getPayments(),
      asset: this.getAssetSchedule(),
      liability: this.getLiabilitySchedule()
    };
  }

  getSumOfPayments() {
    return this.payments.sumAllPayments();
  }

  getQuantityOfPayments() {
    return this.payments.quantityOfPayments();
  }

  getPaymentStream() {
    return this.payments.paymentStream();
  }

  getAssetSchedule() {
    return this.asset.getAssetData();
  }

  getLiabilitySchedule() {
    return this.liability.getLiabilityData();
  }

  private calculatePresentValue(): number {
    const paymentStream = this.paymentStream.map((month) => month.payment);
    const rateOfReturn = this.interestRate / 12;
    const presentValue = paymentStream.reduce(
      (accumulator, currentValue, index) =>
        accumulator + currentValue / Math.pow(rateOfReturn + 1, index + 1),
      0
    );

    return roundNumber(presentValue, 2);
  }

  // applyData(json) {
  //   Object.assign(this, json);
  // }
}
