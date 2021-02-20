import { LeaseClassification, Prepaid } from '../enums';
import { PaymentStream } from '../interfaces';
import { AssetFinance } from './Asset/AssetFinance';
import { Liability } from './Liability/Liability';
import { Payments } from './Payments/Payments';

// parent class
export class Lease {
  private totalPayments: number;
  private paymentStream: PaymentStream[];
  private quantityOfPayments: number;
  private presentValue: number;
  private startDate: string;
  private endDate: string;
  private liability: any;
  private asset: any;

  constructor(
    private name: string,
    private description: string,
    private classification: LeaseClassification,
    private interestRate: number,
    private payments: Payments,
    private prepaid: boolean
  ) {
    this.name = name;
    this.description = description;
    this.classification = classification;
    this.payments = payments;
    this.totalPayments = this.getSumOfPayments();
    this.interestRate = interestRate / 100;
    this.prepaid = prepaid;
    this.quantityOfPayments = this.getQuantityOfPayments();

    this.presentValue = this.calculatePresentValue();

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

    // Liability is calculated first because it is needed to calculate the
    // operating lease asset schedule
    this.liability = new Liability(
      this.startDate,
      this.getSumOfPayments(),
      this.paymentStream,
      this.interestRate,
      this.presentValue,
      this.quantityOfPayments
    );

    // create and calculate a new asset based off of classification
    if (this.classification === LeaseClassification.FINANCE) {
      this.asset = new AssetFinance(
        this.startDate,
        this.presentValue,
        this.quantityOfPayments
      );
    } else if (this.classification === LeaseClassification.OPERATING) {
      console.log('Operating Lease');
    } else {
      throw new Error(
        'Lease must be classified as either an operating or finance'
      );
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
    return (
      (this.payments.sumAllPayments() / (1 + this.interestRate)) ^
      this.getQuantityOfPayments()
    );
  }
}
