import { BaseGate } from "./BaseGate";

export class allFulfilled extends BaseGate {
  async execute<T>(iterable: Iterable<T | PromiseLike<T>>, options = {}): Promise<T[]> {
    return new Promise<T[]>((resolve) => {
      const results: (T | undefined)[] = [];
      let completedCount = 0;
      const promises = [...iterable];
      const total = promises?.length ?? 0;

      if (total === 0) {
        resolve(results as T[]);
        return;
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((value) => {
            completedCount++;
            results[index] = value;
          })
          .catch(() => {
            results[index] = undefined;
          })
          .finally(() => {
            if (completedCount > 0) {
              resolve(results.filter((item): item is T => item !== undefined));
            }
          });
      });
    });
  }
}
