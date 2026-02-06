import { LogicGateType } from '../types/logic-gate'

export type NodeType = 'input' | 'output' | LogicGateType

export interface LogicNode {
  id: string
  type: NodeType
  position: { x: number; y: number }
  label: string
  inputCount?: number
  value?: boolean
  outputs: string[] // 连接到的节点ID列表
}

export interface Connection {
  id: string
  fromNode: string
  toNode: string
  toInputIndex: number
}

export interface LogicCircuit {
  nodes: LogicNode[]
  connections: Connection[]
}

export interface LogicCircuitState {
  nodeValues: Record<string, boolean>
  isProcessing: boolean
  error?: string
}
