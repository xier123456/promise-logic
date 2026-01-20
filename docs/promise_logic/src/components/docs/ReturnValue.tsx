interface ReturnValueProps {
  description: string
  type: string
}

export function ReturnValue({ description, type }: ReturnValueProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <div className="bg-gray-50 dark:bg-gray-900">
        <pre className="p-4 text-sm overflow-x-auto">
          <code className="language-javascript text-gray-800 dark:text-gray-200">{type}</code>
        </pre>
      </div>
    </div>
  )
}