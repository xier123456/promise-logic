export interface LogicGateResult {
  success: boolean
  data: unknown
}

export interface ExtendedLogicGateResult {
  success: boolean
  data: unknown[]
}

export type LogicGateHandler = (inputs: boolean[]) => Promise<LogicGateResult>

export type ExtendedLogicGateHandler = (inputs: boolean[]) => Promise<ExtendedLogicGateResult>

export type NotLogicGateHandler = (input: boolean) => Promise<LogicGateResult>
