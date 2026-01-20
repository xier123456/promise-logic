'use client'

import { useState } from 'react'
import { InteractiveCodeEditor } from '@/components/features/code/CodeEditor/InteractiveCodeEditor'

interface CodeExampleProps {
  initialCode: string
  title?: string
  description?: string
}

export function CodeExample({ initialCode, title, description }: CodeExampleProps) {

  const handleRunCode = async (code: string) => {
    try {
      const { PromiseLogic } = await import('promise-logic')
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
      const func = new AsyncFunction('PromiseLogic', 'console', code)
      
      const originalConsoleLog = console.log
      const consoleOutput: string[] = []
      
      console.log = (...args: unknown[]) => {
        consoleOutput.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '))
        originalConsoleLog(...args)
      }
      
      try {
        const result = await func(PromiseLogic, console)
        console.log = originalConsoleLog
        return { result, console: consoleOutput }
      } catch (execError) {
        console.log = originalConsoleLog
        throw execError
      }
    } catch (error) {
      throw new Error(`Execution failed: ${error instanceof Error ? error.message : String(error)}`)
    } 
  }

  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {description}
        </p>
      )}
      
      <InteractiveCodeEditor
        initialCode={initialCode}
        language="javascript"
        height={200}
        onRun={handleRunCode}
        showConsole={true}
      />
    </div>
  )
}