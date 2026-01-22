// v2版本类型定义 (TypeScript版本 - 现代化设计)

/**
 * Promise逻辑错误类
 * @deprecated 在v2版本中建议使用更具体的错误类型
 */
export class PromiseLogicError extends Error {
  readonly type: 'XOR_ERROR' | 'NAND_ERROR' | 'NOR_ERROR' | 'XNOR_ERROR' | 'MAJORITY_ERROR' | 'ALL_SUCCESSFUL_ERROR' | 'ALL_FAILED_ERROR';
  readonly results: PromiseSettledResult<unknown>[];
  
  constructor(type: string, message: string, results: PromiseSettledResult<unknown>[]);
}

/**
 * 触发器接口 - 用于状态管理
 */
export interface FlipFlop {
  /** 获取当前状态 */
  getState(): boolean;
  
  /** 设置新状态 */
  set(newState: boolean): Promise<boolean>;
  
  /** 切换状态 */
  toggle(): Promise<boolean>;
  
  /** 等待状态变化 */
  waitForChange(): Promise<boolean>;
  
  /** 等待特定状态 */
  waitFor(targetState: boolean): Promise<boolean>;
}

/**
 * Promise逻辑门主类
 */
export class PromiseLogic {
  // 基础逻辑门
  static and<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static or<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T>;
  static race<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T>;
  static allSettled<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<PromiseSettledResult<T>[]>;
  
  // 扩展逻辑门
  static xor<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T>;
  static nand<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static nor<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static xnor<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  static majority<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]>;
  
  // 实用方法
  static allFulfilled(iterable: Iterable<PromiseLike<unknown>>): Promise<unknown[]>;
  static allRejected<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<unknown[]>;
  
  // 状态管理
  static createFlipFlop(initialState?: boolean): FlipFlop;
  
}

/**
 * 工厂函数配置选项
 */
export interface CreatePromiseLogicOptions {
  prefix?: string;
  suffix?: string;
  rename?: Record<string, string>;
  
  // v2新增选项
  enableStrictMode?: boolean;
  timeout?: number;
}

/**
 * 创建自定义Promise逻辑函数
 */
export function createPromiseLogic(options?: CreatePromiseLogicOptions): Record<string, Function>;

/**
 * 创建逻辑错误
 * @deprecated 在v2版本中建议使用更具体的错误构造器
 */
export function createLogicError(type: string, fulfilledCount: number, total: number, results: PromiseSettledResult<unknown>[]): PromiseLogicError;