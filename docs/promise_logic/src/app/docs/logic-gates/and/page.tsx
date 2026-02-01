import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function AndDocsPage() {
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
      description: 'When all input Promises resolve successfully, returns a PromiseWithTimer that resolves to an array of all successful values.'
    },
    {
      type: 'error' as const,
      title: 'Failure Condition',
      description: 'When any input Promise is rejected, the PromiseWithTimer is immediately rejected with the first rejection reason.'
    }
  ]

  const errorTypes = [
    {
      type: 'AND_ERROR',
      description: 'Thrown when any Promise in the input fails'
    }
  ]

  const examples = [
    {
      title: 'Basic Usage',
      description: 'AND Logic Example - Succeeds when all Promises succeed',
      initialCode: `// AND Logic Example - Succeeds when all Promises succeed
const results = await PromiseLogic.and([
  Promise.resolve('User data loaded'),
  Promise.resolve('Article data loaded'),
  Promise.resolve('Comment data loaded')
])

console.log('All data loaded:', results)
return results`
    },
    {
      title: 'Error Handling',
      description: 'AND Logic Failure Example - Any Promise failure causes overall failure',
      initialCode: `// AND Logic Failure Example - Any Promise failure causes overall failure
try {
  const results = await PromiseLogic.and([
    Promise.resolve('Task 1 completed'),
    Promise.reject('Task 2 failed'),
    Promise.resolve('Task 3 completed')
  ])
  console.log('Success:', results)
} catch (error) {
  console.log('Failure reason:', error)
  return error
}`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const results = await PromiseLogic.and([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/stats').then(r => r.json())
  ]).maxTimer(5000) // 5 second timeout
  
  console.log('All data loaded within timeout:', results)
  return results
} catch (error) {
  console.log('Timeout or error:', error.message)
  return error
}`
    },
    {
      title: 'Real Application',
      description: 'Load multiple API data in parallel with timeout',
      initialCode: `// Real Application: Load multiple API data in parallel with timeout
async function loadDashboardData() {
  try {
    const [users, posts, stats] = await PromiseLogic.and([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/stats').then(r => r.json())
    ]).maxTimer(5000) // 5 second timeout
    
    console.log('User data:', users)
    console.log('Article data:', posts)
    console.log('Statistics:', stats)
    
    return { users, posts, stats }
  } catch (error) {
    console.error('Data loading failed or timed out:', error)
    throw error
  }
}

// Execute example
await loadDashboardData()`
    }
  ]

  const notes = [
    'AND logic behaves exactly like standard Promise.all()',
    'Any Promise failure immediately causes overall failure (short-circuit behavior)',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel the Promise operation itself',
    'Suitable for scenarios where all operations must succeed to continue',
    'For scenarios where partial success is acceptable, consider using PromiseLogic.or()'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.and()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
            Core Logic Gate
          </span>
          <span>AND Logic - Succeeds when all Promises succeed</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.and()</code> method implements AND logic gate semantics, succeeding when all input Promises succeed.
          It returns a <code>PromiseWithTimer</code> instance which wraps the native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.and(iterable)\n\`\`\``}
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
          description="Returns a PromiseWithTimer that resolves to an array of all input Promise successful values."
          type="PromiseWithTimer<T[]>"
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
