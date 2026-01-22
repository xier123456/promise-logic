import { createLogicError } from '../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class NorGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterResults(results, 'fulfilled');
    const fulfilledCount = fulfilled.length;
    const total = results.length;
    
    if (fulfilledCount === 0) {
      // 全部失败，返回空数组表示成功
      return [];
    } else {
      // 任意成功，抛出NOR_ERROR
      throw createLogicError('NOR_ERROR', fulfilledCount, total, results);
    }
  }
}