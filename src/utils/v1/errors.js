export class PromiseLogicError extends Error {
  constructor(type, message, results) {
    super(message);
    this.name = 'PromiseLogicError';
    this.type = type; // 'XOR_ERROR', 'NAND_ERROR', etc.
    this.results = results; // settlement results of all Promises
  }
}

// Error factory function
export function createLogicError(type, fulfilledCount, total, results) {
  const messages = {
    XOR_ERROR: `XOR condition failed: expected exactly 1 promise to fulfill, but ${fulfilledCount} fulfilled.`,
    NAND_ERROR: `NAND condition failed: all ${total} promises fulfilled (expected at least one rejection).`,
    NOT_ERROR: `NOT condition failed: promise resolved (expected rejection).`,
    NOR_ERROR: `NOR condition failed: ${fulfilledCount} promises fulfilled (expected all rejected).`,
    MAJORITY_ERROR: `Majority condition failed: ${fulfilledCount}/${total} fulfilled (need majority).`,
    ALL_SUCCESSFUL_ERROR: `All successful condition failed: ${fulfilledCount}/${total} promises fulfilled (expected all to succeed).`,
    ALL_FAILED_ERROR: `All failed condition failed: ${total - fulfilledCount}/${total} promises rejected (expected all to fail).`
  };
  
  return new PromiseLogicError(type, messages[type] || 'Logic condition failed', results);
}