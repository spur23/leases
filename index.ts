import { Payment } from './classes/Payment';
import { PaymentFrequency, Prepaid } from './enums';
import { Payments } from './classes/Payments';
import { Lease } from './classes/Lease';
import { LeaseClassification } from './enums/LeaseClassification';
import { AssetFinance } from './classes/Asset/AssetFinance';

// test file

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
    }),
    new Payment({
      payment: 300,
      frequency: PaymentFrequency.Monthly,
      startDate: '1/1/2021',
      endDate: '6/30/2025'
    })
  ];

  const payments = new Payments(paymentStream1);

  const test = new Lease(
    name,
    description,
    LeaseClassification.FINANCE,
    discountRate,
    payments,
    true
  );

  // const test = new AssetFinance('1/1/2020', 1000, 12);
  // test.getLeaseInformation();
  console.log(test.getLeaseInformation());
} catch (err) {
  console.log(err);
}
