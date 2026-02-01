import { createLogicError } from '../../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class XorGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T> {
    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterFulfilledResults(results);
    const fulfilledCount = fulfilled.length;
    const total = results.length;
    const rejected = this.filterRejectedResults(results);
    
    if (fulfilledCount === 1) {
      return fulfilled[0];
    } else {
      throw createLogicError('XOR_ERROR', fulfilledCount, total, results, rejected);
    }
  }
}