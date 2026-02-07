'use client';

import { useState } from 'react';
import {
  ExtendedLogicGateType,
  LogicGateType,
  utilityLogicGateType
} from '@/lib/types/logic-gate';
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
    description: 'All Promises succeed, returns result array; any failure causes overall failure, equivalent to native Promise.all'
  },
  {
    type: 'OR',
    category: 'logic',
    description: 'At least one Promise succeeds, returns first success result; all failures cause overall failure, equivalent to native Promise.any'
  },
  {
    type: 'XOR',
    category: 'logic',
    description: 'Exactly one Promise succeeds, returns that result; otherwise throws XOR_ERROR'
  },
  {
    type: 'NAND',
    category: 'logic',
    description: 'Not all Promises succeed (at least one fails), returns success result array; all successes cause overall failure'
  },
  {
    type: 'NOR',
    category: 'logic',
    description: 'All Promises fail (no tasks succeed), returns empty array; any success causes overall failure'
  },
  {
    type: 'XNOR',
    category: 'logic',
    description: 'All Promises either succeed or fail (same status), returns success result array; otherwise throws XNOR_ERROR'
  },
  {
    type: 'MAJORITY',
    category: 'logic',
    description: 'More than specified threshold of Promises succeed, returns success result array; otherwise overall failure. Accepts options parameter, max property customizes threshold (default: 0.5)'
  },
  // Extended Operations
  {
    type: 'allFulfilled',
    category: 'extended',
    description: 'Returns all success results as array, ignores failures. Returns immediately when success results exist, maintains input-output order consistency'
  },
  {
    type: 'allRejected',
    category: 'extended',
    description: 'Returns all failure results as array, ignores successes. Returns immediately when failure results exist, maintains input-output order consistency'
  },
  {
    type: 'allSettled',
    category: 'extended',
    description: 'Returns all results (both successes and failures) as array, equivalent to native Promise.allSettled'
  },
  // Utility Methods
  {
    type: 'not',
    category: 'utility',
    description: 'Inverts single Promise result: success becomes failure, failure becomes success'
  },
  {
    type: 'race',
    category: 'utility',
    description: 'Returns first completed Promise result (whether success or failure), equivalent to native Promise.race'
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
      <div className='w-full  flex  items-center justify-end '>
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg font-semibold">
          Version 2.8.5
        </div>
      </div>

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
        type={
          selectedOperation as
            | LogicGateType
            | ExtendedLogicGateType
            | utilityLogicGateType
        }
        interactive={true}
        size="md"
      />
    </div>
  );
}
