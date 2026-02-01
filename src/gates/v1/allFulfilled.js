import { BaseGate } from './BaseGate.js';

export class allFulfilled extends BaseGate {
  async execute(iterable, options = {}) {
    return new Promise((resolve) => {
      const results = [];
      let completedCount = 0;
      const total = [...iterable]?.length ?? 0

      if (total === 0) {
        resolve(results);
        return;
      }

      iterable.forEach((promise, index) => {
        promise
          .then((value) => {
            completedCount++;
            results[index] = value;
          })
          .catch(() => {
            results[index] = undefined;
          })
          .finally(() => {
            if (completedCount >0) {
              resolve(results.filter((item) => item !== undefined));
            }
          });
      });
    });
  }
}

