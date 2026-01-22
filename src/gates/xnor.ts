import { createLogicError } from '../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class XnorGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterResults(results, 'fulfilled');
    const fulfilledCount = fulfilled.length;
    const total = results.length;
    
    if (fulfilledCount === 0 || fulfilledCount === total) {
      // 全部成功或全部失败，返回成功的值数组
      return fulfilled;
    } else {
      // 部分成功部分失败，抛出XNOR_ERROR
      throw createLogicError('XNOR_ERROR', fulfilledCount, total, results);
    }
  }
}