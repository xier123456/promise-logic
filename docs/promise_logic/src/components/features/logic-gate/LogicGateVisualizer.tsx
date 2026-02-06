'use client';

import { useState, useEffect } from 'react';
import {
  LogicGateType,
  LogicGateVisualizerProps
} from '@/lib/types/logic-gate';
import { LogicGateResult } from '@/lib/types/logic-gates';
import { LOGIC_GATE_TRUTH_TABLE } from '@/lib/constants/logic-gates';
import { cn } from '@/lib/utils/dom';

export function LogicGateVisualizer({
  type,
  interactive = true,
  size = 'md'
}: Omit<
  LogicGateVisualizerProps,
  'inputs' | 'output' | 'isProcessing' | 'onInputToggle'
>) {
  const [inputs, setInputs] = useState<{ content: string; status: boolean }[]>([
    { content: 'p1', status: false },
    { content: 'p2', status: false },
    { content: 'p3', status: false }
  ]);
  const [output, setOutput] = useState<LogicGateResult>({ success: false, data: null });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [outputStack, setOutputStack] = useState<{content: string, status: boolean}[]>([]);

  useEffect(() => {
    calculateOutput();
  }, [inputs, type]);

  

  const calculateOutput = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      const result = await LOGIC_GATE_TRUTH_TABLE[type](
        inputs.map((input) => input.status)
      );
      setOutput(result);

      // 只有当结果为true时才添加到栈中
      if (result.success) {
        const successInputs = inputs
          .map((input, index) => (input.status ? `p${index + 1}` : null))
          .filter(Boolean);
        let newContent: string;

        if (type === 'OR' || type === 'XOR') {
          newContent = successInputs[0] || '';
        } else if (type === 'AND' || type === 'MAJORITY') {
          newContent = successInputs.join(', ');
        } else if (type === 'NAND' || type === 'NOR' || type === 'XNOR') {
          newContent =
            successInputs.length > 0
              ? successInputs.join(', ')
              : 'All conditions met';
        } else {
          newContent = '';
        }

        setOutputStack([{content: newContent, status: result.success}]);
      }else{
        setOutputStack([])
      }

      setIsProcessing(false);
    }, 300);
  };

  console.log(outputStack);
  

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
    // if (inputs.length >= 5) return
    setInputs((prev) => [
      ...prev,
      { content: `p${prev.length + 1}`, status: false }
    ]);
  };

  const removeInput = () => {
    if (inputs.length <= 2) return;
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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {type} Gate Visualizer
        </h2>
        
        <span></span>
        {interactive && (
          <div className="flex items-center space-x-2">
            <button
              onClick={removeInput}
              disabled={inputs.length <= 2}
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
          <span className="text-gray-700 dark:text-gray-300 font-medium">resolve: 1</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">reject: 0</span>
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
            <p>
            {isProcessing ? '...' : output.success ? 'fulfilled' : 'rejected'}
            </p>
          </div>
          <div
            className={cn(
              'w-16 h-1 transition-colors duration-300',
              output.success ? 'bg-green-500' : 'bg-red-500'
            )}
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <span className={`text-gray-600 dark:text-gray-400 font-mono w-12 text-center
            ${output.success ? 'text-green-500' : 'text-red-500'}`}>
            OUT
          </span>

          {outputStack.map((item, index) => (
            item.content.split(',').map((char, charIndex) => (
              <div
                key={`${char}-${index}-${charIndex}`}
                className={cn(
                  'rounded-lg px-4 py-3 font-bold transition-all duration-200 flex items-center justify-center',
                  'bg-green-500 text-white shadow-lg shadow-green-500/50'
                )}
              >
                {char}
              </div>
            ))
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Code Example
          </h3>
          <pre className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-green-400">
              {`// ${type} Logic
const result = await PromiseLogic.${type.toLowerCase()}([
  ${inputs
    .map((input, index) =>
      input.status
        ? `Promise.resolve('p${index + 1}')`
        : `Promise.reject('p${index + 1}')`
    )
    .join(',\n  ')}
])

console.log('Result:', result)
// Output Stack: [${outputStack.slice(0, 3).map(item => item.content).join(', ')}${outputStack.length > 3 ? ', ...' : ''}]`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
