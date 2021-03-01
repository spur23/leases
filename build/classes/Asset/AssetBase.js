"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetBase = void 0;
var utils_1 = require("../../utils");
var AssetMonthly_1 = require("./AssetMonthly");
var AssetBase = /** @class */ (function () {
    function AssetBase() {
    }
    AssetBase.prototype.setProperties = function (startDate, startingBalance, life) {
        this.startDate = new Date(startDate);
        this.startingBalance = utils_1.roundNumber(startingBalance, 2);
        this.life = life;
    };
    AssetBase.prototype.setPropertiesFromJSON = function (schedule) {
        var _a = schedule[0], date = _a.date, beginningBalance = _a.beginningBalance;
        var life = schedule.length;
        this.setProperties(date, beginningBalance, life);
        this.setMonthlyTransactionsFromJSON(schedule);
    };
    AssetBase.prototype.getStartingBalance = function () {
        return this.startingBalance;
    };
    AssetBase.prototype.getLife = function () {
        return this.life;
    };
    AssetBase.prototype.getMonthlyTransactions = function () {
        return this.monthlyTransactions;
    };
    AssetBase.prototype.getAssetData = function () {
        var schedule = this.monthlyTransactions.map(function (month) {
            var _a = month.getMonthlyData(), date = _a.date, beginningBalance = _a.beginningBalance, depreciation = _a.depreciation, endingBalance = _a.endingBalance;
            // check if the ending balance is less than 1
            // if so add it to the depreciation amount to account for rounding
            // set ending balance to 0
            if (endingBalance < 1) {
                return {
                    date: date.toLocaleDateString(),
                    beginningBalance: beginningBalance,
                    depreciation: endingBalance + depreciation,
                    endingBalance: endingBalance - endingBalance
                };
            }
            else {
                return {
                    date: date.toLocaleDateString(),
                    beginningBalance: beginningBalance,
                    depreciation: depreciation,
                    endingBalance: endingBalance
                };
            }
        });
        return schedule;
    };
    AssetBase.prototype.setMonthlyDepreciation = function (depreciation) {
        this.monthlyDepreciation = utils_1.roundNumber(depreciation, 2);
    };
    AssetBase.prototype.setMonthlyTransactions = function (callback) {
        this.monthlyTransactions = callback(this.startDate, this.life, this.startingBalance, this.monthlyDepreciation);
    };
    AssetBase.prototype.setMonthlyTransactionsFromJSON = function (data) {
        this.monthlyTransactions = data.map(function (month) {
            return new AssetMonthly_1.AssetMonthly(new Date(month.date), month.beginningBalance, month.depreciation);
        });
    };
    return AssetBase;
}());
exports.AssetBase = AssetBase;
