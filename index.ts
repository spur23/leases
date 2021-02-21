import { Payment } from './classes/Payments/Payment';
import { PaymentFrequency, Prepaid } from './enums';
import { Payments } from './classes/Payments/Payments';
import { Lease } from './classes/Lease';
import { LeaseClassification } from './enums/LeaseClassification';

try {
  const discountRate = 4.6;
  const name = 'vehicles';
  const description = 'Vehicles leased in Mexico';
  const paymentStream1 = [
    new Payment({
      payment: 100,
      frequency: PaymentFrequency.Monthly,
      startDate: '1/1/2020',
      endDate: '12/31/2020'
    })
  ];

  const payments = new Payments(paymentStream1);

  const test = new Lease(
    name,
    description,
    LeaseClassification.FINANCE,
    discountRate,
    payments,
    false
  );

  // const test = new AssetFinance('1/1/2020', 1000, 12);
  // test.getLeaseInformation();
  console.log(test.getLeaseInformation());
  // const liability = new Liability('1/1/2020', 100, 0.046, 2400, 24);
  // console.log(liability);
} catch (err) {
  console.log(err);
}
