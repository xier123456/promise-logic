'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  ExtendedLogicGateType,
  LogicGateType,
  utilityLogicGateType,
  visualizerProps
} from '@/lib/types/logic-gate';
import { LogicGateHandler, LogicGateResult } from '@/lib/types/logic-gates';
import {
  LOGIC_GATE_TRUTH_TABLE,
  EXTENDED_LOGIC_OPERATIONS,
  UTILITY_OPERATIONS
} from '@/lib/constants/logic-gates';
import { cn } from '@/lib/utils/dom';
import { CodeMarkdown } from '../code/markdown/code_markdown';

export function LogicGateVisualizer({
  type,
  interactive = true,
  size = 'md'
}: Omit<
  visualizerProps,
  'inputs' | 'output' | 'isProcessing' | 'onInputToggle'
>) {
  const [inputs, setInputs] = useState<{ content: string; status: boolean }[]>(
    []
  );
  const [output, setOutput] = useState<LogicGateResult>({
    success: false,
    data: null
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [jsonOutput, setJsonOutput] = useState<string>('');

  useEffect(() => {
    calculateOutput();
    setJsonOutput(JSON.stringify(output.data || null))

  }, [inputs, type]);


  const vType = type === 'not';

  useEffect(() => {
    if (type === 'not') {
      setInputs([{ content: 'p1', status: false }]);
    } else {
      setInputs([
        { content: 'p1', status: false },
        { content: 'p2', status: false },
        { content: 'p3', status: false }
      ]);
    }
  }, [vType]);

  const calculateOutput = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      let result: LogicGateResult;

      if (type in LOGIC_GATE_TRUTH_TABLE) {
        result = await LOGIC_GATE_TRUTH_TABLE[type as LogicGateType](
          inputs.map((input) => input.status)
        );
      } else if (type in EXTENDED_LOGIC_OPERATIONS) {
        result = await EXTENDED_LOGIC_OPERATIONS[
          type as keyof typeof EXTENDED_LOGIC_OPERATIONS
        ](inputs.map((input) => input.status));
      } else if (type in UTILITY_OPERATIONS) {
        if (type === 'not') {
          result = await UTILITY_OPERATIONS.not(inputs[0].status);
        } else {
          result = await UTILITY_OPERATIONS[
            type as Exclude<keyof typeof UTILITY_OPERATIONS, 'not'>
          ](inputs.map((input) => input.status));
        }
      } else {
        result = { success: false, data: null };
      }

      setOutput(result);

      setIsProcessing(false);
    }, 300);
  };

  const toggleInput = (index: number) => {
    if (!interactive) return;
    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = {
        content: newInputs[index].content,
        status: !newInputs[index].status
      };
      return newInputs;
    });
  };

  const addInput = () => {
    setInputs((prev) => [
      ...prev,
      { content: `p${prev.length + 1}`, status: false }
    ]);
  };

  const removeInput = () => {
    setInputs((prev) => prev.slice(0, -1));
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg'
  };

  const gateSizeClasses = {
    sm: 'w-24 h-16 text-xs',
    md: 'w-32 h-20 text-sm',
    lg: 'w-40 h-24 text-base'
  };

  const codeExample =
    type === 'not'
      ? `
// ${type} Logic
const result = await PromiseLogic.${type.toLowerCase()}(
  ${inputs[0].status ? `Promise.resolve('p1')` : `Promise.reject('p1')`}
)
// Output: ${useMemo(() => jsonOutput, [jsonOutput])}
`
      : `
// ${type} Logic
const result = await PromiseLogic.${type.toLowerCase()}([
  ${inputs
    .map((input, index) =>
      input.status
        ? `Promise.resolve('p${index + 1}')`
        : `Promise.reject('p${index + 1}')`
    )
    .join(',\n  ')}
])
// Output: ${useMemo(() => jsonOutput, [jsonOutput])}
`;

  return (
    <div className="w-full md:flex gap-4 max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className='md:flex-3'>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {type} Gate 
          </h2>

          {interactive && (
            <div className="flex items-center space-x-2">
              <button
                onClick={removeInput}
                className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                - Input
              </button>
              <span className="text-gray-600 dark:text-gray-400 font-mono">
                {inputs.length}
              </span>
              <button
                onClick={addInput}
                // disabled={inputs.length >= 5}
                className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                + Input
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-6 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              resolve: {inputs.filter(input => input.status).length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              reject: {inputs.filter(input => !input.status).length}
            </span>
          </div>
         
            <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-sm font-medium">pending</span>
            </div>
       
        </div>

        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="flex flex-col space-y-4">
            {inputs.map((input, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-400 font-mono w-12">
                  p{index + 1}
                </span>
                <button
                  onClick={() => toggleInput(index)}
                  disabled={!interactive}
                  className={cn(
                    'rounded-lg font-bold transition-all duration-200',
                    sizeClasses[size],
                    input.status
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                      : 'bg-red-500 text-white shadow-lg shadow-red-500/50',
                    !interactive && 'cursor-not-allowed opacity-70'
                  )}
                >
                  {input.status ? '1' : '0'}
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <div className="flex flex-col space-y-4">
              {inputs.map((item) => (
                <div
                  key={item.content}
                  className={cn(
                    'w-16 h-1 transition-colors duration-300',
                    item.status ? 'bg-green-500' : 'bg-red-500'
                  )}
                />
              ))}
            </div>
            <div
              className={cn(
                'flex items-center flex-col gap-2 justify-center  rounded-lg border-4 font-bold text-white transition-all duration-300',
                gateSizeClasses[size],
                isProcessing
                  ? 'border-yellow-500 bg-yellow-500 animate-pulse'
                  : output.success
                    ? 'border-green-500 bg-green-500 shadow-lg shadow-green-500/50'
                    : 'border-red-500 bg-red-500 shadow-lg shadow-red-500/50'
              )}
            >
              {type}
            </div>
            <div
              className={cn(
                'w-16 h-1 transition-colors duration-300',
                output.success ? 'bg-green-500' : 'bg-red-500'
              )}
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <span
                className={`text-gray-600 dark:text-gray-400 font-mono w-12 text-center
              ${output.success ? 'text-green-500' : 'text-red-500'}`}
              >
                OUT
              </span>
            </div>

            {!isProcessing && output.data !== null && (
              <>
                {typeof output.data === 'boolean' ? (
                  <div
                    className={cn(
                      'rounded-lg px-4 py-3 font-bold transition-all duration-200 flex items-center justify-center',
                      output.success
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                        : 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                    )}
                  >
                    {output.data.toString()}
                  </div>
                ) : (
                 Array.isArray(output.data) && output.data.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className={cn(
                        'rounded-lg px-4 py-3 font-bold transition-all duration-200 flex items-center justify-center',
                        'bg-green-500 text-white shadow-lg shadow-green-500/50'
                      )}
                    >
                      {item}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 md:flex-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 w-full">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Code Example
          </h3>

          <CodeMarkdown content={`\`\`\`javascript\n${codeExample}\n\`\`\``} />
        </div>
      </div>
    </div>
  );
}
