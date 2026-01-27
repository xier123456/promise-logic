// TypeScript version entry point
export { PromiseLogic, PromiseWithTimer } from './PromiseLogic';
export { createPromiseLogic } from './factory';
export { PromiseLogicError } from '../utils/v2/errors';

// Re-export types for better TypeScript support
export type { FlipFlop } from './PromiseLogic';

export type { CreatePromiseLogicOptions } from './factory';