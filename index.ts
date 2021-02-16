import { Payment } from './classes/Payment';
import { PaymentFrequency } from './enums/PaymentFrequency';
import { Payments } from './classes/Payments';
import { Lease } from './classes/Lease';

// test file
const test = new Lease(
  'vehicles',
  'vehicles in Mexico',
  new Payments([
    new Payment({
      payment: 100,
      frequency: PaymentFrequency.Monthly,
      startDate: '1/1/2020',
      endDate: '12/31/2021'
    }),
    new Payment({
      payment: 200,
      frequency: PaymentFrequency.Monthly,
      startDate: '1/1/2022',
      endDate: '12/31/2024'
    })
  ]),
  4.6
);

console.log(test.getLeaseInformation());
