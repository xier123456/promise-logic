import { createLogicError } from '../../utils/v1/errors.js';
import { BaseGate } from './BaseGate.js';

export class XorGate extends BaseGate {
  async execute(iterable, options = {}) {
    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterFulfilledResults(results);
    const rejected = this.filterRejectedResults(results);
    const fulfilledCount = fulfilled.length;
    const total = results.length;

    if (fulfilledCount === 1) {
      return fulfilled[0];
    } else {
      throw createLogicError('XOR_ERROR', fulfilledCount, total, results, rejected);
    }
  }
}
