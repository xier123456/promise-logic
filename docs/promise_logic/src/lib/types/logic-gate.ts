export type LogicGateType = 
  | 'AND' 
  | 'OR' 
  | 'XOR' 
  | 'NAND' 
  | 'NOR' 
  | 'XNOR' 
  | 'MAJORITY'
  

export type ExtendedLogicGateType =
|'AllFulfilled'
|'AllRejected'
|'AllSelttled'

export type utilityLogicGateType =
|'not'
|'race'

export interface visualizerProps {
  type: LogicGateType | ExtendedLogicGateType | utilityLogicGateType
  inputs: boolean[]
  output: boolean
  isProcessing?: boolean
  onInputToggle?: (index: number) => void
  interactive?: boolean
  size?: 'sm' | 'md' | 'lg'
}