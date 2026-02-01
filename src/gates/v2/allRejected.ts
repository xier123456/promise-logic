import { BaseGate } from "./BaseGate";

export class allRejected extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>, options = {}): Promise<T[]> {
    return new Promise((resolve) => {
      const results: (T | undefined)[] = [];
      let completedCount = 0;
      const promises=[...iterable];
      const total = promises?.length ?? 0;

      if (total === 0) {
        resolve(results as T[]);
        return;
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(() => {
            results[index] = undefined;
          })
          .catch((reason) => {
            completedCount++;
            results[index] = reason;
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
