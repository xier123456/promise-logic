import { BaseGate } from './BaseGate';

export class OrGate extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T> {
    return Promise.any(iterable);
  }
}