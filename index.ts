import { Payment } from './classes/Payment';
import { PaymentFrequency } from './enums/PaymentFrequency';
import { Payments } from './classes/Payments';

const test = new Payments([
  new Payment({
    payment: 100,
    frequency: PaymentFrequency.SemiAnnual,
    startDate: '1/1/2020',
    endDate: '12/31/2021'
  }),
  new Payment({
    payment: 200,
    frequency: PaymentFrequency.Quarterly,
    startDate: '1/1/2022',
    endDate: '12/31/2024'
  })
]);

console.log(test.paymentInformation());
