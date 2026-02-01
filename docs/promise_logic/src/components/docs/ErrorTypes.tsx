'use client'

import { ErrorType } from '@/lib/types/error'

interface ErrorTypesProps {
  errorTypes: ErrorType[]
}

export function ErrorTypes({ errorTypes }: ErrorTypesProps) {
  if (errorTypes.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Error Types</h2>
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="space-y-3">
          {errorTypes.map((errorType, index) => (
            <div key={index} className="flex items-start">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 mr-3 mt-0.5">
                {errorType.type}
              </span>
              <span className="text-red-700 dark:text-red-400 text-sm">
                {errorType.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
