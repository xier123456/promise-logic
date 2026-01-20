import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function NandDocsPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.nand()',
    tag: 'Composite Logic Gate',
    description: 'NAND Logic - NOT AND logic, succeeds when at least one Promise fails',
    syntax: 'PromiseLogic.nand(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<boolean>',
    returnDescription: 'Returns a Promise that resolves to true when at least one Promise fails, otherwise resolves to false.',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Success Condition',
        description: 'When at least one Promise fails, the returned Promise resolves to true.'
      },
      {
        type: 'error' as const,
        title: 'Failure Condition',
        description: 'When all Promises succeed, the returned Promise resolves to false.'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'NAND Logic Example - Succeeds when at least one fails',
        initialCode: `// NAND Logic Example - Succeeds when at least one fails
const result = await PromiseLogic.nand([
  Promise.resolve('Service A succeeded'),
  Promise.reject('Service B failed'),
  Promise.resolve('Service C succeeded')
])

console.log('NAND result:', result)
return result`
      },
      {
        title: 'Error Handling',
        description: 'NAND Logic Example - All Promises succeed',
        initialCode: `// NAND Logic Example - All Promises succeed
const result = await PromiseLogic.nand([
  Promise.resolve('Service A succeeded'),
  Promise.resolve('Service B succeeded'),
  Promise.resolve('Service C succeeded')
])

console.log('All services succeeded, NAND result is false:', result)
return result`
      },
      {
        title: 'Real Application',
        description: 'Fault tolerance detection',
        initialCode: `// Real Application: Fault tolerance detection
async function checkSystemHealth() {
  // Check system health status, issue warning when at least one service fails
  const hasFailure = await PromiseLogic.nand([
    checkDatabase(),
    checkCache(),
    checkExternalAPI()
  ])
  
  if (hasFailure) {
    console.log('System has failures, needs checking')
    // Send alert notification
  } else {
    console.log('System running normally')
  }
  
  return hasFailure
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
await checkSystemHealth()`
      }
    ],
    notes: [
      'NAND logic is the negation of AND logic, outputs true when at least one input is false',
      'Suitable for scenarios requiring system failure or anomaly detection',
      'Returns boolean value for easy conditional judgment',
      'Can be used to build more complex logic judgments'
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
            The <code>{config.title}</code> method implements NAND (NOT AND) logic gate semantics,
            succeeding when at least one Promise fails, suitable for fault tolerance detection and anomaly monitoring scenarios.
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