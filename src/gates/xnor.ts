import { createLogicError } from '../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class XnorGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterFulfilledResults(results);
    const fulfilledCount = fulfilled.length;
    const total = results.length;
    
    if (fulfilledCount === 0 || fulfilledCount === total) {
      // 全部失败或全部成功，返回成功的值数组（如果有）
      return fulfilled;
    } else {
      // 部分成功，抛出XNOR_ERROR
      throw createLogicError('XNOR_ERROR', fulfilledCount, total, results);
    }
  }
}