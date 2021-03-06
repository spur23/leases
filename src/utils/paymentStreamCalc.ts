const paymentStreamCalc = (dateFrom: Date, dateTo: Date): number | never => {
  const monthFrom = dateFrom.getMonth() + 1;
  const monthTo = dateTo.getMonth() + 1;
  const yearFrom = dateFrom.getFullYear();
  const yearTo = dateTo.getFullYear();
  const yearMonths = (yearTo - yearFrom) * 12;
  let result = 0;

  if (dateTo.valueOf() < dateFrom.valueOf()) {
    throw new Error('dateTo must be after dateFrom');
  }

  if (yearFrom === yearTo) {
    result = monthTo - monthFrom + 1;
  } else {
    let months = 0;
    if (monthTo > monthFrom) {
      months = monthTo - monthFrom;
      result = yearMonths + months;
    } else if (monthTo < monthFrom || monthTo === monthFrom) {
      months = monthFrom - monthTo;

      result = yearMonths - months;
    }
  }

  return result;
};

export default paymentStreamCalc;
