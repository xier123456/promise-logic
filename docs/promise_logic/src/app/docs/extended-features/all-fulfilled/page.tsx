import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function AllFulfilledPage() {
  const parameters = [
    {
      name: 'iterable',
      type: 'Iterable<PromiseLike<unknown>>',
      description: 'An iterable collection of Promise objects'
    }
  ]

  const behaviors = [
    {
      type: 'success' as const,
      title: 'Success Condition',
      description: 'Waits for all Promises to complete, then returns a PromiseWithTimer that resolves to an array of values from all successful Promises.'
    },
    {
      type: 'error' as const,
      title: 'Special Case',
      description: 'The allFulfilled method never fails, even if all Promises fail it will return an empty array.'
    }
  ]

  const errorTypes: Array<{ type: string; description: string }> = []

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Get all successful operation results',
      initialCode: `// Get all successful operation results
const results = await PromiseLogic.allFulfilled([
  Promise.resolve('Operation 1 succeeded'),
  Promise.reject('Operation 2 failed'),
  Promise.resolve('Operation 3 succeeded'),
  Promise.reject('Operation 4 failed')
])

console.log('Successful operations:', results)
console.log('Success count:', results.length)
return results`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const results = await PromiseLogic.allFulfilled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/invalid').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]).maxTimer(5000) // 5 second timeout
  
  console.log('Got successful results within timeout:', results)
  return results
} catch (error) {
  console.log('Timeout or error:', error.message)
  return error
}`
    },
    {
      title: 'Batch Operation Analysis',
      description: 'Analyze batch operation execution',
      initialCode: `// Analyze batch operation execution
async function analyzeBatchOperations() {
  const operations = [
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/invalid').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]

  const successfulResults = await PromiseLogic.allFulfilled(operations)
  
  console.log('Batch operation analysis:')
  console.log('Total operations:', operations.length)
  console.log('Successful operations:', successfulResults.length)
  console.log('Success rate:', (successfulResults.length / operations.length * 100).toFixed(1) + '%')
  console.log('Successful results:', successfulResults)
  
  return {
    total: operations.length,
    successful: successfulResults.length,
    successRate: successfulResults.length / operations.length,
    results: successfulResults
  }
}

await analyzeBatchOperations()`
    },
    {
      title: 'Real Application',
      description: 'Fault-tolerant data loading with timeout',
      initialCode: `// Real Application: Fault-tolerant data loading with timeout
async function loadUserDataWithFallback(userIds) {
  try {
    // Load multiple user data in parallel
    const userPromises = userIds.map(id => 
      fetch(\`/api/users/\${id}\`)
        .then(r => {
          if (!r.ok) throw new Error(\`User \${id} loading failed\`)
          return r.json()
        })
        .catch(error => {
          console.warn(\`User \${id} loading failed:\`, error.message)
          throw error
        })
    )

    // Get all successfully loaded user data
    const successfulUsers = await PromiseLogic.allFulfilled(userPromises).maxTimer(5000)
    
    console.log('Number of successfully loaded users:', successfulUsers.length)
    console.log('Number of failed user loads:', userIds.length - successfulUsers.length)
    
    // Even if some user data loading fails, can continue processing successful data
    if (successfulUsers.length > 0) {
      console.log('Available user data:', successfulUsers)
      return successfulUsers
    } else {
      console.log('All user data loading failed, need fallback handling')
      return []
    }
  } catch (error) {
    console.error('Timeout or error:', error)
    throw error
  }
}

// Execute example
const userIds = ['user1', 'user2', 'user3', 'user4']
await loadUserDataWithFallback(userIds)`
    }
  ]

  const notes = [
    'allFulfilled always returns successful results, even if all Promises fail it returns an empty array',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel Promise operation itself',
    'Suitable for scenarios where you need to get successful results without caring about failures',
    'Can be combined with other logic gates to build more complex control flows',
    'Returned array only contains values from successful Promises, no failure information'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.allFulfilled()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
            Extended Feature
          </span>
          <span>Get all successful results, always returns a successful result array</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.allFulfilled()</code> method returns all successful results as an array, ignoring failed results.
          It returns a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.allFulfilled(iterable)\n\`\`\``}
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
          description="Returns a PromiseWithTimer that resolves to an array of values from all successful Promises (may be empty)."
          type="PromiseWithTimer<unknown[]>"
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
