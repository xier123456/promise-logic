import { LogicGateType } from '../types/logic-gate'

export const LOGIC_GATES: LogicGateType[] = [
  'AND', 
  'OR', 
  'XOR', 
  'NAND', 
  'NOR', 
  'XNOR', 
  'MAJORITY'
]

export const LOGIC_GATE_TRUTH_TABLE = {
  AND: (inputs: boolean[]) => inputs.every(Boolean),
  OR: (inputs: boolean[]) => inputs.some(Boolean),
  XOR: (inputs: boolean[]) => inputs.filter(Boolean).length === 1,
  NAND: (inputs: boolean[]) => !inputs.every(Boolean),
  NOR: (inputs: boolean[]) => !inputs.some(Boolean),
  XNOR: (inputs: boolean[]) => inputs.every(Boolean) || !inputs.some(Boolean),
  MAJORITY: (inputs: boolean[]) => {
    const trueCount = inputs.filter(Boolean).length
    return trueCount > inputs.length / 2
  }
}