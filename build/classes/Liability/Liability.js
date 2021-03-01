"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Liability = void 0;
var utils_1 = require("../../utils");
var LiabilityMonthly_1 = require("./LiabilityMonthly");
var Liability = /** @class */ (function () {
    function Liability() {
    }
    Liability.prototype.setProperties = function (startDate, payment, paymentStream, interestRate, startingBalance, life, prepaid) {
        this.startingBalance = startingBalance;
        this.startDate = new Date(startDate);
        this.paymentStream = paymentStream;
        this.payment = payment;
        this.interestRate = interestRate;
        this.life = life;
        this.prepaid = prepaid;
        this.monthlyTransactions = this.calculateMonthlySchedule();
    };
    Liability.prototype.setPropertiesJSON = function (data, paymentStream, interestRate, life, prepaid) {
        var _this = this;
        var _a = data[0], date = _a.date, beginningBalance = _a.beginningBalance, payment = _a.payment;
        this.startingBalance = beginningBalance;
        this.startDate = new Date(date);
        this.paymentStream = paymentStream;
        this.payment = payment;
        this.interestRate = interestRate;
        this.life = life;
        this.prepaid = prepaid;
        var liabilityMonthly = data.map(function (month) {
            var monthLblity = new LiabilityMonthly_1.LiabilityMonthly(new Date(month.date), month.payment, month.beginningBalance, _this.interestRate, month.interestPayment, _this.prepaid);
            monthLblity.shortTermBalance = month.shortTermBalance;
            monthLblity.longTermBalance = month.longTermBalance;
            return monthLblity;
        });
        this.monthlyTransactions = liabilityMonthly;
    };
    Liability.prototype.calculateMonthlySchedule = function () {
        var monthlySchedule = utils_1.calculateLiability(this.paymentStream, this.startingBalance, this.interestRate, this.prepaid);
        return monthlySchedule;
    };
    Liability.prototype.getLiabilityData = function () {
        var schedule = this.monthlyTransactions.map(function (month) {
            var _a = month.getMonthlyData(), date = _a.date, beginningBalance = _a.beginningBalance, payment = _a.payment, interestExpense = _a.interestExpense, interestPayment = _a.interestPayment, principal = _a.principal, endingBalance = _a.endingBalance, shortTermBalance = _a.shortTermBalance, longTermBalance = _a.longTermBalance;
            return {
                date: date.toLocaleDateString(),
                beginningBalance: beginningBalance,
                payment: payment,
                interestExpense: interestExpense,
                interestPayment: interestPayment,
                principal: principal,
                endingBalance: endingBalance,
                shortTermBalance: shortTermBalance,
                longTermBalance: longTermBalance
            };
        });
        return schedule;
    };
    return Liability;
}());
exports.Liability = Liability;
