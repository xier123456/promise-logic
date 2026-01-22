export abstract class BaseGate {
  abstract execute<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T | T[]>;
  
  protected filterResults<T>(
    results: PromiseSettledResult<T>[],
    status: 'fulfilled' | 'rejected'
  ): (T)[] {
    if (status === 'fulfilled') {
      return results
        .filter((result): result is PromiseFulfilledResult<T> => result.status === 'fulfilled')
        .map(result => result.value);
    } else {
      return results
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .map(result => result.reason);
    }
  }
  
  protected countFulfilled<T>(results: PromiseSettledResult<T>[]): number {
    return results.filter(result => result.status === 'fulfilled').length;
  }
}