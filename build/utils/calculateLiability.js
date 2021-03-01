"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var LiabilityMonthly_1 = require("../classes/Liability/LiabilityMonthly");
/**
 *Calculates liability monthly schedule.
 */
exports.default = (function (paymentStream, startingBalance, interestRate, prepaid) {
    var result = [];
    var payments = __spreadArrays(paymentStream);
    for (var i = 0; i < payments.length; i++) {
        var date = new Date(payments[i].month);
        var payment = payments[i].payment;
        if (i === 0) {
            var month = new LiabilityMonthly_1.LiabilityMonthly(date, payment, startingBalance, interestRate, 0, prepaid);
            result.push(month);
        }
        else {
            var month = void 0;
            var _a = result[i - 1].getMonthlyData(), interestExpense = _a.interestExpense, endingBalance = _a.endingBalance;
            if (prepaid) {
                month = new LiabilityMonthly_1.LiabilityMonthly(date, payment, endingBalance, interestRate, interestExpense, prepaid);
            }
            else {
                month = new LiabilityMonthly_1.LiabilityMonthly(date, payment, endingBalance, interestRate, 0, prepaid);
            }
            result.push(month);
        }
    }
    result.sort(function (a, b) { return new Date(a.date).valueOf() - new Date(b.date).valueOf(); });
    var stBalance = 0;
    var ltBalance = 0;
    for (var i = 0; i < result.length; i++) {
        if (i < result.length - 12) {
            for (var y = 0; y < 12; y++) {
                stBalance += result[y + i].principal;
            }
            ltBalance = result[i].endingBalance - stBalance;
            result[i].shortTermBalance = _1.roundNumber(stBalance, 2);
            result[i].longTermBalance = _1.roundNumber(ltBalance, 2);
        }
        else {
            result[i].shortTermBalance = _1.roundNumber(result[i].endingBalance, 2);
            result[i].longTermBalance = 0;
        }
        stBalance = 0;
        ltBalance = 0;
    }
    return result;
});
