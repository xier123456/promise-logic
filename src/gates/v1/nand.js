import { createLogicError } from '../../utils/v1/errors.js';
import { BaseGate } from './BaseGate.js';

export class NandGate extends BaseGate {
  async execute(iterable, options = {}) {
    const results = await Promise.allSettled(iterable);
    const fulfilled = this.filterFulfilledResults(results);
    const fulfilledCount = fulfilled.length;
    const total = results.length;

    if (fulfilledCount === total) {
      throw createLogicError('NAND_ERROR', fulfilledCount, total, results, fulfilled);
    } else {
      return fulfilled;
    }
  }
}
