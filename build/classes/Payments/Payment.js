"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
// payment class
var Payment = /** @class */ (function () {
    function Payment(config) {
        this.payment = config.payment;
        this.frequency = config.frequency;
        this.startDate = new Date(config.startDate);
        this.endDate = new Date(config.endDate);
        // calculate the number of months between the start date and end date
        var years = this.endDate.getFullYear() - this.startDate.getFullYear();
        var months = years * 12 + (this.endDate.getMonth() - this.startDate.getMonth()) + 1;
        if (months <= 0) {
            this.payments = 0;
        }
        else {
            this.payments = months;
        }
    }
    Payment.prototype.getPaymentInformation = function () {
        return {
            payment: this.payment,
            frequency: this.frequency,
            startDate: this.startDate.toLocaleDateString(),
            endDate: this.endDate.toLocaleDateString(),
            payments: this.payments
        };
    };
    Payment.prototype.sumPayments = function () {
        return this.payment * this.payments;
    };
    Payment.prototype.getPayments = function () {
        return this.payments;
    };
    return Payment;
}());
exports.Payment = Payment;
