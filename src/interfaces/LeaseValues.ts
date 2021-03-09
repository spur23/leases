import { LeaseClassification } from '../enums';
import { PaymentStream } from './PaymentStream';
import { Payments } from '../classes/Payments/Payments';

interface JSONData {
  lease: string;
  prepaid: boolean;
  description: string;
  classification: string;
  interestRate: number;
  presentValue: number;
  startDate: string;
  endDate: string;
  payments: {
    payment: number;
    frequency: string;
    startDate: string;
    endDate: string;
    payments: number;
  }[];
  asset: {}[];
  liability: any[];
}

export interface LeaseValues {
  name: string;
  description: string;
  classification: LeaseClassification;
  interestRate: number;
  payments: Payments;
  prepaid: boolean;
  liability?: any;
  asset?: any;
  totalPayments: number;
  paymentStream: PaymentStream[];
  quantityOfPayments: number;
  presentValue: number;
  startDate: string;
  endDate: string;
  deferredRent: number;
  leaseIncentive: number;
  initialDirectCosts: number;
  useEconomicLife: boolean;
  economicLife: number;
  setProperties: (
    name: string,
    description: string,
    classification: LeaseClassification,
    interestRate: number,
    payments: Payments,
    prepaid: boolean,
    deferredRent: number,
    leaseIncetive: number
  ) => void;
  setPropertiesFromJSON: (data: JSONData) => void;
}
