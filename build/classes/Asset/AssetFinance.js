"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetFinance = void 0;
var index_1 = require("../../utils/index");
var AssetBase_1 = require("./AssetBase");
var enums_1 = require("../../enums");
var AssetFinance = /** @class */ (function (_super) {
    __extends(AssetFinance, _super);
    function AssetFinance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssetFinance.prototype.setPropertiesFinance = function (startDate, startingBalance, life) {
        this.setProperties(startDate, startingBalance, life);
        this.calculateDepreciation();
        this.setMonthlyTransactions(this.calculateMonthlySchedule);
    };
    AssetFinance.prototype.calculateDepreciation = function () {
        var depreciation = this.getStartingBalance() / this.getLife();
        this.setMonthlyDepreciation(depreciation);
    };
    AssetFinance.prototype.calculateMonthlySchedule = function (startDate, life, startingBalance, monthlyDepreciation) {
        var assetData = {
            startDate: startDate,
            life: life,
            startingBalance: startingBalance,
            monthlyDepreciation: monthlyDepreciation,
            classification: enums_1.LeaseClassification.FINANCE
        };
        var assetSchedule = index_1.calculateAssetSchedule(assetData);
        return assetSchedule;
    };
    return AssetFinance;
}(AssetBase_1.AssetBase));
exports.AssetFinance = AssetFinance;
