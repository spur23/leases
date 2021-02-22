export const data = {
  lease: 'vehicles',
  prepaid: false,
  description: 'Vehicles leased in Mexico',
  classification: 'operating',
  interestRate: 0.046,
  totalPayments: 500,
  quantityOfPayments: 5,
  presentValue: 494.3,
  startDate: '1/1/2020',
  endDate: '5/1/2020',
  payments: [
    {
      payment: 100,
      frequency: 'monthly',
      startDate: '1/1/2020',
      endDate: '5/1/2020',
      payments: 5
    }
  ],
  asset: [
    {
      date: '1/1/2020',
      beginningBalance: 494.3,
      depreciation: 98.11,
      endingBalance: 396.19
    },
    {
      date: '2/1/2020',
      beginningBalance: 396.19,
      depreciation: 98.48,
      endingBalance: 297.71
    },
    {
      date: '3/1/2020',
      beginningBalance: 297.71,
      depreciation: 98.86,
      endingBalance: 198.85
    },
    {
      date: '4/1/2020',
      beginningBalance: 198.85,
      depreciation: 99.24,
      endingBalance: 99.61
    },
    {
      date: '5/1/2020',
      beginningBalance: 99.61,
      depreciation: 99.61,
      endingBalance: 0
    }
  ],
  liability: [
    {
      date: '1/1/2020',
      beginningBalance: 494.3,
      payment: 100,
      interestExpense: 1.89,
      interestPayment: 0,
      principal: 98.11,
      endingBalance: 396.19,
      shortTermBalance: 396.19,
      longTermBalance: 0
    },
    {
      date: '2/1/2020',
      beginningBalance: 396.19,
      payment: 100,
      interestExpense: 1.52,
      interestPayment: 0,
      principal: 98.48,
      endingBalance: 297.71,
      shortTermBalance: 297.71,
      longTermBalance: 0
    },
    {
      date: '3/1/2020',
      beginningBalance: 297.71,
      payment: 100,
      interestExpense: 1.14,
      interestPayment: 0,
      principal: 98.86,
      endingBalance: 198.85,
      shortTermBalance: 198.85,
      longTermBalance: 0
    },
    {
      date: '4/1/2020',
      beginningBalance: 198.85,
      payment: 100,
      interestExpense: 0.76,
      interestPayment: 0,
      principal: 99.24,
      endingBalance: 99.61,
      shortTermBalance: 99.61,
      longTermBalance: 0
    },
    {
      date: '5/1/2020',
      beginningBalance: 99.61,
      payment: 100,
      interestExpense: 0.38,
      interestPayment: 0,
      principal: 99.62,
      endingBalance: -0.01,
      shortTermBalance: -0.01,
      longTermBalance: 0
    }
  ]
};
