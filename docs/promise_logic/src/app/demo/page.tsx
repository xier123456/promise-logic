'use client';

import { useState } from 'react';
import { ExtendedLogicGateType, LogicGateType, utilityLogicGateType } from '@/lib/types/logic-gate';
import {
  EXTENDED_LOGIC_OPERATIONS,
  UTILITY_OPERATIONS
} from '@/lib/constants/logic-gates';
import { LogicGateVisualizer } from '@/components/features/logic-gate/LogicGateVisualizer';

type OperationType =
  | LogicGateType
  | keyof typeof EXTENDED_LOGIC_OPERATIONS
  | keyof typeof UTILITY_OPERATIONS;

type OperationCategory = 'logic' | 'extended' | 'utility';

interface OperationInfo {
  type: OperationType;
  category: OperationCategory;
  description: string;
}

const OPERATIONS_INFO: OperationInfo[] = [
  // Logic Gates
  {
    type: 'AND',
    category: 'logic',
    description: 'Output is true only when all inputs are true'
  },
  {
    type: 'OR',
    category: 'logic',
    description: 'Output is true when at least one input is true'
  },
  {
    type: 'XOR',
    category: 'logic',
    description: 'Output is true when exactly one input is true'
  },
  {
    type: 'NAND',
    category: 'logic',
    description: 'Output is true when not all inputs are true'
  },
  {
    type: 'NOR',
    category: 'logic',
    description: 'Output is true when all inputs are false'
  },
  {
    type: 'XNOR',
    category: 'logic',
    description: 'Output is true when all inputs are true or all are false'
  },
  {
    type: 'MAJORITY',
    category: 'logic',
    description: 'Output is true when the majority of inputs are true'
  },
  // Extended Operations
  {
    type: 'allFulfilled',
    category: 'extended',
    description: 'Returns all successful results, ignores failures'
  },
  {
    type: 'allRejected',
    category: 'extended',
    description: 'Returns all failure results, ignores successes'
  },
  {
    type: 'allSettled',
    category: 'extended',
    description: 'Returns all results (both successes and failures)'
  },
  // Utility Methods
  {
    type: 'not',
    category: 'utility',
    description: 'Inverts the result of a single promise'
  },
  {
    type: 'race',
    category: 'utility',
    description: 'Returns the first completed promise result'
  }
];

export default function LogicGatesDemoPage() {
  const [selectedOperation, setSelectedOperation] =
    useState<OperationType>('AND');
  const [selectedCategory, setSelectedCategory] =
    useState<OperationCategory>('logic');

  const getOperationInfo = (type: OperationType): OperationInfo | undefined => {
    return OPERATIONS_INFO.find((info) => info.type === type);
  };

  const filteredOperations = OPERATIONS_INFO.filter(
    (info) => info.category === selectedCategory
  );

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto py-12">

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Select Category
        </h2>
        <div className="flex space-x-3 mb-6">
          {(['logic', 'extended', 'utility'] as OperationCategory[]).map(
            (category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  const operations = OPERATIONS_INFO.filter(
                    (info) => info.category === category
                  );
                  setSelectedOperation(operations[0].type);
                }}
                className={`
                px-4 py-2 rounded-lg font-semibold transition-all duration-200
                ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }
              `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Select Operation
        </h3>
        <div className={`grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3`}>
          {filteredOperations.map((operation) => (
            <button
              key={operation.type}
              onClick={() => setSelectedOperation(operation.type)}
              className={`
                px-4 py-3 rounded-lg font-semibold transition-all duration-200
                ${
                  selectedOperation === operation.type
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 transform scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }
              `}
            >
              {operation.type}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-blue-900 dark:text-blue-100 font-medium">
            {getOperationInfo(selectedOperation)?.description}
          </p>
        </div>
      </div>

      <LogicGateVisualizer
        type={selectedOperation as LogicGateType | ExtendedLogicGateType | utilityLogicGateType}
        interactive={true}
        size="md"
      />
    </div>
  );
}
