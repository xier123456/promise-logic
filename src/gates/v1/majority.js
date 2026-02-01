import { createLogicError } from '../../utils/v1/errors.js';
import { BaseGate } from './BaseGate.js';

export class MajorityGate extends BaseGate {
  async execute(iterable, options = { max: 0.5 }) {
    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterFulfilledResults(results);
    const fulfilledCount = fulfilled.length;
    const total = results.length;

    if (fulfilledCount > Math.floor(total * options.max)) {
      return fulfilled;
    } else {
      throw createLogicError('MAJORITY_ERROR', fulfilledCount, total, results);
    }
  }
}
