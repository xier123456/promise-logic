export class PromiseLogicError extends Error {
  constructor(
    public type: string,
    message: string,
    public results: PromiseSettledResult<unknown>[]
  ) {
    super(message);
    this.name = 'PromiseLogicError';
  }
}

// Error factory function
//type:用于指定错误类型，如XOR_ERROR、NAND_ERROR等
//fulfilledCount:已完成的Promise数量
//total:总Promise数量
//results:PromiseSettledResult数组，包含所有Promise的状态和值/原因
export function createLogicError(
  type: string,
  fulfilledCount: number,
  total: number,
  results: PromiseSettledResult<string | number | Error | unknown>[],
  rejected?: unknown[]
): PromiseLogicError {
  const messages = {
    XOR_ERROR: `XOR condition failed: expected exactly 1 promise to fulfill, but ${fulfilledCount} fulfilled.`,
    NAND_ERROR: `NAND condition failed: all ${total} promises fulfilled (expected at least one rejection).`,
    NOR_ERROR: `NOR condition failed: ${fulfilledCount} promises fulfilled (expected all rejected).`,
    XNOR_ERROR: `XNOR condition failed: ${fulfilledCount}/${total} promises fulfilled (expected all or none).`,
    MAJORITY_ERROR: `Majority condition failed: ${fulfilledCount}/${total} fulfilled (need majority).`,
    ALL_SUCCESSFUL_ERROR: `All successful condition failed: ${fulfilledCount}/${total} promises fulfilled (expected all to succeed).`,
    ALL_FAILED_ERROR: `All failed condition failed: ${total - fulfilledCount}/${total} promises rejected (expected all to fail).`
  };

  const baseMessage =
    messages[type as keyof typeof messages] || 'Logic condition failed';
  const errorDetails =
    rejected && rejected?.length > 0
      ? `\n失败原因：${rejected.map((err, index) => `[${index + 1}] ${err}`).join('\n')}`
      : '';

  return new PromiseLogicError(type, baseMessage + errorDetails, results);
}
