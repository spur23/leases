import { LeaseClassification } from '../enums';
import { PaymentStream } from '../interfaces';
import { roundNumber } from '../utils';
import { AssetFinance } from './Asset/AssetFinance';
import { AssetOperating } from './Asset/AssetOperating';
import { Liability } from './Liability/Liability';
import { Payment } from './Payments/Payment';
import { LeaseValues } from '../interfaces/LeaseValues';
import { Payments } from '../../classes/Payments/Payments';
import { PaymentFrequency } from '../enums';

// parent class
export class Lease implements LeaseValues {
  name: string;
  description: string;
  classification: LeaseClassification;
  interestRate: number;
  payments: Payments;
  prepaid: boolean;
  liability?: any;
  asset?: any;
  totalPayments: number;
  paymentStream: PaymentStream[];
  quantityOfPayments: number;
  presentValue: number;
  startDate: string;
  endDate: string;

  setProperties(
    name: string,
    description: string,
    classification: LeaseClassification,
    interestRate: number,
    payments: Payments,
    prepaid: boolean
  ): void {
    this.name = name;
    this.description = description;
    this.classification = classification;
    this.payments = payments;
    this.totalPayments = this.getSumOfPayments();
    this.interestRate = interestRate / 100;
    this.prepaid = prepaid;
    this.quantityOfPayments = this.getQuantityOfPayments();

    // create and sort the payments array to get the start and end dates of the lease
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
    this.liability = new Liability();

    this.liability.setProperties(
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
      this.asset = new AssetFinance();

      this.asset.setPropertiesFinance(
        this.startDate,
        this.presentValue,
        this.paymentStream.length
      );
    } else if (this.classification === LeaseClassification.OPERATING) {
      this.asset = new AssetOperating();

      this.asset.setPropertiesOperating(
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

  setPropertiesFromJSON(data: {
    lease: string;
    prepaid: boolean;
    description: string;
    classification: string;
    interestRate: number;
    presentValue: number;
    startDate: string;
    endDate: string;
    payments: {
      payment: number;
      frequency: string;
      startDate: string;
      endDate: string;
      payments: number;
    }[];
    asset: {}[];
    liability: any[];
  }): void {
    const {
      lease,
      prepaid,
      description,
      classification,
      interestRate,
      presentValue,
      startDate,
      endDate,
      payments,
      asset,
      liability
    } = data;

    const leaseClassification =
      classification === 'operating'
        ? LeaseClassification.OPERATING
        : LeaseClassification.FINANCE;

    const paymentArray = payments.map((el) => {
      let frequency;
      if (el.frequency === 'annual') {
        frequency = PaymentFrequency.Annual;
      } else if (el.frequency === 'semiannual') {
        frequency = PaymentFrequency.SemiAnnual;
      } else if (el.frequency === 'quarterly') {
        frequency = PaymentFrequency.Quarterly;
      } else {
        frequency = PaymentFrequency.Monthly;
      }
      return new Payment({
        payment: el.payment,
        frequency: frequency,
        startDate: new Date(el.startDate).toLocaleDateString(),
        endDate: new Date(el.endDate).toLocaleDateString()
      });
    });

    const paymentObjects = new Payments(paymentArray);

    this.name = lease;
    this.description = description;
    this.classification = leaseClassification;
    this.interestRate = interestRate;
    this.payments = paymentObjects;
    this.prepaid = prepaid;
    this.totalPayments = this.getSumOfPayments();
    this.quantityOfPayments = this.getQuantityOfPayments();

    const paymentsArray = this.payments
      .paymentInformation()
      .sort(
        (a, b) =>
          new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()
      );

    this.startDate = paymentsArray[0].startDate;
    this.endDate = paymentsArray[paymentsArray.length - 1].endDate;
    this.paymentStream = this.getPaymentStream();

    this.liability = new Liability();
    this.liability.setPropertiesJSON(
      liability,
      this.paymentStream,
      this.interestRate,
      liability.length,
      this.prepaid
    );

    // create and calculate a new asset based off of classification
    if (this.classification === LeaseClassification.FINANCE) {
      this.asset = new AssetFinance();
      this.asset.setPropertiesFromJSON(asset);
    } else if (this.classification === LeaseClassification.OPERATING) {
      this.asset = new AssetOperating();
      this.asset.setPropertiesFromJSON(asset);
    } else {
      throw new Error(
        'Lease must be classified as either an operating or finance'
      );
    }

    this.presentValue = this.liability.getLiabilityData()[0].beginningBalance;
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
