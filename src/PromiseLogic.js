import { createLogicError } from './utils/errors.js';

export class PromiseLogic {
  static and(iterable) {
    return Promise.all(iterable);
  }

  static or(iterable) {
    return Promise.any(iterable);
  }

  static race(iterable) {
    return Promise.race(iterable);
  }

  static allSettled(iterable) {
    return Promise.allSettled(iterable);
  }

  static xor(iterable) {
    return Promise.allSettled(iterable).then((results) => {
      const fulfilled = results.filter(result => result.status === 'fulfilled');
      const fulfilledCount = fulfilled.length;
      const total = results.length;
      
      if (fulfilledCount === 1) {
        // 恰好一个成功，返回成功的值
        return fulfilled[0].value;
      } else {
        // 0个或多个（>1）成功，抛出XOR_ERROR
        throw createLogicError('XOR_ERROR', fulfilledCount, total, results);
      }
    });
  }

  static nand(iterable) {
    return Promise.allSettled(iterable).then((results) => {
      const fulfilled = results.filter(result => result.status === 'fulfilled');
      const fulfilledCount = fulfilled.length;
      const total = results.length;
      
      if (fulfilledCount === total) {
        // 全部成功，抛出NAND_ERROR
        throw createLogicError('NAND_ERROR', fulfilledCount, total, results);
      } else {
        // 不是所有都成功，返回成功的值数组
        return fulfilled.map(result => result.value);
      }
    });
  }

  static nor(iterable) {
    return Promise.allSettled(iterable).then((results) => {
      const fulfilled = results.filter(result => result.status === 'fulfilled');
      const fulfilledCount = fulfilled.length;
      const total = results.length;
      
      if (fulfilledCount === 0) {
        // 全部失败，返回空数组表示成功
        return [];
      } else {
        // 任意成功，抛出NOR_ERROR
        throw createLogicError('NOR_ERROR', fulfilledCount, total, results);
      }
    });
  }

  static xnor(iterable) {
    return Promise.allSettled(iterable).then((results) => {
      const fulfilled = results.filter(result => result.status === 'fulfilled');
      const fulfilledCount = fulfilled.length;
      const total = results.length;
      
      if (fulfilledCount === 0 || fulfilledCount === total) {
        // 全部成功或全部失败，返回成功的值数组
        return fulfilled.map(result => result.value);
      } else {
        // 部分成功部分失败，抛出XNOR_ERROR
        throw createLogicError('XNOR_ERROR', fulfilledCount, total, results);
      }
    });
  }

  static majority(iterable) {
    return Promise.allSettled(iterable).then((results) => {
      const fulfilled = results.filter(result => result.status === 'fulfilled');
      const fulfilledCount = fulfilled.length;
      const total = results.length;
      
      // 多数逻辑：成功数 > 失败数
      if (fulfilledCount > total - fulfilledCount) {
        // 超过半数成功，返回成功的值数组
        return fulfilled.map(result => result.value);
      } else {
        // 未达到多数，抛出MAJORITY_ERROR
        throw createLogicError('MAJORITY_ERROR', fulfilledCount, total, results);
      }
    });
  }

  // 返回所有成功的Promise结果
  static allFulfilled(iterable) {
    return Promise.allSettled(iterable).then((results) => {
      const fulfilled = results.filter(result => result.status === 'fulfilled');
      return fulfilled.map(result => result.value);
    });
  }

  // 返回所有失败的Promise结果
  static allRejected(iterable) {
    return Promise.allSettled(iterable).then((results) => {
      const rejected = results.filter(result => result.status === 'rejected');
      return rejected.map(result => result.reason);
    });
  }
  static createFlipFlop(initialState = false) {
    let state = initialState;
    let resolveCurrent = null;
    let currentPromise = Promise.resolve(state);
    
    return {
      // 获取当前状态
      getState() {
        return state;
      },
      
      // 异步设置状态
      set(newState) {
        state = newState;
        if (resolveCurrent) {
          resolveCurrent(state);
          resolveCurrent = null;
        }
        currentPromise = Promise.resolve(state);
        return this;
      },
      
      // 切换状态
      toggle() {
        return this.set(!state);
      },
      
      // 等待状态变化
      waitForChange() {
        if (!resolveCurrent) {
          currentPromise = new Promise((resolve) => {
            resolveCurrent = resolve;
          });
        }
        return currentPromise;
      },
      
      // 等待特定状态
      waitFor(targetState) {
        if (state === targetState) {
          return Promise.resolve(state);
        }
        return new Promise((resolve) => {
          const checkState = () => {
            if (state === targetState) {
              resolve(state);
            } else {
              this.waitForChange().then(checkState);
            }
          };
          checkState();
        });
      }
    };
  }
}