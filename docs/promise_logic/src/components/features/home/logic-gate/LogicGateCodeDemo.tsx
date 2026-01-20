'use client'

import { LogicGateType } from '@/lib/types/logic-gate'
import { cn } from '@/lib/utils/dom'
import { CodeMarkdown } from '../../code/markdown/code_markdown'

interface LogicGateDemoData {
  gate: LogicGateType
  code: string
  inputs: boolean[]
  output: boolean
  description: string
}

// 硬编码的逻辑门演示数据数组
const LOGIC_GATE_DEMOS: LogicGateDemoData[] = [
  {
    gate: 'AND',
    code: `
    // AND gate - succeeds when all Promises succeed
const result = await PromiseLogic.and([
  Promise.resolve('Task 1'),
  Promise.resolve('Task 2'),
  Promise.resolve('Task 3')
])
console.log('All tasks completed:', result)`,
    inputs: [true, true, true],
    output: true,
    description: 'Output is true only when all inputs are true'
  },
  {
    gate: 'OR',
    code: `// OR gate - returns the first successful Promise
const result = await PromiseLogic.or([
  Promise.resolve('Task 1'),
  Promise.reject('Task 2'),
  Promise.resolve('Task 3')
])
console.log('First successful task:', result)`,
    inputs: [true, false, true],
    output: true,
    description: 'Output is true when at least one input is true'
  },
  {
    gate: 'XOR',
    code: `// XOR gate - succeeds when exactly one Promise succeeds
const result = await PromiseLogic.xor([
  Promise.resolve('Task 1'),
  Promise.reject('Task 2'),
  Promise.reject('Task 3')
])
console.log('Exactly one task succeeded:', result)`,
    inputs: [true, false, false],
    output: true,
    description: 'Output is true when exactly one input is true'
  },
  {
    gate: 'NAND',
    code: `// NAND gate - succeeds when not all Promises succeed
const result = await PromiseLogic.nand([
  Promise.resolve('Task 1'),
  Promise.resolve('Task 2'),
  Promise.reject('Task 3')
])
console.log('Not all tasks succeeded:', result)`,
    inputs: [true, true, false],
    output: true,
    description: 'Output is true when not all inputs are true'
  },
  {
    gate: 'NOR',
    code: `// NOR gate - succeeds when all Promises fail
const result = await PromiseLogic.nor([
  Promise.reject('Task 1'),
  Promise.reject('Task 2'),
  Promise.reject('Task 3')
])
console.log('All tasks failed:', result)`,
    inputs: [false, false, false],
    output: true,
    description: 'Output is true when all inputs are false'
  },
  {
    gate: 'XNOR',
    code: `// XNOR gate - succeeds when all Promises succeed or all fail
const result = await PromiseLogic.xnor([
  Promise.resolve('Task 1'),
  Promise.resolve('Task 2'),
  Promise.resolve('Task 3')
])
console.log('All succeeded or all failed:', result)`,
    inputs: [true, true, true],
    output: true,
    description: 'Output is true when all inputs are true or all are false'
  },
  {
    gate: 'MAJORITY',
    code: `// MAJORITY gate - succeeds when most Promises succeed
const result = await PromiseLogic.majority([
  Promise.resolve('Task 1'),
  Promise.resolve('Task 2'),
  Promise.reject('Task 3')
])
console.log('Majority tasks succeeded:', result)`,
    inputs: [true, true, false],
    output: true,
    description: 'Output is true when the majority of inputs are true'
  }
]

interface LogicGateCodeDemoProps {
  activeGate: LogicGateType
}

export function LogicGateCodeDemo({
  activeGate
}: LogicGateCodeDemoProps) {
  // 从硬编码数组中获取当前门的数据
  const currentDemo = LOGIC_GATE_DEMOS.find(demo => demo.gate === activeGate)
  
  if (!currentDemo) {
    return null
  }

  const { code, inputs, output, description } = currentDemo
  
  // 计算输入状态统计
  const trueCount = inputs.filter(Boolean).length
  const falseCount = inputs.length - trueCount


  return (
    <div className="relative w-full ">
      {/* 代码块容器 */}
      <div className={cn(
        'bg-white/50 dark:bg-gray-800/50 rounded-xl border-2 p-4 relative',
        output 
          ? 'border-green-400 dark:border-green-500' 
          : 'border-gray-400 dark:border-gray-600'
      )}>
        {/* 门类型标签 */}
        <div className="absolute -top-3 left-4">
          <span className="text-xs font-mono text-white bg-blue-600 dark:bg-blue-700 px-3 py-1 rounded-full border border-blue-400 dark:border-blue-500">
            {activeGate} Gate
          </span>
        </div>
        
        {/* 状态指示器 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 dark:text-gray-300 text-sm">Inputs:</span>
            <div className="flex space-x-1">
              {inputs.map((input, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-3 h-3 rounded-full border-2',
                    input 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-red-500 bg-red-500'
                  )}
                />
              ))}
            </div>
            <span className="text-gray-400 dark:text-gray-300 text-sm">→</span>
            <div
              className={cn(
                'w-3 h-3 rounded-full border-2',
                output 
                  ? 'border-green-500 bg-green-500' 
                  : 'border-red-500 bg-red-500'
              )}
            />
            <span className="text-gray-400 dark:text-gray-300 text-sm">Output</span>
          </div>
          
          {/* 状态统计 */}
          <div className="text-xs text-gray-400 dark:text-gray-300">
            {trueCount}真/{falseCount}假
          </div>
        </div>
        
        {/* 代码内容 */}
        <pre className="rounded-md">
            <CodeMarkdown 
            content={`\`\`\`javascript\n${code}\n\`\`\``} 
          />
        </pre>
      </div>
      
      {/* 状态说明 */}
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-200">
          {output ? (
            <span className="text-green-600 dark:text-green-400 font-medium">✓ Succeeded</span>
          ) : (
            <span className="text-red-600 dark:text-red-400 font-medium">✗ Failed</span>
          )}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  )
}