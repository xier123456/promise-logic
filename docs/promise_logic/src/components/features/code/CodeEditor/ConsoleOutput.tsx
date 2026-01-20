'use client'

import { ConsoleOutputProps } from '@/lib/types/editor'
import { formatOutput } from '@/lib/utils/format'
import { cn } from '@/lib/utils/dom'

export function ConsoleOutput({ outputs, error }: ConsoleOutputProps) {
  if (outputs.length === 0 && !error) return null

  return (
    <div className="border-t bg-gray-50 rounded-lg border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 py-2 border-b bg-gray-100 dark:bg-gray-700 rounded-t-lg">
        <span className="text-sm font-medium text-gray-700 dark:text-white">Console</span>
      </div>
      <div className="p-4 font-mono text-sm max-h-40 overflow-y-auto dark:text-white">
        {outputs.map((item, index) => (
          <div
            key={index}
            className={cn(
              'mb-1',
              item.type === 'error' ? 'text-error-600' : 'text-gray-800'
            )}
          >
            {item.type === 'error' ? '❌ ' : '✅ '}
            {formatOutput(item.value)}
          </div>
        ))}
        {error && (
          <div className="text-error-600">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  )
}