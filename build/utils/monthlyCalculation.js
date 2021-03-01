"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../enums");
var addMonth_1 = require("./addMonth");
/**
 *Calculates the next month and next payment depending on the payment frequency.
 */
exports.default = (function (y, startDate, payment, frequency) {
    var nextMonth = addMonth_1.addMonth(new Date(startDate), y);
    var monthlyPayment = payment;
    if (y === 0) {
        nextMonth = new Date(startDate);
    }
    else if (frequency === enums_1.PaymentFrequency.Annual) {
        if (y % 12 !== 0) {
            monthlyPayment = 0;
        }
    }
    else if (frequency === enums_1.PaymentFrequency.SemiAnnual) {
        if (y % 6 !== 0) {
            monthlyPayment = 0;
        }
    }
    else if (frequency === enums_1.PaymentFrequency.Quarterly) {
        if (y % 3 !== 0) {
            monthlyPayment = 0;
        }
    }
    return { nextMonth: nextMonth, monthlyPayment: monthlyPayment };
});
