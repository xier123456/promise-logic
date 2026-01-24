import { OrGate } from '../gates/or';
import { AndGate } from '../gates/and';
import { MajorityGate } from '../gates/majority';
import { NandGate } from '../gates/nand';
import { NorGate } from '../gates/nor';
import { XnorGate } from '../gates/xnor';
import { XorGate } from '../gates/xor';

export class PromiseLogicError extends Error {
  constructor(
    public type: string,
    message: string,
    public results: PromiseSettledResult<unknown>[]
  ) {
    super(message);
    this.name = 'PromiseLogicError';
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

  // Core Logic Gates
  static and<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    return this.gates.and.execute(iterable);
  }

  static or<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T> {
    return this.gates.or.execute(iterable);
  }

  static xor<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T> {
    return this.gates.xor.execute(iterable);
  }

  static nand<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    return this.gates.nand.execute(iterable);
  }

  static nor<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    return this.gates.nor.execute(iterable);
  }

  static xnor<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    return this.gates.xnor.execute(iterable);
  }

  static majority<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    return this.gates.majority.execute(iterable);
  }

  // Extended Operations
  static allFulfilled(
    iterable: Iterable<PromiseLike<unknown>>
  ): Promise<unknown[]> {
    return Promise.allSettled(iterable).then((results) => {
      const fulfilled = results.filter(
        (result) => result.status === 'fulfilled'
      );
      return fulfilled.map((result) => result.value);
    });
  }

  static allRejected<T>(
    iterable: Iterable<T | PromiseLike<T>>
  ): Promise<unknown[]> {
    return Promise.allSettled(iterable).then((results) => {
      return results
        .filter(
          (result): result is PromiseRejectedResult =>
            result.status === 'rejected'
        )
        .map((result) => result.reason);
    });
  }

  // NOT logic - Inverts promise resolution
  static not<T>(promise: PromiseLike<T>): Promise<unknown> {
    return Promise.resolve(promise).then(
      (value) => Promise.reject(value),
      (reason) => Promise.resolve(reason)
    );
  }

  // Utility Methods
  static race<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T> {
    return Promise.race(iterable);
  }

  static allSettled<T>(
    iterable: Iterable<T | PromiseLike<T>>
  ): Promise<PromiseSettledResult<T>[]> {
    return Promise.allSettled(iterable);
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
