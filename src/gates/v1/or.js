import { createLogicError } from '../../utils/v1/errors.js';
import { BaseGate } from './BaseGate.js';

export class OrGate extends BaseGate {
  async execute(iterable, options = {}) {
    try {
      return await Promise.any(iterable);
    } catch (errorArr) {
      throw createLogicError('OR_ERROR', 0, iterable.length, [], errorArr);
    }
  }
}
