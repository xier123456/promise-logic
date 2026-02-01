import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function XorDocsPage() {
  const parameters = [
    {
      name: 'iterable',
      type: 'Iterable<Promise<T>>',
      description: 'An iterable collection of Promise objects'
    }
  ]

  const behaviors = [
    {
      type: 'success' as const,
      title: 'Success Condition',
      description: 'When exactly one Promise resolves successfully, PromiseWithTimer resolves to that Promise\'s value.'
    },
    {
      type: 'error' as const,
      title: 'Failure Condition',
      description: 'When no Promise succeeds or more than one Promise succeeds, PromiseWithTimer is rejected.'
    }
  ]

  const errorTypes = [
    {
      type: 'XOR_ERROR',
      description: 'Thrown when the number of successful Promises is not exactly one'
    }
  ]

  const examples = [
    {
      title: 'Basic Usage',
      description: 'XOR Logic Example - Succeeds when exactly one succeeds',
      initialCode: `// XOR Logic Example - Succeeds when exactly one succeeds
const result = await PromiseLogic.xor([
  Promise.reject('Service A failed'),
  Promise.resolve('Service B succeeded'),
  Promise.reject('Service C failed')
])

console.log('Only successful service:', result)
return result`
    },
    {
      title: 'Error Handling',
      description: 'XOR Logic Failure Example - Multiple Promises succeed',
      initialCode: `// XOR Logic Failure Example - Multiple Promises succeed
try {
  const result = await PromiseLogic.xor([
    Promise.resolve('Service A succeeded'),
    Promise.resolve('Service B succeeded'),
    Promise.reject('Service C failed')
  ])
  console.log('Success:', result)
} catch (error) {
  console.log('Multiple services succeeded, does not meet XOR condition:', error)
  return error
}`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const result = await PromiseLogic.xor([
    fetch('/api/primary').then(r => r.json()),
    fetch('/api/backup').then(r => r.json())
  ]).maxTimer(3000) // 3 second timeout
  
  console.log('Got exclusive response within timeout:', result)
  return result
} catch (error) {
  console.log('Timeout or XOR condition failed:', error.message)
  return error
}`
    },
    {
      title: 'Real Application',
      description: 'Primary-backup service pattern with timeout',
      initialCode: `// Real Application: Primary-backup service pattern with timeout
async function fetchWithPrimaryBackup() {
  try {
    // Ensure only one of primary or backup service responds
    const result = await PromiseLogic.xor([
      fetch('https://api.main.com/data').then(r => r.json()),
      fetch('https://api.backup.com/data').then(r => r.json())
    ]).maxTimer(5000) // 5 second timeout
    
    console.log('Successfully got exclusive response:', result)
    return result
  } catch (error) {
    if (error.type === 'XOR_ERROR') {
      console.error('Both services responded or both failed:', error)
    } else {
      console.error('Timeout or network error:', error)
    }
    throw error
  }
}

// Execute example
await fetchWithPrimaryBackup()`
    }
  ]

  const notes = [
    'XOR logic requires exactly one Promise to succeed, otherwise it is considered a failure',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel Promise operation itself',
    'Suitable for scenarios requiring exclusive operations, such as resource locking, uniqueness validation',
    'When no Promise succeeds, returns all Promise rejection reasons',
    'When multiple Promises succeed, returns an error indicating multiple operations succeeded simultaneously'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.xor()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
            Core Logic Gate
          </span>
          <span>XOR Logic - Succeeds when exactly one Promise succeeds</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.xor()</code> method implements XOR (exclusive OR) logic gate semantics,
          succeeding when exactly one Promise succeeds. It returns a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.xor(iterable)\n\`\`\``}
          />
        </pre>
      </div>

      {/* Parameters */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Parameters</h2>
        <ParameterTable parameters={parameters} />
      </div>

      {/* Return Value */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Return Value</h2>
        <ReturnValue 
          description="Returns a PromiseWithTimer that resolves to value of successful Promise when exactly one Promise succeeds."
          type="PromiseWithTimer<T>"
        />
      </div>

      {/* Behavior */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Behavior</h2>
        <BehaviorSection behaviors={behaviors} />
      </div>

      {/* Error Types */}
      <ErrorTypes errorTypes={errorTypes} />

      {/* Examples */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Examples</h2>
        <CodeExamples examples={examples} />
      </div>

      {/* Important Notes */}
      <NoteSection title="Important Notes" items={notes} />
    </div>
  )
}
