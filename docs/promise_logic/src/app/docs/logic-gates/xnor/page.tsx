import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function XnorDocsPage() {
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
      description: 'When all Promises succeed or all Promises fail, PromiseWithTimer resolves to array of successful results (or empty array if all fail).'
    },
    {
      type: 'error' as const,
      title: 'Failure Condition',
      description: 'When some Promises succeed and some fail, PromiseWithTimer is rejected.'
    }
  ]

  const errorTypes = [
    {
      type: 'XNOR_ERROR',
      description: 'Thrown when some Promises succeed and some fail (partial success)'
    }
  ]

  const examples = [
    {
      title: 'Basic Usage - All Succeed',
      description: 'XNOR Logic Example - Succeeds when all Promises succeed',
      initialCode: `// XNOR Logic Example - Succeeds when all Promises succeed
const result = await PromiseLogic.xnor([
  Promise.resolve('Service A succeeded'),
  Promise.resolve('Service B succeeded'),
  Promise.resolve('Service C succeeded')
])

console.log('All services succeeded, XNOR result:', result)
return result`
    },
    {
      title: 'Basic Usage - All Fail',
      description: 'XNOR Logic Example - Succeeds when all Promises fail',
      initialCode: `// XNOR Logic Example - Succeeds when all Promises fail
const result = await PromiseLogic.xnor([
  Promise.reject('Service A failed'),
  Promise.reject('Service B failed'),
  Promise.reject('Service C failed')
])

console.log('All services failed, XNOR result:', result)
return result`
    },
    {
      title: 'Error Handling',
      description: 'XNOR Logic Failure Example - Partial success',
      initialCode: `// XNOR Logic Failure Example - Partial success
try {
  const result = await PromiseLogic.xnor([
    Promise.resolve('Service A succeeded'),
    Promise.reject('Service B failed'),
    Promise.resolve('Service C succeeded')
  ])
  console.log('Success:', result)
} catch (error) {
  console.log('Partial success, XNOR condition failed:', error)
  return error
}`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const result = await PromiseLogic.xnor([
    fetch('/api/service1').then(r => r.json()),
    fetch('/api/service2').then(r => r.json()),
    fetch('/api/service3').then(r => r.json())
  ]).maxTimer(5000) // 5 second timeout
  
  console.log('Got XNOR result within timeout:', result)
  return result
} catch (error) {
  console.log('Timeout or XNOR condition failed:', error.message)
  return error
}`
    },
    {
      title: 'Real Application',
      description: 'Consistency check with timeout',
      initialCode: `// Real Application: Consistency check with timeout
async function checkConsistency() {
  try {
    // Check if all services have same status (all succeed or all fail)
    const results = await PromiseLogic.xnor([
      checkService('service1'),
      checkService('service2'),
      checkService('service3')
    ]).maxTimer(5000) // 5 second timeout
    
    console.log('Services are consistent:', results)
    return results
  } catch (error) {
    if (error.type === 'XNOR_ERROR') {
      console.log('Services have inconsistent status (partial success)')
      return []
    } else {
      console.error('Timeout or error:', error)
      throw error
    }
  }
}

// Mock service check
async function checkService(serviceName: string) {
  // Simulate random success/failure
  const success = Math.random() > 0.5
  if (success) {
    return serviceName + ' normal'
  } else {
    throw new Error(serviceName + ' abnormal')
  }
}

// Execute example
await checkConsistency()`
    }
  ]

  const notes = [
    'XNOR logic succeeds when all Promises succeed OR all Promises fail',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel Promise operation itself',
    'Suitable for scenarios requiring consistency checking or symmetry verification',
    'Returns array of successful results when all succeed, empty array when all fail',
    'When some succeed and some fail, throws XNOR_ERROR'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.xnor()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
            Composite Logic Gate
          </span>
          <span>XNOR Logic - Succeeds when all Promises succeed or all fail</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.xnor()</code> method implements XNOR (exclusive NOR) logic gate semantics,
          succeeding when all Promises succeed OR all Promises fail. It returns a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.xnor(iterable)\n\`\`\``}
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
          description="Returns a PromiseWithTimer that resolves to array of successful results when all succeed, or empty array when all fail."
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
