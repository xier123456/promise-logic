import { OrGate } from '../gates/or';
import { AndGate } from '../gates/and';
import { MajorityGate } from '../gates/majority';
import { NandGate } from '../gates/nand';
import { NorGate } from '../gates/nor';
import { XnorGate } from '../gates/xnor';
import { XorGate } from '../gates/xor';

// 包装定时器
export class PromiseWithTimer<T> {
  private promise: Promise<T>;

  constructor(promise: Promise<T>) {
    this.promise = promise;
  }

  // 添加超时功能
  maxTimer(ms: number): Promise<T> {
    let timerId: NodeJS.Timeout;
   const promiseTime = Promise.race([
      this.promise,
      new Promise<never>((_, reject) => {
       timerId = setTimeout(() => {
           reject(new Error(`Promise timed out after ${ms}ms,${this.promise}`));
        }, ms);
 
      })
    ]);
    return promiseTime.finally(() => clearTimeout(timerId));
  }

  // 实现 then 方法
  then<U>(
    onfulfilled?: ((value: T) => U | PromiseLike<U>) | null,
    onrejected?: ((reason: Error) => U | PromiseLike<U>) | null
  ): PromiseWithTimer<U> {
    return new PromiseWithTimer(this.promise.then(onfulfilled, onrejected));
  }

  // 实现 catch 方法
  catch<U>(
    onrejected?: ((reason: Error) => U | PromiseLike<U>) | null
  ): PromiseWithTimer<U> {
    return new PromiseWithTimer(this.promise.catch(onrejected) as Promise<U>);
  }

  // 实现 finally 方法
  finally(
    onfinally?: (() => void) | null
  ): PromiseWithTimer<T> {
    return new PromiseWithTimer(this.promise.finally(onfinally));
  }

  // 转换为普通 Promise
  toPromise(): Promise<T> {
    return this.promise;
  }
}

export interface FlipFlop {
  getState(): boolean;
  set(newState: boolean): Promise<boolean>;
  toggle(): Promise<boolean>;
  waitForChange(): Promise<boolean>;
  waitFor(targetState: boolean): Promise<boolean>;
}

export class PromiseLogic {
  private static get gates() {
    return {
      and: new AndGate(),
      or: new OrGate(),
      xor: new XorGate(),
      nand: new NandGate(),
      nor: new NorGate(),
      xnor: new XnorGate(),
      majority: new MajorityGate()
    };
  }

  static and<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]> {
    return new PromiseWithTimer(this.gates.and.execute(iterable));
  }

  static or<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T> {
    return new PromiseWithTimer(this.gates.or.execute(iterable));
  }

  static xor<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T> {
    return new PromiseWithTimer(this.gates.xor.execute(iterable));
  }

  static nand<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]> {
    return new PromiseWithTimer(this.gates.nand.execute(iterable));
  }

  static nor<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]> {
    return new PromiseWithTimer(this.gates.nor.execute(iterable));
  }

  static xnor<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]> {
    return new PromiseWithTimer(this.gates.xnor.execute(iterable));
  }

  static majority<T>(iterable: Iterable<T | PromiseLike<T>>, options: { max: number } = { max: 0.5 }): PromiseWithTimer<T[]> {
    return new PromiseWithTimer(this.gates.majority.execute(iterable, options));
  }

  // Extended Operations
  static allFulfilled(
    iterable: Iterable<PromiseLike<unknown>>
  ): PromiseWithTimer<unknown[]> {
    return new PromiseWithTimer(Promise.allSettled(iterable).then((results) => {
      const fulfilled = results.filter(
        (result) => result.status === 'fulfilled'
      );
      return fulfilled.map((result) => result.value);
    }));
  }

  static allRejected<T>(
    iterable: Iterable<T | PromiseLike<T>>
  ): PromiseWithTimer<unknown[]> {
    return new PromiseWithTimer(Promise.allSettled(iterable).then((results) => {
      return results
        .filter(
          (result): result is PromiseRejectedResult =>
            result.status === 'rejected'
        )
        .map((result) => result.reason);
    }));
  }

  // NOT logic - Inverts promise resolution
  static not<T>(promise: PromiseLike<T>): PromiseWithTimer<unknown> {
    return new PromiseWithTimer(Promise.resolve(promise).then(
      (value) => Promise.reject(value),
      (reason) => Promise.resolve(reason)
    ));
  }

  // Utility Methods
  static race<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T> {
    return new PromiseWithTimer(Promise.race(iterable));
  }

  static allSettled<T>(
    iterable: Iterable<T | PromiseLike<T>>
  ): PromiseWithTimer<PromiseSettledResult<T>[]> {
    return new PromiseWithTimer(Promise.allSettled(iterable));
  }

  static createFlipFlop(initialState: boolean = false): FlipFlop {
    let state = initialState;
    let resolveCurrent: ((value: boolean) => void) | null = null;
    let currentPromise = Promise.resolve(state);

    const waitForChange = () => {
      if (!resolveCurrent) {
        currentPromise = new Promise((resolve) => {
          resolveCurrent = resolve;
        });
      }
      return currentPromise;
    };

    return {
      getState(): boolean {
        return state;
      },

      async set(newState: boolean): Promise<boolean> {
        state = newState;
        if (resolveCurrent) {
          resolveCurrent(state);
          resolveCurrent = null;
        }
        currentPromise = Promise.resolve(state);
        return state;
      },

      async toggle(): Promise<boolean> {
        return this.set(!state);
      },

      waitForChange,

      waitFor(targetState: boolean): Promise<boolean> {
        if (state === targetState) {
          return Promise.resolve(state);
        }
        return new Promise((resolve) => {
          const checkState = () => {
            if (state === targetState) {
              resolve(state);
            } else {
              waitForChange().then(checkState);
            }
          };
          checkState();
        });
      }
    };
  }
}
