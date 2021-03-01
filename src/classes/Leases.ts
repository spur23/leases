import { Lease } from './Lease';

export class Leases {
  leases: Lease[];
  leaseQty: number;
  constructor() {
    this.leases = [];
    this.leaseQty = 0;
  }
  setProperties() {
    this.leaseQty = this.leases.length;
  }

  addLease(lease: Lease) {
    this.leases.push(lease);
    this.setProperties();
  }

  getLease(leaseName: string): Lease {
    return this.leases.find((lease: Lease) => lease.name === leaseName);
  }
}
