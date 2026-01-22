import { PromiseLogic } from './PromiseLogic';

export interface CreatePromiseLogicOptions {
  prefix?: string;
  suffix?: string;
  rename?: Record<string, string>;
}

export function createPromiseLogic(options: CreatePromiseLogicOptions = {}): Record<string, Function> {
  const { prefix = '', suffix = '', rename = {} } = options;
  
  // 基础方法映射
  const methods = {
    and: PromiseLogic.and,
    or: PromiseLogic.or,
    not: PromiseLogic.not,
    race: PromiseLogic.race,
    allSettled: PromiseLogic.allSettled,
    xor: PromiseLogic.xor,
    nand: PromiseLogic.nand,
    nor: PromiseLogic.nor,
    xnor: PromiseLogic.xnor,
    majority: PromiseLogic.majority,
    allFulfilled: PromiseLogic.allFulfilled,
    allRejected: PromiseLogic.allRejected
  };
  
  // 应用命名转换
  const result: Record<string, Function> = {};
  Object.entries(methods).forEach(([key, fn]) => {
    // 优先使用rename映射，然后应用prefix和suffix
    const baseName = rename[key] || key;
    const finalName = `${prefix}${baseName}${suffix}`;
    result[finalName] = fn;
  });
  
  return result;
}