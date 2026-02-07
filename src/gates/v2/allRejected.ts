import { BaseGate } from "./BaseGate";

export class allRejected extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
    return new Promise((resolve) => {
      const results: (T | undefined)[] = [];
      let completedCount = 0;
      let rejectCount = 0;
      const promises=[...iterable];
      const total = promises?.length ?? 0;

      if (total === 0) {
        resolve(results as T[]);
        return;
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(() => {
            results[index] = undefined
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
