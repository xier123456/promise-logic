import { BaseGate } from './BaseGate.js';

export class allRejected extends BaseGate {
  async execute(iterable, options = {}) {
    return new Promise((resolve) => {
      const results = [];
      let completedCount = 0;
      let rejectCount = 0;
      const promises = [...iterable];
      const total = promises?.length ?? 0;

      if (total === 0) {
        resolve(results);
        return;
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(() => {
            results[index] = undefined;
          })
          .catch((reason) => {
            rejectCount++;
            results[index] = reason;
          })
          .finally(() => {
            completedCount++;
            if (rejectCount > 0) {
              resolve(results.filter((item) => item !== undefined));
            } else if (completedCount === total) {
              resolve([]);
            }
          });
      });
    });
  }
}
