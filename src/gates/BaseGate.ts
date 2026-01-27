
//全部函数的处理入口
export abstract class BaseGate {
  abstract execute<T>(iterable: Iterable<T | PromiseLike<T>>,options:{
    [key: string]: string | number |boolean
  }): Promise<T | T[]>;
  

  //函数：过滤出成功的结果
  protected filterFulfilledResults<T>(
    results: PromiseSettledResult<T>[]
  ): T[] {
    return results
      .filter((result): result is PromiseFulfilledResult<T> => result.status === 'fulfilled')
      .map(result => result.value);
  }
  
  //函数：过滤出失败的结果
  protected filterRejectedResults<T>(
    results: PromiseSettledResult<T>[]
  ): unknown[] {
    return results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map(result => result.reason);
  }
  

  //函数：统计成功的结果数量
  protected countFulfilled<T>(results: PromiseSettledResult<T>[]): number {
    return results.filter(result => result.status === 'fulfilled').length;
  }
}