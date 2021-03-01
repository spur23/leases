"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (dateFrom, dateTo) {
    var monthFrom = dateFrom.getMonth() + 1;
    var monthTo = dateTo.getMonth() + 1;
    var yearFrom = dateFrom.getFullYear();
    var yearTo = dateTo.getFullYear();
    var yearMonths = (yearTo - yearFrom) * 12;
    var result = 0;
    if (dateTo.valueOf() < dateFrom.valueOf()) {
        throw new Error('dateTo must be after dateFrom');
    }
    if (yearFrom === yearTo) {
        result = monthTo - monthFrom + 1;
    }
    else {
        var months = 0;
        if (monthTo > monthFrom) {
            months = monthTo - monthFrom;
            result = yearMonths + months;
        }
        else if (monthTo < monthFrom || monthTo === monthFrom) {
            months = monthFrom - monthTo;
            result = yearMonths - months;
        }
    }
    return result;
});
