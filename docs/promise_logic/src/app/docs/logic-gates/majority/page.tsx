import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function MajorityDocsPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.majority()',
    tag: 'Composite Logic Gate',
    description: 'MAJORITY Logic - Majority voting logic, succeeds when more than half of Promises succeed',
    syntax: 'PromiseLogic.majority(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<T[]>',
    returnDescription: 'Returns a Promise that resolves to an array of successful Promises when number of successes exceeds half.',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Success Condition',
        description: 'When number of successful Promises exceeds half, returned Promise resolves to array of successful Promises.'
      },
      {
        type: 'error' as const,
        title: 'Failure Condition',
        description: 'When number of successful Promises does not exceed half, returned Promise is rejected.'
      }
    ],
    examples: [
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
        title: 'Real Application',
        description: 'Distributed system consensus',
        initialCode: `// Real Application: Distributed system consensus
async function achieveConsensus() {
  try {
    // In distributed systems, need majority nodes to agree to reach consensus
    const consensusResults = await PromiseLogic.majority([
      queryNode('node1'),
      queryNode('node2'),
      queryNode('node3'),
      queryNode('node4'),
      queryNode('node5')
    ])
    
    console.log('Nodes reaching consensus:', consensusResults)
    return consensusResults
  } catch (error) {
    console.error('Unable to reach consensus:', error)
    throw error
  }
}

// Mock node query
async function queryNode(nodeName) {
  // Simulate node response
  const success = Math.random() > 0.4
  if (success) {
    return \`\${nodeName} 'agreed'\`
  } else {
    throw new Error(\`\${nodeName} 'rejected'\`)
  }
}

// Execute example
await achieveConsensus()`
      }
    ],
    notes: [
      'MAJORITY logic requires number of successful Promises to exceed half',
      'Suitable for scenarios requiring majority agreement, such as distributed system consensus, voting systems',
      'Returns array of successful Promises for easy subsequent processing',
      'Can be used to build highly fault-tolerant distributed algorithms'
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
            The <code>{config.title}</code> method implements MAJORITY (majority voting) logic gate semantics,
            succeeding when number of successful Promises exceeds half, suitable for distributed system consensus and voting decision scenarios.
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