import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function AllSettledDocsPage() {
  const parameters = [
    {
      name: 'iterable',
      type: 'Iterable<T | PromiseLike<T>>',
      description: 'An iterable collection of Promise objects'
    }
  ]

  const behaviors = [
    {
      type: 'success' as const,
      title: 'Completion Condition',
      description: 'Waits for all Promises to complete (regardless of success or failure), returns a PromiseWithTimer that resolves to an array containing the status of each Promise.'
    },
    {
      type: 'error' as const,
      title: 'Special Case',
      description: 'The allSettled method never fails, always returns a successful result array.'
    }
  ]

  const errorTypes: Array<{ type: string; description: string }> = []

  const examples = [
    {
      title: 'Basic Usage',
      description: 'ALLSETTLED Logic Example - Waits for all Promises to complete',
      initialCode: `// ALLSETTLED Logic Example - Waits for all Promises to complete
const results = await PromiseLogic.allSettled([
  Promise.resolve('Service A succeeded'),
  Promise.reject('Service B failed'),
  Promise.resolve('Service C succeeded'),
  Promise.reject('Service D failed')
])

console.log('All services completion status:')
results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log('Service ' + (index + 1) + ': Success - ' + result.value)
  } else {
    console.log('Service ' + (index + 1) + ': Failed - ' + result.reason)
  }
})

return results`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const results = await PromiseLogic.allSettled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/invalid').then(r => r.json())
  ]).maxTimer(5000) // 5 second timeout
  
  console.log('Got all results within timeout:', results)
  return results
} catch (error) {
  console.log('Timeout or error:', error.message)
  return error
}`
    },
    {
      title: 'Result Processing',
      description: 'ALLSETTLED Logic Example - Process completion results',
      initialCode: `// ALLSETTLED Logic Example - Process completion results
const results = await PromiseLogic.allSettled([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/invalid').then(r => r.json())
])

// Separate successful and failed results
const successful = results.filter(r => r.status === 'fulfilled').map(r => r.value)
const failed = results.filter(r => r.status === 'rejected').map(r => r.reason)

console.log('Successful results:', successful)
console.log('Failed results:', failed)

return { successful, failed }`
    },
    {
      title: 'Real Application',
      description: 'Batch operation result analysis with timeout',
      initialCode: `// Real Application: Batch operation result analysis with timeout
async function analyzeBatchOperations() {
  try {
    const operations = [
      { id: 1, name: 'User Creation', action: createUser },
      { id: 2, name: 'Order Processing', action: processOrder },
      { id: 3, name: 'Inventory Update', action: updateInventory },
      { id: 4, name: 'Payment Processing', action: processPayment }
    ]

    // Execute all operations, regardless of success or failure
    const results = await PromiseLogic.allSettled(
      operations.map(op => op.action())
    ).maxTimer(5000)

    // Analyze results
    const analysis = {
      total: results.length,
      successful: results.filter(r => r.status === 'fulfilled').length,
      failed: results.filter(r => r.status === 'rejected').length,
      details: results.map((result, index) => ({
        operation: operations[index],
        status: result.status,
        result: result.status === 'fulfilled' ? result.value : result.reason
      }))
    }

    console.log('Batch operation analysis:', analysis)
    return analysis
  } catch (error) {
    console.error('Timeout or error:', error)
    throw error
  }
}

// Mock operation functions
async function createUser() {
  return 'User created successfully'
}

async function processOrder() {
  throw new Error('Order processing failed')
}

async function updateInventory() {
  return 'Inventory updated successfully'
}

async function processPayment() {
  return 'Payment processed successfully'
}

// Execute example
await analyzeBatchOperations()`
    }
  ]

  const notes = [
    'ALLSETTLED logic behaves exactly like standard Promise.allSettled()',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel Promise operation itself',
    'Always returns successful results, containing completion status of all Promises',
    'Suitable for scenarios requiring knowledge of all operation results, such as batch operations, result analysis',
    'Returned array contains status (fulfilled or rejected) and corresponding value or reason for each Promise'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.allSettled()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
            Core Logic Gate
          </span>
          <span>Waits for all Promises to complete (regardless of success or failure)</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.allSettled()</code> method implements ALLSETTLED (all completed) logic gate semantics,
          waiting for all Promises to complete (regardless of success or failure), returning an array containing the status of each Promise.
          It returns a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.allSettled(iterable)\n\`\`\``}
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
          description="Returns a PromiseWithTimer that resolves to an array of completion status of all Promises, containing success or failure information for each Promise."
          type="PromiseWithTimer<PromiseSettledResult<T>[]>"
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
