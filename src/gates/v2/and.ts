import { createLogicError, PromiseLogicError } from '../../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class AndGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    try {
      return Promise.all(iterable)  

      
    } catch (error) {
      throw createLogicError('AND_ERROR', 0, 0, [], [error as PromiseSettledResult<Error>]);
      
    }
  }
}