'use client'

import { useState } from 'react'
import { InteractiveCodeEditor } from '@/components/features/code/CodeEditor/InteractiveCodeEditor'
import { DEFAULT_INITIAL_CODE } from '@/lib/constants/editor'

export function LiveDemoSection() {

  const handleRunCode = async (code: string) => {
    // 在浏览器中安全地执行代码
    try {
      // 动态导入PromiseLogic库
      const { PromiseLogic } = await import('promise-logic')
      
      // 创建一个安全的执行环境
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
      const func = new AsyncFunction('PromiseLogic', 'console', code)
      
      // 执行代码并捕获console输出
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
        
        // 恢复原始console
        console.log = originalConsoleLog
        
        // 返回执行结果和console输出
        return {
          result,
          console: consoleOutput
        }
      } catch (execError) {
        // 恢复原始console
        console.log = originalConsoleLog
        throw execError
      }
    } catch (error) {
      throw new Error(`Execution failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br min-h-screen from-slate-100 to-blue-100 dark:from-slate-900 dark:to-blue-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Try It Live
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Edit the code below and see PromiseLogic in action. Experience the power of logical gate semantics firsthand.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8">
          <InteractiveCodeEditor
            initialCode={DEFAULT_INITIAL_CODE}
            language="javascript"
            height={300}
            onRun={handleRunCode}
            showConsole={true}
            livePreview={false}
          />
        </div>
      </div>
    </section>
  )
}