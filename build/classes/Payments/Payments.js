"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payments = void 0;
var utils_1 = require("../../utils");
var Payments = /** @class */ (function () {
    function Payments(payments) {
        this.payments = payments;
    }
    Payments.prototype.sumAllPayments = function () {
        var result = 0;
        this.payments.forEach(function (payment) {
            result += payment.sumPayments();
        });
        return result;
    };
    Payments.prototype.paymentInformation = function () {
        return this.payments.map(function (payment) { return payment.getPaymentInformation(); });
    };
    Payments.prototype.quantityOfPayments = function () {
        return this.payments.reduce(function (a, b) { return a + b.getPayments(); }, 0);
    };
    Payments.prototype.paymentStream = function () {
        var arr = [];
        // loop through all payment streams
        for (var i = 0; i < this.payments.length; i++) {
            var startDate = this.payments[i].getPaymentInformation().startDate;
            var streamLength = this.payments[i].getPaymentInformation().payments;
            // loop through payments to create an array of payments with dates to pass to the liability
            for (var y = 0; y < streamLength; y++) {
                var _a = this.payments[i].getPaymentInformation(), payment = _a.payment, frequency = _a.frequency;
                var _b = utils_1.monthlyCalculation(y, startDate, payment, frequency), nextMonth = _b.nextMonth, monthlyPayment = _b.monthlyPayment;
                arr.push({
                    month: nextMonth,
                    payment: monthlyPayment
                });
            }
        }
        return arr;
    };
    return Payments;
}());
exports.Payments = Payments;
