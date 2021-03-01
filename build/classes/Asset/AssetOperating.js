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
exports.AssetOperating = void 0;
var enums_1 = require("../../enums");
var utils_1 = require("../../utils");
var AssetBase_1 = require("./AssetBase");
var AssetOperating = /** @class */ (function (_super) {
    __extends(AssetOperating, _super);
    function AssetOperating() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssetOperating.prototype.setPropertiesOperating = function (startDate, startingBalance, life, liabilitySchedule) {
        this.setProperties(startDate, startingBalance, life);
        this.setMonthlyTransactions(this.calculateMonthlySchedule(liabilitySchedule));
    };
    AssetOperating.prototype.calculateMonthlySchedule = function (liabilitySchedule) {
        var _this = this;
        var totalPayments = liabilitySchedule.reduce(function (accumulator, currentValue) { return accumulator + currentValue.payment; }, 0);
        return function (startDate, life, startingBalance) {
            _this.straightLineRent = totalPayments / life;
            var assetData = {
                startDate: startDate,
                life: life,
                startingBalance: startingBalance,
                liabilitySchedule: liabilitySchedule,
                totalPayments: totalPayments,
                classification: enums_1.LeaseClassification.OPERATING
            };
            var assetSchedule = utils_1.calculateAssetSchedule(assetData);
            return assetSchedule;
        };
    };
    return AssetOperating;
}(AssetBase_1.AssetBase));
exports.AssetOperating = AssetOperating;
