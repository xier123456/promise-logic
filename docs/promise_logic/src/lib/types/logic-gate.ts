export type LogicGateType = 
  | 'AND' 
  | 'OR' 
  | 'XOR' 
  | 'NAND' 
  | 'NOR' 
  | 'XNOR' 
  | 'MAJORITY'

export interface LogicGateVisualizerProps {
  type: LogicGateType
  inputs: boolean[]
  output: boolean
  isProcessing?: boolean
  onInputToggle?: (index: number) => void
  interactive?: boolean
  size?: 'sm' | 'md' | 'lg'
}