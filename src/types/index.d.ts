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
  static and<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static or<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static race<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T>;
  static allSettled<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<PromiseSettledResult<T>[]>;
  
  static xor<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static nand<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static nor<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static xnor<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static majority<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  
  // 返回所有成功或失败结果的方法
  static allFulfilled<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static allRejected<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<any[]>;
  
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