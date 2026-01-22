export interface CreatePromiseLogicOptions {
  prefix?: string;
  suffix?: string;
  rename?: Record<string, string>;
}

export function createPromiseLogic(options?: CreatePromiseLogicOptions): Record<string, Function>;