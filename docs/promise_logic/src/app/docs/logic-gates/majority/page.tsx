import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function MajorityDocsPage() {
  const parameters = [
    {
      name: 'iterable',
      type: 'Iterable<Promise<T>>',
      description: 'An iterable collection of Promise objects'
    },
    {
      name: 'options',
      type: '{ max?: number }',
      description: 'Optional configuration object. max specifies success threshold (default 0.5, range 0-1)'
    }
  ]

  const behaviors = [
    {
      type: 'success' as const,
      title: 'Success Condition',
      description: 'When number of successful Promises exceeds to threshold (default 0.5), PromiseWithTimer resolves to array of successful results.'
    },
    {
      type: 'error' as const,
      title: 'Failure Condition',
      description: 'When number of successful Promises does not exceed threshold, PromiseWithTimer is rejected.'
    }
  ]

  const errorTypes = [
    {
      type: 'MAJORITY_ERROR',
      description: 'Thrown when number of successful Promises does not exceed the threshold'
    }
  ]

  const examples = [
    {
      title: 'Basic Usage',
      description: 'MAJORITY Logic Example - Succeeds when majority succeed',
      initialCode: `// MAJORITY Logic Example - Succeeds when majority succeed
const results = await PromiseLogic.majority([
  Promise.resolve('Service A succeeded'),
  Promise.resolve('Service B succeeded'),
  Promise.reject('Service C failed'),
  Promise.resolve('Service D succeeded'),
  Promise.reject('Service E failed')
])

console.log('Majority successful services:', results)
return results`
    },
    {
      title: 'Custom Threshold',
      description: 'MAJORITY Logic with custom threshold',
      initialCode: `// MAJORITY Logic with custom threshold
const results = await PromiseLogic.majority([
  Promise.resolve('Service A succeeded'),
  Promise.resolve('Service B succeeded'),
  Promise.reject('Service C failed'),
  Promise.reject('Service D failed')
], { max: 0.4 }) // Need at least 40% success (2 out of 5)

console.log('Met custom threshold:', results)
return results`
    },
    {
      title: 'Error Handling',
      description: 'MAJORITY Logic Example - Majority not reached',
      initialCode: `// MAJORITY Logic Example - Majority not reached
try {
  const results = await PromiseLogic.majority([
    Promise.resolve('Service A succeeded'),
    Promise.reject('Service B failed'),
    Promise.reject('Service C failed'),
    Promise.resolve('Service D succeeded'),
    Promise.reject('Service E failed')
  ])
  console.log('Success:', results)
} catch (error) {
  console.log('Majority not reached:', error)
  return error
}`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const results = await PromiseLogic.majority([
    fetch('/api/node1').then(r => r.json()),
    fetch('/api/node2').then(r => r.json()),
    fetch('/api/node3').then(r => r.json()),
    fetch('/api/node4').then(r => r.json()),
    fetch('/api/node5').then(r => r.json())
  ]).maxTimer(5000) // 5 second timeout
  
  console.log('Got majority consensus within timeout:', results)
  return results
} catch (error) {
  console.log('Timeout or majority not reached:', error.message)
  return error
}`
    },
    {
      title: 'Real Application',
      description: 'Distributed system consensus with timeout',
      initialCode: `// Real Application: Distributed system consensus with timeout
async function achieveConsensus() {
  try {
    // In distributed systems, need majority nodes to agree to reach consensus
    const consensusResults = await PromiseLogic.majority([
      queryNode('node1'),
      queryNode('node2'),
      queryNode('node3'),
      queryNode('node4'),
      queryNode('node5')
    ]).maxTimer(5000) // 5 second timeout
    
    console.log('Nodes reaching consensus:', consensusResults)
    return consensusResults
  } catch (error) {
    if (error.type === 'MAJORITY_ERROR') {
      console.error('Unable to reach consensus: not enough nodes agreed')
      return []
    } else {
      console.error('Timeout or error:', error)
      throw error
    }
  }
}

// Mock node query
async function queryNode(nodeName: string) {
  // Simulate node response
  const success = Math.random() > 0.3
  if (success) {
    return nodeName + ' agreed'
  } else {
    throw new Error(nodeName + ' rejected')
  }
}

// Execute example
await achieveConsensus()`
    }
  ]

  const notes = [
    'MAJORITY logic requires number of successful Promises to exceed threshold (default 0.5)',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel Promise operation itself',
    'Suitable for scenarios requiring majority agreement, such as distributed system consensus, voting systems',
    'Custom threshold can be set via options.max parameter (range 0-1)',
    'Returns array of successful Promise results when condition is met'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.majority()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
            Composite Logic Gate
          </span>
          <span>MAJORITY Logic - Succeeds when majority of Promises succeed</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.majority()</code> method implements MAJORITY (majority voting) logic gate semantics,
          succeeding when number of successful Promises exceeds to threshold. It returns a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.majority(iterable, options?)\n\`\`\``}
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
          description="Returns a PromiseWithTimer that resolves to array of successful Promise results when majority threshold is met."
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
