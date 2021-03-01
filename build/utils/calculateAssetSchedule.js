"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetMonthly_1 = require("../classes/Asset/AssetMonthly");
var enums_1 = require("../enums");
var addMonth_1 = require("./addMonth");
exports.default = (function (data) {
    var startDate = data.startDate, life = data.life, startingBalance = data.startingBalance, monthlyDepreciation = data.monthlyDepreciation, liabilitySchedule = data.liabilitySchedule, totalPayments = data.totalPayments, classification = data.classification;
    var straightLineRent = totalPayments / life;
    var result = [];
    for (var i = 0; i < life; i++) {
        var depreciation = monthlyDepreciation;
        if (i === 0) {
            if (classification === enums_1.LeaseClassification.OPERATING) {
                depreciation = straightLineRent - liabilitySchedule[i].interestExpense;
            }
            var month = new AssetMonthly_1.AssetMonthly(startDate, startingBalance, depreciation);
            result.push(month);
        }
        else {
            var endingBalance = result[i - 1].getMonthlyData().endingBalance;
            if (classification === enums_1.LeaseClassification.OPERATING) {
                depreciation = straightLineRent - liabilitySchedule[i].interestExpense;
            }
            var nextMonth = addMonth_1.addMonth(startDate, i);
            var month = new AssetMonthly_1.AssetMonthly(nextMonth, endingBalance, depreciation);
            result.push(month);
        }
    }
    return result;
});
