import { Payment } from './classes/Payments/Payment';
import { PaymentFrequency } from './enums';
import { Payments } from './classes/Payments/Payments';
import { Lease } from './classes/Lease';
import { LeaseClassification } from './enums/LeaseClassification';
import { data } from './data';

const createLeaseFromJSON = (json) => {
  const {
    lease,
    prepaid,
    description,
    classification,
    interestRate,
    startDate,
    endDate,
    payments,
    asset,
    liability
  } = json;

  const paymentArray = payments.map(
    (el) =>
      new Payment({
        payment: el.payment,
        frequency: el.frequency,
        startDate: new Date(el.startDate).toLocaleDateString(),
        endDate: new Date(el.endDate).toLocaleDateString()
      })
  );

  const paymentObjects = new Payments(paymentArray);
  const leaseClassification =
    classification === 'operating'
      ? LeaseClassification.OPERATING
      : LeaseClassification.FINANCE;

  const newLease = new Lease(
    lease,
    description,
    leaseClassification,
    interestRate,
    paymentObjects,
    prepaid,
    true,
    liability,
    asset
  );

  console.log(newLease.getLeaseInformation());
};

try {
  createLeaseFromJSON(data);
  // const discountRate = 4.6;
  // const name = 'vehicles';
  // const description = 'Vehicles leased in Mexico';
  // const paymentStream1 = [
  //   new Payment({
  //     payment: 100,
  //     frequency: PaymentFrequency.Monthly,
  //     startDate: '1/1/2020',
  //     endDate: '4/31/2020'
  //   })
  // ];

  // const payments = new Payments(paymentStream1);

  // const test = new Lease(
  //   name,
  //   description,
  //   LeaseClassification.OPERATING,
  //   discountRate,
  //   payments,
  //   false
  // );

  // // console.log(payments.paymentStream());
  // // const test = new AssetFinance('1/1/2020', 1000, 12);
  // // test.getLeaseInformation();
  // console.log(test.getLeaseInformation());
  // const liability = new Liability('1/1/2020', 100, 0.046, 2400, 24);
  // console.log(liability);
} catch (err) {
  console.log(err);
}
