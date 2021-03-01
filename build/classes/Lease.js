"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lease = void 0;
var enums_1 = require("../enums");
var utils_1 = require("../utils");
var AssetFinance_1 = require("./Asset/AssetFinance");
var AssetOperating_1 = require("./Asset/AssetOperating");
var Liability_1 = require("./Liability/Liability");
var Payment_1 = require("./Payments/Payment");
var Payments_1 = require("../../classes/Payments/Payments");
var enums_2 = require("../enums");
// parent class
var Lease = /** @class */ (function () {
    function Lease() {
    }
    Lease.prototype.setProperties = function (name, description, classification, interestRate, payments, prepaid) {
        this.name = name;
        this.description = description;
        this.classification = classification;
        this.payments = payments;
        this.totalPayments = this.getSumOfPayments();
        this.interestRate = interestRate / 100;
        this.prepaid = prepaid;
        this.quantityOfPayments = this.getQuantityOfPayments();
        // create and sort the payments array to get the start and end dates of the lease
        var paymentsArray = this.payments
            .paymentInformation()
            .sort(function (a, b) {
            return new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf();
        });
        this.startDate = paymentsArray[0].startDate;
        this.endDate = paymentsArray[paymentsArray.length - 1].endDate;
        this.paymentStream = this.getPaymentStream();
        this.presentValue = this.calculatePresentValue();
        // Liability is calculated first because it is needed to calculate the
        // operating lease asset schedule
        this.liability = new Liability_1.Liability();
        this.liability.setProperties(this.startDate, this.getSumOfPayments(), this.paymentStream, this.interestRate, this.presentValue, this.quantityOfPayments, this.prepaid);
        // create and calculate a new asset based off of classification
        if (this.classification === enums_1.LeaseClassification.FINANCE) {
            this.asset = new AssetFinance_1.AssetFinance();
            this.asset.setPropertiesFinance(this.startDate, this.presentValue, this.paymentStream.length);
        }
        else if (this.classification === enums_1.LeaseClassification.OPERATING) {
            this.asset = new AssetOperating_1.AssetOperating();
            this.asset.setPropertiesOperating(this.startDate, this.presentValue, this.paymentStream.length, this.getLiabilitySchedule());
        }
        else {
            throw new Error('Lease must be classified as either an operating or finance');
        }
    };
    Lease.prototype.setPropertiesFromJSON = function (data) {
        var lease = data.lease, prepaid = data.prepaid, description = data.description, classification = data.classification, interestRate = data.interestRate, presentValue = data.presentValue, startDate = data.startDate, endDate = data.endDate, payments = data.payments, asset = data.asset, liability = data.liability;
        var leaseClassification = classification === 'operating'
            ? enums_1.LeaseClassification.OPERATING
            : enums_1.LeaseClassification.FINANCE;
        var paymentArray = payments.map(function (el) {
            var frequency;
            if (el.frequency === 'annual') {
                frequency = enums_2.PaymentFrequency.Annual;
            }
            else if (el.frequency === 'semiannual') {
                frequency = enums_2.PaymentFrequency.SemiAnnual;
            }
            else if (el.frequency === 'quarterly') {
                frequency = enums_2.PaymentFrequency.Quarterly;
            }
            else {
                frequency = enums_2.PaymentFrequency.Monthly;
            }
            return new Payment_1.Payment({
                payment: el.payment,
                frequency: frequency,
                startDate: new Date(el.startDate).toLocaleDateString(),
                endDate: new Date(el.endDate).toLocaleDateString()
            });
        });
        var paymentObjects = new Payments_1.Payments(paymentArray);
        this.name = lease;
        this.description = description;
        this.classification = leaseClassification;
        this.interestRate = interestRate;
        this.payments = paymentObjects;
        this.prepaid = prepaid;
        this.totalPayments = this.getSumOfPayments();
        this.quantityOfPayments = this.getQuantityOfPayments();
        var paymentsArray = this.payments
            .paymentInformation()
            .sort(function (a, b) {
            return new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf();
        });
        this.startDate = paymentsArray[0].startDate;
        this.endDate = paymentsArray[paymentsArray.length - 1].endDate;
        this.paymentStream = this.getPaymentStream();
        this.liability = new Liability_1.Liability();
        this.liability.setPropertiesJSON(liability, this.paymentStream, this.interestRate, liability.length, this.prepaid);
        // create and calculate a new asset based off of classification
        if (this.classification === enums_1.LeaseClassification.FINANCE) {
            this.asset = new AssetFinance_1.AssetFinance();
            this.asset.setPropertiesFromJSON(asset);
        }
        else if (this.classification === enums_1.LeaseClassification.OPERATING) {
            this.asset = new AssetOperating_1.AssetOperating();
            this.asset.setPropertiesFromJSON(asset);
        }
        else {
            throw new Error('Lease must be classified as either an operating or finance');
        }
        this.presentValue = this.liability.getLiabilityData()[0].beginningBalance;
    };
    Lease.prototype.getPayments = function () {
        return this.payments.paymentInformation();
    };
    Lease.prototype.getLeaseInformation = function () {
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
    };
    Lease.prototype.getSumOfPayments = function () {
        return this.payments.sumAllPayments();
    };
    Lease.prototype.getQuantityOfPayments = function () {
        return this.payments.quantityOfPayments();
    };
    Lease.prototype.getPaymentStream = function () {
        return this.payments.paymentStream();
    };
    Lease.prototype.getAssetSchedule = function () {
        return this.asset.getAssetData();
    };
    Lease.prototype.getLiabilitySchedule = function () {
        return this.liability.getLiabilityData();
    };
    Lease.prototype.calculatePresentValue = function () {
        var paymentStream = this.paymentStream.map(function (month) { return month.payment; });
        var rateOfReturn = this.interestRate / 12;
        var presentValue = paymentStream.reduce(function (accumulator, currentValue, index) {
            return accumulator + currentValue / Math.pow(rateOfReturn + 1, index + 1);
        }, 0);
        return utils_1.roundNumber(presentValue, 2);
    };
    return Lease;
}());
exports.Lease = Lease;
