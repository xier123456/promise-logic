// InteractiveCodeEditor.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import Editor, { Monaco } from '@monaco-editor/react'
import { InteractiveCodeEditorProps, EditorOutput } from '@/lib/types/editor'
import { EDITOR_DEFAULT_OPTIONS } from '@/lib/constants/editor'
import { cn } from '@/lib/utils/dom'
import { EditorToolbar } from './EditorToolbar'
import { ConsoleOutput } from './ConsoleOutput'
import { createPromiseLogicCompletionProvider } from './PromiseLogicCompletionProvider'
import { useTheme } from 'next-themes'

export function InteractiveCodeEditor({
  initialCode,
  language = 'javascript',
  height = 300,
  onRun,
  showConsole = true,
  livePreview = false,
  readOnly = false,
  className
}: InteractiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<EditorOutput[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRun = useCallback(async () => {
    if (!onRun) return
    
    setIsRunning(true)
    setError(null)
    setOutput([])

    try {
      const result = await onRun(code)
      setOutput(prev => [...prev, { type: 'result', value: result }])
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setOutput(prev => [...prev, { type: 'error', value: err }])
    } finally {
      setIsRunning(false)
    }
  }, [onRun, code])

  useEffect(() => {
    if (livePreview) {
      const timeout = setTimeout(() => {
        handleRun()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [code, livePreview, handleRun])

  const clearOutput = () => {
    setOutput([])
    setError(null)
  }

  const handleEditorMount = (editor: Monaco, monaco: Monaco) => {
    // 配置PromiseLogic的智能提示
    const provider = createPromiseLogicCompletionProvider(monaco)
    
    // 注册自动完成提供者
    monaco.languages.registerCompletionItemProvider('javascript', provider)
    monaco.languages.registerCompletionItemProvider('typescript', provider)

    // 启用编辑器功能
    editor.updateOptions({
      suggestOnTriggerCharacters: true,
      quickSuggestions: { other: true, comments: false, strings: false },
      parameterHints: { enabled: true },
      hover: { enabled: true },
      fixedOverflowWidgets: true,
      // 添加更多编辑器选项来改善提示框位置
      minimap: { enabled: false },
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        useShadows: false,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
        alwaysConsumeMouseWheel: false
      },
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      scrollBeyondLastLine: false,
      automaticLayout: true, // 自动布局，重要！
      wordBasedSuggestions: true,
      suggestSelection: 'first',
      acceptSuggestionOnEnter: 'on',
      tabCompletion: 'on',
      snippetSuggestions: 'inline'
    })
  }

  const { theme } = useTheme()

  return (
    <div className={cn('flex flex-col', className)}>
      {/* 代码编辑器部分 */}
      <div 
        className={cn('border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 flex flex-col shadow-sm')}
        style={{ height: `${height}px` }}
      >
        <EditorToolbar
          language={language}
          livePreview={livePreview}
          isRunning={isRunning}
          onRun={handleRun}
          onClear={clearOutput}
          showConsole={showConsole}
        />

        {/* 代码编辑器 */}
        <div className="flex-grow relative">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value ?? '')}
            onMount={handleEditorMount}
            options={{
              ...EDITOR_DEFAULT_OPTIONS,
              readOnly,
              lineNumbers: 'on' as const,
              wordWrap: EDITOR_DEFAULT_OPTIONS.wordWrap as 'on' | 'off' | 'wordWrapColumn' | 'bounded',
              suggest: {
                ...EDITOR_DEFAULT_OPTIONS.suggest,
                insertMode: 'replace' as 'replace' | 'insert' | undefined
              },
              // 确保提示框正确显示
              fixedOverflowWidgets: true,
              automaticLayout: true,
              // 调整滚动条样式，避免与提示框冲突
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false
              },
              minimap: {
                enabled: false
              },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              scrollBeyondLastLine: false,
              // 使用主题
              theme: theme === 'dark' ? 'vs-dark' : 'vs-light',
              fontSize: 14,
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              lineHeight: 20,
              padding: { top: 16, bottom: 16 }
            }}
          />
        </div>
      </div>

      {/* 控制台输出 - 放在编辑器外部下方 */}
      {showConsole && (
        <div className="mt-4">
          <ConsoleOutput outputs={output} error={error} />
        </div>
      )}
    </div>
  )
}