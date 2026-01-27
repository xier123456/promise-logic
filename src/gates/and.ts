import { PromiseLogicError } from '../utils/v2/errors';
import { BaseGate } from './BaseGate';

export class AndGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    try {
      return Promise.all(iterable)  

      
    } catch (error) {
      throw new PromiseLogicError('AND_ERROR', 'AND gate failed', [error as PromiseSettledResult<Error>])
      
    }
  }
}