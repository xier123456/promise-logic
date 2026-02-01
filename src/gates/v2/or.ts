import { createLogicError } from '../../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class OrGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T> {
    try {
    return Promise.any(iterable)
      
    } catch (error) {
      throw createLogicError('OR_ERROR', 0, 0, [], [error]);

    }
  }
}