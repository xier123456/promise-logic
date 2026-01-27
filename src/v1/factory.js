import { PromiseLogic } from './PromiseLogic.js';

export function createPromiseLogic(options = {}) {
  const { prefix = '', suffix = '', rename = {} } = options;
  
  // 基础方法映射
  const methods = {
    and: PromiseLogic.and.bind(PromiseLogic),
    or: PromiseLogic.or.bind(PromiseLogic),
    race: PromiseLogic.race.bind(PromiseLogic),
    allSettled: PromiseLogic.allSettled.bind(PromiseLogic),
    xor: PromiseLogic.xor.bind(PromiseLogic),
    not: PromiseLogic.not.bind(PromiseLogic),
    nand: PromiseLogic.nand.bind(PromiseLogic),
    nor: PromiseLogic.nor.bind(PromiseLogic),
    xnor: PromiseLogic.xnor.bind(PromiseLogic),
    majority: PromiseLogic.majority.bind(PromiseLogic),
    allFulfilled: PromiseLogic.allFulfilled.bind(PromiseLogic),
    allRejected: PromiseLogic.allRejected.bind(PromiseLogic)
  };
  
  // 应用命名转换
  const result = {};
  Object.entries(methods).forEach(([key, fn]) => {
    // 优先使用rename映射，然后应用prefix和suffix
    const baseName = rename[key] || key;
    const finalName = `${prefix}${baseName}${suffix}`;
    result[finalName] = fn;
  });
  
  return result;
}