import { BaseGate } from './BaseGate.js';

export class allFulfilled extends BaseGate {
  async execute(iterable, options = {}) {
    return new Promise((resolve) => {
      const results = [];
      let completedCount = 0;
      let fulfillCount = 0;
      const promises = [...iterable];
      const total = promises?.length ?? 0

      if (total === 0) {
        resolve(results);
        return;
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((value) => {
            fulfillCount++;
            results[index] = value;
          })
          .catch(() => {
            results[index] = undefined;
          })
          .finally(() => {
            completedCount++;
            if (fulfillCount > 0) {
              resolve(results.filter((item) => item !== undefined));
            } else if (completedCount === total) {
              resolve([]);
            }
          });
      });
    });
  }
}

