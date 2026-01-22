export interface CreatePromiseLogicOptions {
  prefix?: string;
  suffix?: string;
  rename?: Record<string, string>;
}

export function createPromiseLogic(options?: CreatePromiseLogicOptions): {
  [key: string]: <T>(iterable: Iterable<T | PromiseLike<T>>) => Promise<T[]>;
};