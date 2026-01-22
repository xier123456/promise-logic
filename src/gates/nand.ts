import { createLogicError } from '../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class NandGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterResults(results, 'fulfilled');
    const fulfilledCount = fulfilled.length;
    const total = results.length;
    
    if (fulfilledCount === total) {
      // 全部成功，抛出NAND_ERROR
      throw createLogicError('NAND_ERROR', fulfilledCount, total, results);
    } else {
      // 不是所有都成功，返回成功的值数组
      return fulfilled;
    }
  }
}