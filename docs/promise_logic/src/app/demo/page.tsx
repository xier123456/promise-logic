'use client'

import { useState } from 'react'
import { LogicGateType } from '@/lib/types/logic-gate'
import { LOGIC_GATES } from '@/lib/constants/logic-gates'
import { LogicGateVisualizer } from '@/components/features/logic-gate/LogicGateVisualizer'

const LOGIC_GATE_DESCRIPTIONS: Record<LogicGateType, string> = {
  AND: 'Output is true only when all inputs are true',
  OR: 'Output is true when at least one input is true',
  XOR: 'Output is true when exactly one input is true',
  NAND: 'Output is true when not all inputs are true',
  NOR: 'Output is true when all inputs are false',
  XNOR: 'Output is true when all inputs are true or all are false',
  MAJORITY: 'Output is true when the majority of inputs are true'
}

export default function LogicGatesDemoPage() {
  const [selectedGate, setSelectedGate] = useState<LogicGateType>('AND')

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Logic Gates Visualizer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Interactive demonstration of logic gate behaviors using PromiseLogic
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Select a Logic Gate
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {LOGIC_GATES.map((gate) => (
            <button
              key={gate}
              onClick={() => setSelectedGate(gate)}
              className={`
                px-4 py-3 rounded-lg font-semibold transition-all duration-200
                ${selectedGate === gate
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 transform scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }
              `}
            >
              {gate}
            </button>
          ))}
        </div>
        
      </div>

      <div className="mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-blue-900 dark:text-blue-100 font-medium">
            {LOGIC_GATE_DESCRIPTIONS[selectedGate]}
          </p>
        </div>
      </div>

      <LogicGateVisualizer type={selectedGate} interactive={true} size="md" />
      
    </div>
  )
}
