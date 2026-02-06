export class PromiseWithTimer<T> {
  maxTimer(ms: number): Promise<T>;
  then<U>(onfulfilled?: ((value: T) => U | PromiseLike<U>) | null, onrejected?: ((reason: Error) => U | PromiseLike<U>) | null): PromiseWithTimer<U>;
  catch<U>(onrejected?: ((reason: Error) => U | PromiseLike<U>) | null): PromiseWithTimer<U>;
  finally(onfinally?: (() => void) | null): PromiseWithTimer<T>;
  toPromise(): Promise<T>;
}

export class PromiseLogicError extends Error {
  type: 'XOR_ERROR' | 'NAND_ERROR' | 'NOR_ERROR' | 'XNOR_ERROR' | 'MAJORITY_ERROR' | 'ALL_SUCCESSFUL_ERROR' | 'ALL_FAILED_ERROR';
  results: PromiseSettledResult<unknown>[];
  constructor(type: string, message: string, results: PromiseSettledResult<unknown>[]);
}

export interface FlipFlop {
  getState(): boolean;
  toggle(): Promise<boolean>;
  setState(state: boolean): Promise<boolean>;
}

export class PromiseLogic {
  static and<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>;
  static or<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T>;
  static race<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T>;
  static not<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>;
  static allSettled<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<PromiseSettledResult<T>[]>;
  
  static xor<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T>;
  static nand<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>;
  static nor<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>;
  static xnor<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>;
  static majority<T>(iterable: Iterable<T | PromiseLike<T>>, options?: { max: number }): PromiseWithTimer<T[]>;
  
  static allFulfilled<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>;
  static allRejected<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<unknown[]>;
  
  static createFlipFlop(initialState?: boolean): FlipFlop;
}

export interface CreatePromiseLogicOptions {
  prefix?: string;
  suffix?: string;
  rename?: Record<string, string>;
}

export function createPromiseLogic(options?: CreatePromiseLogicOptions): {
  [key: string]: <T>(iterable: Iterable<T | PromiseLike<T>>) => Promise<T[]>;
};

export function createLogicError(type: string, fulfilledCount: number, total: number, results: PromiseSettledResult<unknown>[]): PromiseLogicError;