'use client'

import { EditorToolbarProps } from '@/lib/types'
import { cn } from '@/lib/utils'

export function EditorToolbar({
  language,
  livePreview = false,
  isRunning = false,
  onRun,
  onClear,
  showConsole = true
}: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-mono text-gray-600 dark:text-gray-300">{language.toUpperCase()}</span>
        {livePreview && (
          <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
            Live Preview
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {showConsole && onClear && (
          <button
            onClick={onClear}
            className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border dark:border-gray-600 rounded"
          >
            Clear
          </button>
        )}
        {onRun && (
          <button
            onClick={onRun}
            disabled={isRunning}
            className={cn(
              'px-3 py-1 border border-primary-600 dark:border-white dark:text-white text-xs rounded transition-colors',
              isRunning 
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                : 'bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-500'
            )}
          >
            {isRunning ? 'Running...' : 'Run'}
          </button>
        )}
      </div>
    </div>
  )
}