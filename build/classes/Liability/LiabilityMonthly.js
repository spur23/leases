"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiabilityMonthly = void 0;
var utils_1 = require("../../utils");
var LiabilityMonthly = /** @class */ (function () {
    function LiabilityMonthly(date, payment, beginningBalance, interestRate, interestPayment, prepaid) {
        this.date = date;
        this.payment = payment;
        this.beginningBalance = beginningBalance;
        this.interestRate = interestRate;
        this.interestPayment = interestPayment;
        this.prepaid = prepaid;
        this.date = date;
        this.beginningBalance = beginningBalance;
        this.interestRate = interestRate / 12;
        this.interestExpense = utils_1.roundNumber(this.beginningBalance * this.interestRate, 2);
        if (this.prepaid) {
            // check if the month has a cash payment if it does not set the payment to 0
            // else calculate the principal payment
            if (payment === 0) {
                this.principal = 0;
                this.interestPayment = 0;
            }
            else {
                this.principal = payment - this.interestPayment;
                this.interestPayment = interestPayment;
            }
            this.endingBalance = utils_1.roundNumber(this.beginningBalance +
                this.interestExpense -
                this.principal -
                this.interestPayment, 2);
        }
        else {
            this.principal = payment - this.interestExpense;
            this.endingBalance = utils_1.roundNumber(this.beginningBalance - this.principal, 2);
        }
    }
    LiabilityMonthly.prototype.getMonthlyData = function () {
        return {
            date: this.date,
            beginningBalance: this.beginningBalance,
            payment: this.payment,
            interestExpense: this.interestExpense,
            interestPayment: this.interestPayment,
            principal: this.principal,
            endingBalance: this.endingBalance,
            shortTermBalance: this.shortTermBalance,
            longTermBalance: this.longTermBalance
        };
    };
    return LiabilityMonthly;
}());
exports.LiabilityMonthly = LiabilityMonthly;
