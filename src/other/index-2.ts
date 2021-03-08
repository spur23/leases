// import { Payment } from '../classes/Payments/Payment';
// import { PaymentFrequency } from '../enums';
// import { Payments } from '../classes/Payments/Payments';
// import { Lease } from '../classes/Lease';
// import { LeaseClassification } from '../enums/LeaseClassification';
// import { data } from './data';
// import { Leases } from '../classes/Leases';

// const createLeaseFromJSON = (json) => {
//   const newLease = new Lease();

//   newLease.setPropertiesFromJSON(json);

//   console.log(newLease.getLeaseInformation());
// };

// try {
//   // createLeaseFromJSON(data);
//   const leases = new Leases();
//   const discountRate = 4.6;
//   const name = 'vehicles';
//   const description = 'Vehicles leased in Mexico';
//   const paymentStream1 = [
//     new Payment({
//       payment: 100,
//       frequency: PaymentFrequency.Monthly,
//       startDate: '1/1/2020',
//       endDate: '4/30/2020'
//     })
//   ];

//   const payments = new Payments(paymentStream1);

//   const lease = new Lease();

//   lease.setProperties(
//     name,
//     description,
//     LeaseClassification.FINANCE,
//     discountRate,
//     payments,
//     false
//   );

//   const discountRate2 = 8.32;
//   const name2 = 'rental property';
//   const description2 = 'Rental property in Mexico';
//   const paymentStream2 = [
//     new Payment({
//       payment: 12000,
//       frequency: PaymentFrequency.Monthly,
//       startDate: '4/1/2020',
//       endDate: '3/31/2021'
//     }),
//     new Payment({
//       payment: 14000,
//       frequency: PaymentFrequency.Monthly,
//       startDate: '4/1/2021',
//       endDate: '3/31/2023'
//     })
//   ];

//   const payments2 = new Payments(paymentStream2);

//   const lease2 = new Lease();
//   lease2.setProperties(
//     name2,
//     description2,
//     LeaseClassification.OPERATING,
//     discountRate2,
//     payments2,
//     true
//   );

//   leases.addLease(lease);
//   leases.addLease(lease2);

//   // console.log(payments.paymentStream());
//   // // const test = new AssetFinance('1/1/2020', 1000, 12);
//   // // test.getLeaseInformation();
//   console.log(leases.getLease('rental property').getLeaseInformation());
//   // const liability = new Liability('1/1/2020', 100, 0.046, 2400, 24);
//   // console.log(liability);
// } catch (err) {
//   console.log(err);
// }
