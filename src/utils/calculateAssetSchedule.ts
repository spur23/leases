import { AssetMonthly } from '../classes/Asset/AssetMonthly';
import { LeaseClassification } from '../enums';
import { AssetCalculationObject } from '../interfaces';
import { addMonth } from './addMonth';

const calculateAssetSchedule = (data: AssetCalculationObject) => {
  const {
    startDate,
    life,
    startingBalance,
    monthlyDepreciation,
    liabilitySchedule,
    totalPayments,
    classification
  } = data;

  const straightLineRent = totalPayments / life;

  let result = [];

  for (let i = 0; i < life; i++) {
    let depreciation = monthlyDepreciation;

    if (i === 0) {
      if (classification === LeaseClassification.OPERATING) {
        depreciation = straightLineRent - liabilitySchedule[i].interestExpense;
      }
      const month = new AssetMonthly(startDate, startingBalance, depreciation);

      result.push(month);
    } else {
      const { endingBalance } = result[i - 1].getMonthlyData();
      if (classification === LeaseClassification.OPERATING) {
        depreciation = straightLineRent - liabilitySchedule[i].interestExpense;
      }

      const nextMonth = addMonth(startDate, i);
      const month = new AssetMonthly(nextMonth, endingBalance, depreciation);

      result.push(month);
    }
  }

  return result;
};

export default calculateAssetSchedule;
