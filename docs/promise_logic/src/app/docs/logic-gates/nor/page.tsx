import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function NorDocsPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.nor()',
    tag: 'Composite Logic Gate',
    description: 'NOR Logic - NOT OR logic, succeeds when all Promises fail',
    syntax: 'PromiseLogic.nor(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<boolean>',
    returnDescription: 'Returns a Promise that resolves to true when all Promises fail, otherwise resolves to false.',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Success Condition',
        description: 'When all Promises fail, returned Promise resolves to true.'
      },
      {
        type: 'error' as const,
        title: 'Failure Condition',
        description: 'When at least one Promise succeeds, returned Promise resolves to false.'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'NOR Logic Example - Succeeds when all Promises fail',
        initialCode: `// NOR Logic Example - Succeeds when all Promises fail
const result = await PromiseLogic.nor([
  Promise.reject('Service A failed'),
  Promise.reject('Service B failed'),
  Promise.reject('Service C failed')
])

console.log('NOR result:', result)
return result`
      },
      {
        title: 'Error Handling',
        description: 'NOR Logic Example - At least one succeeds',
        initialCode: `// NOR Logic Example - At least one succeeds
const result = await PromiseLogic.nor([
  Promise.reject('Service A failed'),
  Promise.resolve('Service B succeeded'),
  Promise.reject('Service C failed')
])

console.log('Service succeeded, NOR result is false:', result)
return result`
      },
      {
        title: 'Real Application',
        description: 'Complete system failure detection',
        initialCode: `// Real Application: Complete system failure detection
async function checkCompleteFailure() {
  // Check if all services have failed
  const completeFailure = await PromiseLogic.nor([
    checkPrimaryService(),
    checkBackupService(),
    checkFallbackService()
  ])
  
  if (completeFailure) {
    console.log('All services failed, system completely unavailable')
    // Trigger emergency recovery process
  } else {
    console.log('System still has available services')
  }
  
  return completeFailure
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
    ],
    notes: [
      'NOR logic is negation of OR logic, outputs true when all inputs are false',
      'Suitable for scenarios detecting complete system failure',
      'Returns boolean value for emergency situation judgment',
      'Can be used to build disaster recovery mechanisms'
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
            The <code>{config.title}</code> method implements NOR (NOT OR) logic gate semantics,
            succeeding when all Promises fail, suitable for complete system failure detection and disaster recovery scenarios.
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