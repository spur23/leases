"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMonth = void 0;
var addMonth = function (date, months) {
    var month = date.getMonth() + months - 1;
    var year = date.getFullYear();
    if (month === 11) {
        return new Date(year + 1, 0, 1);
    }
    else {
        return new Date(year, month + 1, 1);
    }
};
exports.addMonth = addMonth;
