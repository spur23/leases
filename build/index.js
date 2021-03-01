"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lease_1 = require("./classes/Lease");
var data_1 = require("./data");
var createLeaseFromJSON = function (json) {
    var newLease = new Lease_1.Lease();
    newLease.setPropertiesFromJSON(json);
    console.log(newLease.getLeaseInformation());
};
try {
    createLeaseFromJSON(data_1.data);
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
    // const test = new Lease();
    // test.setProperties(
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
}
catch (err) {
    console.log(err);
}
