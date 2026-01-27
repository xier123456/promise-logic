import { createLogicError } from '../utils/v1/errors.js';

class PromiseWithTimer {
  constructor(promise) {
    this.promise = promise;
  }

  // 实现 maxTimer 方法
  maxTimer(ms) {
    let timerId;
    const promiseTime = Promise.race([
      this.promise,
      new Promise((_, reject) => {
        timerId = setTimeout(() => {
          reject(new Error(`Promise timed out after ${ms}ms`));
        }, ms);
      })
    ]);
    return promiseTime.finally(() => clearTimeout(timerId));
  }

  // 实现 then 方法
  then(onfulfilled, onrejected) {
    return new PromiseWithTimer(this.promise.then(onfulfilled, onrejected));
  }

  // 实现 catch 方法
  catch(onrejected) {
    return new PromiseWithTimer(this.promise.catch(onrejected));
  }

  // 实现 finally 方法
  finally(onfinally) {
    return new PromiseWithTimer(this.promise.finally(onfinally));
  }

  // 实现 toPromise 方法
  toPromise() {
    return this.promise;
  }
}

export class PromiseLogic {
  static and(iterable) {
    return new PromiseWithTimer(Promise.all(iterable));
  }

  static or(iterable) {
    return new PromiseWithTimer(Promise.any(iterable));
  }

  static not(promise) {
    return new PromiseWithTimer(
      Promise.resolve(promise)
        .then(
          (value) => Promise.reject(value),
          (reason) => Promise.resolve(reason)
        )
        .catch((error) => Promise.resolve(error))
    );
  }

  static race(iterable) {
    return new PromiseWithTimer(Promise.race(iterable));
  }

  static allSettled(iterable) {
    return new PromiseWithTimer(Promise.allSettled(iterable));
  }

  static xor(iterable) {
    return new PromiseWithTimer(
      Promise.allSettled(iterable).then((results) => {
        const fulfilled = results.filter(
          (result) => result.status === 'fulfilled'
        );
        const fulfilledCount = fulfilled.length;
        const total = results.length;

        if (fulfilledCount === 1) {
          // 恰好一个成功，返回成功的值
          return fulfilled[0].value;
        } else {
          // 0个或多个（>1）成功，抛出XOR_ERROR
          throw createLogicError('XOR_ERROR', fulfilledCount, total, results);
        }
      })
    );
  }

  static nand(iterable) {
    return new PromiseWithTimer(
      Promise.allSettled(iterable).then((results) => {
        const fulfilled = results.filter(
          (result) => result.status === 'fulfilled'
        );
        const fulfilledCount = fulfilled.length;
        const total = results.length;

        if (fulfilledCount === total) {
          // 全部成功，抛出NAND_ERROR
          throw createLogicError('NAND_ERROR', fulfilledCount, total, results);
        } else {
          // 不是所有都成功，返回成功的值数组
          return fulfilled.map((result) => result.value);
        }
      })
    );
  }

  static nor(iterable) {
    return new PromiseWithTimer(
      Promise.allSettled(iterable).then((results) => {
        const fulfilled = results.filter(
          (result) => result.status === 'fulfilled'
        );
        const fulfilledCount = fulfilled.length;
        const total = results.length;

        if (fulfilledCount === 0) {
          // 全部失败，返回空数组表示成功
          return [];
        } else {
          // 任意成功，抛出NOR_ERROR
          throw createLogicError('NOR_ERROR', fulfilledCount, total, results);
        }
      })
    );
  }

  static xnor(iterable) {
    return new PromiseWithTimer(
      Promise.allSettled(iterable).then((results) => {
        const fulfilled = results.filter(
          (result) => result.status === 'fulfilled'
        );
        const fulfilledCount = fulfilled.length;
        const total = results.length;

        if (fulfilledCount === 0 || fulfilledCount === total) {
          // 全部成功或全部失败，返回成功的值数组
          return fulfilled.map((result) => result.value);
        } else {
          // 部分成功部分失败，抛出XNOR_ERROR
          throw createLogicError('XNOR_ERROR', fulfilledCount, total, results);
        }
      })
    );
  }

  static majority(iterable, options = { max: 0.5 }) {
    return new PromiseWithTimer(
      Promise.allSettled(iterable).then((results) => {
        const fulfilled = results.filter(
          (result) => result.status === 'fulfilled'
        );
        const fulfilledCount = fulfilled.length;
        const total = results.length;

        //多数逻辑：成功数 > 失败数
        if (fulfilledCount > total * options.max) {
          // 超过半数成功，返回成功的值数组
          return fulfilled.map((result) => result.value);
        } else {
          // 未达到多数，抛出MAJORITY_ERROR
          throw createLogicError(
            'MAJORITY_ERROR',
            fulfilledCount,
            total,
            results
          );
        }
      })
    );
  }

  // 返回所有成功的Promise结果
  static allFulfilled(iterable) {
    return new PromiseWithTimer(
      Promise.allSettled(iterable).then((results) => {
        const fulfilled = results.filter(
          (result) => result.status === 'fulfilled'
        );
        return fulfilled.map((result) => result.value);
      })
    );
  }

  // 返回所有失败的Promise结果
  static allRejected(iterable) {
    return new PromiseWithTimer(
      Promise.allSettled(iterable).then((results) => {
        const rejected = results.filter(
          (result) => result.status === 'rejected'
        );
        return rejected.map((result) => result.reason);
      })
    );
  }

  //测试中...
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
