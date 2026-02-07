export interface LogicGateResult {
  success: boolean
  data: string | string[] | null|unknown
}

export interface ExtendedLogicGateResult {
  success: boolean
  data: string[] | PromiseSettledResult<string>[]
}

export type LogicGateHandler = (inputs: boolean[]) => Promise<LogicGateResult>

export type ExtendedLogicGateHandler = (inputs: boolean[]) => Promise<ExtendedLogicGateResult>

export type NotLogicGateHandler = (input: boolean) => Promise<LogicGateResult>

export interface ExtendedLogicOperations {
  allFulfilled: ExtendedLogicGateHandler
  allRejected: ExtendedLogicGateHandler
  allSettled: ExtendedLogicGateHandler
}

export interface UtilityOperations {
  not: NotLogicGateHandler
  race: LogicGateHandler
}