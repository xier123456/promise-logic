import { createLogicError } from '../../utils/v1/errors.js';
import { BaseGate } from './BaseGate.js';

export class AndGate extends BaseGate {
  async execute(iterable, options = {}) {
    try {
      return await Promise.all(iterable);
    } catch (errorArr) {
      throw createLogicError('AND_ERROR', 0, iterable.length, [...iterable], errorArr);
    }
  }
}
