"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetMonthly = void 0;
var index_1 = require("../../utils/index");
var AssetMonthly = /** @class */ (function () {
    function AssetMonthly(date, beginningBalance, depreciation) {
        this.date = date;
        this.beginningBalance = beginningBalance;
        this.depreciation = depreciation;
        this.beginningBalance = beginningBalance;
        this.depreciation = depreciation;
        var endBalance = this.beginningBalance - this.depreciation;
        this.endingBalance = index_1.roundNumber(endBalance, 2);
        this.date = date;
    }
    AssetMonthly.prototype.getMonthlyData = function () {
        return {
            date: this.date,
            beginningBalance: this.beginningBalance,
            depreciation: this.depreciation,
            endingBalance: this.endingBalance
        };
    };
    return AssetMonthly;
}());
exports.AssetMonthly = AssetMonthly;
