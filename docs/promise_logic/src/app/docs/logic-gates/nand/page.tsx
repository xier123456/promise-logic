import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function NandDocsPage() {
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
      description: 'When not all Promises succeed (at least one fails), PromiseWithTimer resolves to array of successful Promise results.'
    },
    {
      type: 'error' as const,
      title: 'Failure Condition',
      description: 'When all Promises succeed, PromiseWithTimer is rejected.'
    }
  ]

  const errorTypes = [
    {
      type: 'NAND_ERROR',
      description: 'Thrown when all Promises succeed'
    }
  ]

  const examples = [
    {
      title: 'Basic Usage',
      description: 'NAND Logic Example - Succeeds when not all succeed',
      initialCode: `// NAND Logic Example - Succeeds when not all succeed
const result = await PromiseLogic.nand([
  Promise.resolve('Service A succeeded'),
  Promise.reject('Service B failed'),
  Promise.resolve('Service C succeeded')
])

console.log('Successful results:', result)
return result`
    },
    {
      title: 'Error Handling',
      description: 'NAND Logic Failure Example - All Promises succeed',
      initialCode: `// NAND Logic Failure Example - All Promises succeed
try {
  const result = await PromiseLogic.nand([
    Promise.resolve('Service A succeeded'),
    Promise.resolve('Service B succeeded'),
    Promise.resolve('Service C succeeded')
  ])
  console.log('Success:', result)
} catch (error) {
  console.log('All services succeeded, NAND condition failed:', error)
  return error
}`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const result = await PromiseLogic.nand([
    fetch('/api/service1').then(r => r.json()),
    fetch('/api/service2').then(r => r.json()),
    fetch('/api/service3').then(r => r.json())
  ]).maxTimer(5000) // 5 second timeout
  
  console.log('Got successful results within timeout:', result)
  return result
} catch (error) {
  console.log('Timeout or all services succeeded:', error.message)
  return error
}`
    },
    {
      title: 'Real Application',
      description: 'Partial success detection with timeout',
      initialCode: `// Real Application: Partial success detection with timeout
async function checkPartialSuccess() {
  try {
    // Check if not all services succeed (at least one has failure)
    const results = await PromiseLogic.nand([
      checkDatabase(),
      checkCache(),
      checkExternalAPI()
    ]).maxTimer(5000) // 5 second timeout
    
    console.log('Partial success detected, successful results:', results)
    return results
  } catch (error) {
    if (error.type === 'NAND_ERROR') {
      console.log('All services succeeded - no failures detected')
      return []
    } else {
      console.error('Timeout or error:', error)
      throw error
    }
  }
}

// Mock check functions
async function checkDatabase() {
  return 'Database normal'
}

async function checkCache() {
  throw new Error('Cache service abnormal')
}

async function checkExternalAPI() {
  return 'External API normal'
}

// Execute example
await checkPartialSuccess()`
    }
  ]

  const notes = [
    'NAND logic is negation of AND logic, succeeds when not all Promises succeed',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel Promise operation itself',
    'Suitable for scenarios requiring partial success detection or failure monitoring',
    'When all Promises succeed, throws NAND_ERROR',
    'Returns array of successful Promise results when condition is met'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.nand()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
            Composite Logic Gate
          </span>
          <span>NAND Logic - Succeeds when not all Promises succeed</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.nand()</code> method implements NAND (NOT AND) logic gate semantics,
          succeeding when not all Promises succeed. It returns a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.nand(iterable)\n\`\`\``}
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
          description="Returns a PromiseWithTimer that resolves to array of successful Promise results when not all succeed."
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
