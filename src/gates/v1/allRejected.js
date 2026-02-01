import { BaseGate } from './BaseGate.js';

export class allRejected extends BaseGate {
  async execute(iterable, options = {}) {
    return new Promise((resolve) => {
      const results = [];
      let completedCount = 0;
      const total = [...iterable]?.length ?? 0;

      if (total === 0) {
        resolve(results);
        return;
      }

      iterable.forEach((promise, index) => {
        promise
          .then(() => {
            results[index] = undefined;
          })
          .catch((reason) => {
            completedCount++;
            results[index] = reason;
          })
          .finally(() => {
            if (completedCount > 0) {
              resolve(results.filter((item) => item !== undefined));
            }
          });
      });
    });
  }
}
