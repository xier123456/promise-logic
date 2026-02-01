import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function NorDocsPage() {
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
      description: 'When all Promises fail, PromiseWithTimer resolves to empty array.'
    },
    {
      type: 'error' as const,
      title: 'Failure Condition',
      description: 'When at least one Promise succeeds, PromiseWithTimer is rejected.'
    }
  ]

  const errorTypes = [
    {
      type: 'NOR_ERROR',
      description: 'Thrown when at least one Promise succeeds'
    }
  ]

  const examples = [
    {
      title: 'Basic Usage',
      description: 'NOR Logic Example - Succeeds when all Promises fail',
      initialCode: `// NOR Logic Example - Succeeds when all Promises fail
const result = await PromiseLogic.nor([
  Promise.reject('Service A failed'),
  Promise.reject('Service B failed'),
  Promise.reject('Service C failed')
])

console.log('All services failed, NOR result:', result)
return result`
    },
    {
      title: 'Error Handling',
      description: 'NOR Logic Failure Example - At least one succeeds',
      initialCode: `// NOR Logic Failure Example - At least one succeeds
try {
  const result = await PromiseLogic.nor([
    Promise.reject('Service A failed'),
    Promise.resolve('Service B succeeded'),
    Promise.reject('Service C failed')
  ])
  console.log('Success:', result)
} catch (error) {
  console.log('Service succeeded, NOR condition failed:', error)
  return error
}`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const result = await PromiseLogic.nor([
    fetch('/api/service1').then(r => r.json()),
    fetch('/api/service2').then(r => r.json()),
    fetch('/api/service3').then(r => r.json())
  ]).maxTimer(5000) // 5 second timeout
  
  console.log('All services failed within timeout:', result)
  return result
} catch (error) {
  console.log('Timeout or at least one service succeeded:', error.message)
  return error
}`
    },
    {
      title: 'Real Application',
      description: 'Complete system failure detection with timeout',
      initialCode: `// Real Application: Complete system failure detection with timeout
async function checkCompleteFailure() {
  try {
    // Check if all services have failed
    const results = await PromiseLogic.nor([
      checkPrimaryService(),
      checkBackupService(),
      checkFallbackService()
    ]).maxTimer(5000) // 5 second timeout
    
    console.log('All services failed - system completely unavailable:', results)
    // Trigger emergency recovery process
    return results
  } catch (error) {
    if (error.type === 'NOR_ERROR') {
      console.log('System still has available services')
      return []
    } else {
      console.error('Timeout or error:', error)
      throw error
    }
  }
}

// Mock check functions
async function checkPrimaryService() {
  throw new Error('Primary service unavailable')
}

async function checkBackupService() {
  throw new Error('Backup service unavailable')
}

async function checkFallbackService() {
  throw new Error('Fallback service unavailable')
}

// Execute example
await checkCompleteFailure()`
    }
  ]

  const notes = [
    'NOR logic is negation of OR logic, succeeds when all Promises fail',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel Promise operation itself',
    'Suitable for scenarios detecting complete system failure',
    'Returns empty array when all Promises fail',
    'When at least one Promise succeeds, throws NOR_ERROR'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.nor()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
            Composite Logic Gate
          </span>
          <span>NOR Logic - Succeeds when all Promises fail</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.nor()</code> method implements NOR (NOT OR) logic gate semantics,
          succeeding when all Promises fail. It returns a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.nor(iterable)\n\`\`\``}
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
          description="Returns a PromiseWithTimer that resolves to empty array when all Promises fail."
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
