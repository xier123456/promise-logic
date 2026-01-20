import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function XnorDocsPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.xnor()',
    tag: 'Composite Logic Gate',
    description: 'XNOR Logic - Exclusive NOR logic, succeeds when number of successful Promises is even',
    syntax: 'PromiseLogic.xnor(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<boolean>',
    returnDescription: 'Returns a Promise that resolves to true when the number of successful Promises is even, otherwise resolves to false.',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Success Condition',
        description: 'When the number of successful Promises is even, returned Promise resolves to true.'
      },
      {
        type: 'error' as const,
        title: 'Failure Condition',
        description: 'When the number of successful Promises is odd, returned Promise resolves to false.'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'XNOR Logic Example - Succeeds when even number succeed',
        initialCode: `// XNOR Logic Example - Succeeds when even number succeed
const result = await PromiseLogic.xnor([
  Promise.resolve('Service A succeeded'),
  Promise.reject('Service B failed'),
  Promise.resolve('Service C succeeded'),
  Promise.reject('Service D failed')
])

console.log('XNOR result:', result)
return result`
      },
      {
        title: 'Error Handling',
        description: 'XNOR Logic Example - Odd number succeed',
        initialCode: `// XNOR Logic Example - Odd number succeed
const result = await PromiseLogic.xnor([
  Promise.resolve('Service A succeeded'),
  Promise.reject('Service B failed'),
  Promise.resolve('Service C succeeded')
])

console.log('Odd number succeeded, XNOR result is false:', result)
return result`
      },
      {
        title: 'Real Application',
        description: 'Load balancing check',
        initialCode: `// Real Application: Load balancing check
async function checkLoadBalance() {
  // Check if the number of successful services is even, used for load balancing verification
  const isBalanced = await PromiseLogic.xnor([
    checkServer('server1'),
    checkServer('server2'),
    checkServer('server3'),
    checkServer('server4')
  ])
  
  if (isBalanced) {
    console.log('Load balance normal, even number of successful services')
  } else {
    console.log('Load unbalanced, odd number of successful services')
  }
  
  return isBalanced
}

// Mock server check
async function checkServer(serverName: string) {
  // Simulate random success/failure
  const success = Math.random() > 0.3
  if (success) {
    return \`\${serverName} normal\`
  } else {
    throw new Error(\`\${serverName} abnormal\`)
  }
}

// Execute example
await checkLoadBalance()`
      }
    ],
    notes: [
      'XNOR logic is negation of XOR logic, outputs true when number of successes is even',
      'Suitable for scenarios requiring parity checking, symmetry verification, or load balancing',
      'Returns boolean value for easy symmetry verification',
      'Can be used to build complex symmetry checking logic'
    ]
  }

  return (
      <div className="w-[90%] sm:w-[75%] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {config.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
              {config.tag}
            </span>
            <span>{config.description}</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
          <p>
            The <code>{config.title}</code> method implements XNOR (exclusive NOR) logic gate semantics,
            succeeding when the number of successful Promises is even, suitable for symmetry checking and load balancing verification scenarios.
          </p>
        </div>

        {/* Syntax */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>
            <CodeMarkdown
              content={`\`\`\`javascript\n ${config.syntax}\n\`\`\``}
            />
        </div>

        {/* Parameters */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Parameters</h2>
          <ParameterTable parameters={config.parameters} />
        </div>

        {/* Return Value */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Return Value</h2>
          <ReturnValue 
            description={config.returnDescription}
            type={config.returnType}
          />
        </div>

        {/* Behavior */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Behavior</h2>
          <BehaviorSection behaviors={config.behaviors} />
        </div>

        {/* Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Examples</h2>
          <CodeExamples examples={config.examples} />
        </div>

        {/* Important Notes */}
        <NoteSection title="Important Notes" items={config.notes} />
      </div>
  )
}