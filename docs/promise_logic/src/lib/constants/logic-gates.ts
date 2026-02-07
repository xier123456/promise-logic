import { LogicGateType } from '../types/logic-gate'
import { LogicGateHandler, ExtendedLogicOperations, UtilityOperations } from '../types/logic-gates'
import { PromiseLogic } from 'promise-logic'

export const LOGIC_GATES: LogicGateType[] = [
  'AND', 
  'OR', 
  'XOR', 
  'NAND', 
  'NOR', 
  'XNOR', 
  'MAJORITY'
]

export const LOGIC_GATE_TRUTH_TABLE: Record<LogicGateType, LogicGateHandler> = {
  AND: async (inputs: boolean[]) => {
    const promises = inputs.map(input => input ? Promise.resolve(input) : Promise.reject(input))
    try {
      const result = await PromiseLogic.and(promises)
      return { success: true, data: result }
    } catch {
      return { success: false, data: null }
    }
  },
  OR: async (inputs: boolean[]) => {
    const promises = inputs.map(input => input ? Promise.resolve(input) : Promise.reject(input))
    try {
      const result = await PromiseLogic.or(promises)
      return { success: true, data: result }
    } catch {
      return { success: false, data: null }
    }
  },
  XOR: async (inputs: boolean[]) => {
    const promises = inputs.map(input => input ? Promise.resolve(input) : Promise.reject(input))
    try {
      const result = await PromiseLogic.xor(promises)
      return { success: true, data: result }
    } catch {
      return { success: false, data: null }
    }
  },
  NAND: async (inputs: boolean[]) => {
    const promises = inputs.map(input => input ? Promise.resolve(input) : Promise.reject(input))
    try {
      const result = await PromiseLogic.nand(promises)
      return { success: true, data: result }
    } catch {
      return { success: false, data: null }
    }
  },
  NOR: async (inputs: boolean[]) => {
    const promises = inputs.map(input => input ? Promise.resolve(input) : Promise.reject(input))
    try {
      const result = await PromiseLogic.nor(promises)
      return { success: true, data: result }
    } catch {
      return { success: false, data: null }
    }
  },
  XNOR: async (inputs: boolean[]) => {
    const promises = inputs.map(input => input ? Promise.resolve(input) : Promise.reject(input))
    try {
      const result = await PromiseLogic.xnor(promises)
      return { success: true, data: result }
    } catch {
      return { success: false, data: null }
    }
  },
  MAJORITY: async (inputs: boolean[]) => {
    const promises = inputs.map(input => input ? Promise.resolve(input) : Promise.reject(input))
    try {
      const result = await PromiseLogic.majority(promises)
      return { success: true, data: result }
    } catch {
      return { success: false, data: null }
    }
  }
}

export const EXTENDED_LOGIC_OPERATIONS: ExtendedLogicOperations = {
  allFulfilled: async (inputs: boolean[]) => {
    const promises = inputs.map((input, index) => 
      input ? Promise.resolve(`p${index + 1}`) : Promise.reject(`p${index + 1}`)
    )
    const result = await PromiseLogic.allFulfilled(promises) as string[]
    return { success: true, data: result }
  },
  allRejected: async (inputs: boolean[]) => {
    const promises = inputs.map((input, index) => 
      input ? Promise.resolve(`p${index + 1}`) : Promise.reject(`p${index + 1}`)
    )
    const result = await PromiseLogic.allRejected(promises) as string[]
    return { success: true, data: result }
  },
  allSettled: async (inputs: boolean[]) => {
    const promises = inputs.map((input, index) => 
      input ? Promise.resolve(`p${index + 1}`) : Promise.reject(`p${index + 1}`)
    )
    const result = await PromiseLogic.allSettled(promises) 
    return { success: true, data: result }
  }
}

export const UTILITY_OPERATIONS: UtilityOperations = {
  not: async (input: boolean) => {
    const promise = input ? Promise.resolve('p1') : Promise.reject('p1')
    try {
      const result = await PromiseLogic.not(promise)
      return { success: true, data: result }
    } catch {
      return { success: false, data: null }
    }
  },
  race: async (inputs: boolean[]) => {
    const promises = inputs.map((input, index) => 
      input ? Promise.resolve(`p${index + 1}`) : Promise.reject(`p${index + 1}`)
    )
    try {
      const result = await PromiseLogic.race(promises) as string
      return { success: true, data: result }
    } catch {
      return { success: false, data: null }
    }
  }
}