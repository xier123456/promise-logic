import { createLogicError } from '../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class MajorityGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>,options:{
    max:number
  }): Promise<T[]> {

    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterFulfilledResults(results);
    const fulfilledCount = fulfilled.length;
    const total = results.length;
    
    // Majority logic: success count > failure count
    if (fulfilledCount > (total*options.max)) {
      return fulfilled;
    } else {
      throw createLogicError('MAJORITY_ERROR', fulfilledCount, total, results);
    }
  }
}