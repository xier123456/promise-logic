import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function OrDocsPage() {
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
      description: 'Returns value of first Promise that resolves successfully.'
    },
    {
      type: 'error' as const,
      title: 'Failure Condition',
      description: 'When all input Promises are rejected, PromiseWithTimer is rejected with an AggregateError containing all rejection reasons.'
    }
  ]

  const errorTypes = [
    {
      type: 'AggregateError',
      description: 'Thrown when all input Promises fail, containing all rejection reasons'
    }
  ]

  const examples = [
    {
      title: 'Basic Usage',
      description: 'OR Logic Example - Returns first successful Promise',
      initialCode: `// OR Logic Example - Returns first successful Promise
const result = await PromiseLogic.or([
  Promise.reject('Service A unavailable'),
  Promise.resolve('Service B responded successfully'),
  Promise.resolve('Service C responded successfully')
])

console.log('Success result:', result)
return result`
    },
    {
      title: 'Error Handling',
      description: 'OR Logic Failure Example - All Promises fail',
      initialCode: `// OR Logic Failure Example - All Promises fail
try {
  const result = await PromiseLogic.or([
    Promise.reject('Service A failed'),
    Promise.reject('Service B failed'),
    Promise.reject('Service C failed')
  ])
  console.log('Success:', result)
} catch (error) {
  console.log('All services failed:', error)
  return error
}`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const result = await PromiseLogic.or([
    fetch('/api/primary').then(r => r.json()),
    fetch('/api/backup').then(r => r.json()),
    fetch('/api/fallback').then(r => r.json())
  ]).maxTimer(3000) // 3 second timeout
  
  console.log('Got response within timeout:', result)
  return result
} catch (error) {
  console.log('Timeout or all services failed:', error.message)
  return error
}`
    },
    {
      title: 'Real Application',
      description: 'Service degradation strategy with timeout',
      initialCode: `// Real Application: Service degradation strategy with timeout
async function fetchUserProfile() {
  try {
    // Try multiple user service endpoints, return first successful one
    const profile = await PromiseLogic.or([
      fetch('/api/users/primary').then(r => r.json()),
      fetch('/api/users/backup').then(r => r.json()),
      fetch('/api/users/fallback').then(r => r.json())
    ]).maxTimer(5000) // 5 second timeout
    
    console.log('User profile:', profile)
    return profile
  } catch (error) {
    console.error('All user services unavailable or timed out:', error)
    throw error
  }
}

// Execute example
await fetchUserProfile()`
    }
  ]

  const notes = [
    'OR logic behaves similarly to standard Promise.any(), but provides more intuitive logical semantics',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel Promise operation itself',
    'Suitable for scenarios requiring service degradation or failover',
    'When all Promises fail, returns AggregateError containing all failure reasons',
    'For scenarios where all operations must succeed, consider using PromiseLogic.and()'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.or()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
            Core Logic Gate
          </span>
          <span>OR Logic - Returns first successful Promise</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.or()</code> method implements OR logic gate semantics, returning value of first Promise that resolves successfully.
          It returns a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.or(iterable)\n\`\`\``}
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
          description="Returns a PromiseWithTimer that resolves to value of first successful Promise."
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
