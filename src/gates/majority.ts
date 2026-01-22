import { createLogicError } from '../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class MajorityGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterResults(results, 'fulfilled');
    const fulfilledCount = fulfilled.length;
    const total = results.length;
    
    // Majority logic: success count > failure count
    if (fulfilledCount > total - fulfilledCount) {
      return fulfilled;
    } else {
      throw createLogicError('MAJORITY_ERROR', fulfilledCount, total, results);
    }
  }
}