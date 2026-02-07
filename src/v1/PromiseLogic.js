import { AndGate } from '../gates/v1/and.js';
import { OrGate } from '../gates/v1/or.js';
import { XorGate } from '../gates/v1/xor.js';
import { NandGate } from '../gates/v1/nand.js';
import { NorGate } from '../gates/v1/nor.js';
import { XnorGate } from '../gates/v1/xnor.js';
import { MajorityGate } from '../gates/v1/majority.js';
import { allFulfilled } from '../gates/v1/allFulfilled.js';
import { allRejected } from '../gates/v1/allRejected.js';

export class PromiseWithTimer {
  constructor(promise) {
    this.promise = promise;
  }

  maxTimer(ms, errorMessage = `Promise timed out after ${ms}ms`) {
    let timerId;
    const promiseTime = Promise.race([
      this.promise,
      new Promise((_, reject) => {
        timerId = setTimeout(() => {
          reject(new Error(errorMessage));
        }, ms);
      })
    ])
    return promiseTime.finally(() => clearTimeout(timerId))
  }

  then(onfulfilled, onrejected) {
    return new PromiseWithTimer(this.promise.then(onfulfilled, onrejected));
  }

  catch(onrejected) {
    return new PromiseWithTimer(this.promise.catch(onrejected));
  }

  finally(onfinally) {
    return new PromiseWithTimer(this.promise.finally(onfinally));
  }

  toPromise() {
    return this.promise;
  }
}

export class PromiseLogic {
  static get gates() {
    return {
      and: new AndGate(),
      or: new OrGate(),
      xor: new XorGate(),
      nand: new NandGate(),
      nor: new NorGate(),
      xnor: new XnorGate(),
      majority: new MajorityGate(),
      allFulfilled: new allFulfilled(),
      allRejected: new allRejected(),
    };
  }

  static and(iterable) {
    return new PromiseWithTimer(this.gates.and.execute(iterable));
  }

  static or(iterable) {
    return new PromiseWithTimer(this.gates.or.execute(iterable));
  }

  static not(promise) {
    return new PromiseWithTimer(
      Promise.resolve(promise).then(
        (value) => Promise.reject(new Error(`NOT: ${value}`)),
        (reason) => Promise.resolve(reason)
      )
    );
  }

  static race(iterable) {
    return new PromiseWithTimer(
      Promise.race(iterable).then((value) => Promise.resolve(value))
    );
  }

  static allSettled(iterable) {
    return new PromiseWithTimer(Promise.allSettled(iterable));
  }

  static xor(iterable) {
    return new PromiseWithTimer(this.gates.xor.execute(iterable));
  }

  static nand(iterable) {
    return new PromiseWithTimer(this.gates.nand.execute(iterable));
  }

  static nor(iterable) {
    return new PromiseWithTimer(this.gates.nor.execute(iterable));
  }

  static xnor(iterable) {
    return new PromiseWithTimer(this.gates.xnor.execute(iterable));
  }

  static majority(iterable, options = { max: 0.5 }) {
    return new PromiseWithTimer(this.gates.majority.execute(iterable, options));
  }

  static allFulfilled(iterable) {
    return new PromiseWithTimer(this.gates.allFulfilled.execute(iterable));
  }

  static allRejected(iterable) {
    return new PromiseWithTimer(this.gates.allRejected.execute(iterable));
  }

  static createFlipFlop(initialState = false) {
    let state = initialState;
    let resolveCurrent = null;
    let currentPromise = Promise.resolve(state);

    return {
      getState() {
        return state;
      },

      set(newState) {
        state = newState;
        if (resolveCurrent) {
          resolveCurrent(state);
          resolveCurrent = null;
        }
        currentPromise = Promise.resolve(state);
        return this;
      },

      toggle() {
        return this.set(!state);
      },

      waitForChange() {
        if (!resolveCurrent) {
          currentPromise = new Promise((resolve) => {
            resolveCurrent = resolve;
          });
        }
        return currentPromise;
      },

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
