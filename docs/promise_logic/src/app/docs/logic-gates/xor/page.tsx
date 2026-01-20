import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function XorDocsPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.xor()',
    tag: 'Core Logic Gate',
    description: 'XOR Logic - Succeeds when exactly one Promise succeeds',
    syntax: 'PromiseLogic.xor(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<T>',
    returnDescription: 'Returns a Promise that resolves to the value of the successful Promise when exactly one Promise succeeds.',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Success Condition',
        description: 'When exactly one Promise resolves successfully, the returned Promise resolves to that Promise\'s value.'
      },
      {
        type: 'error' as const,
        title: 'Failure Condition',
        description: 'When no Promise succeeds or more than one Promise succeeds, the returned Promise is rejected.'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'XOR Logic Example - Succeeds when exactly one succeeds',
        initialCode: `// XOR Logic Example - Succeeds when exactly one succeeds
const result = await PromiseLogic.xor([
  Promise.reject('Service A failed'),
  Promise.resolve('Service B succeeded'),
  Promise.reject('Service C failed')
])

console.log('Only successful service:', result)
return result`
      },
      {
        title: 'Error Handling',
        description: 'XOR Logic Failure Example - Multiple Promises succeed',
        initialCode: `// XOR Logic Failure Example - Multiple Promises succeed
try {
  const result = await PromiseLogic.xor([
    Promise.resolve('Service A succeeded'),
    Promise.resolve('Service B succeeded'),
    Promise.reject('Service C failed')
  ])
  console.log('Success:', result)
} catch (error) {
  console.log('Multiple services succeeded, does not meet XOR condition:', error)
  return error
}`
      },
      {
        title: 'Real Application',
        description: 'Exclusive operation validation',
        initialCode: `// Real Application: Exclusive operation validation
async function validateExclusiveOperation() {
  try {
    // Validate that only one operation can execute successfully
    const result = await PromiseLogic.xor([
      performOperationA(),
      performOperationB(),
      performOperationC()
    ])
    
    console.log('Only successful operation:', result)
    return result
  } catch (error) {
    console.error('Operation conflict: multiple operations succeeded simultaneously', error)
    throw error
  }
}

// Mock operation functions
async function performOperationA() {
  return 'Operation A completed'
}

async function performOperationB() {
  throw new Error('Operation B failed')
}

async function performOperationC() {
  throw new Error('Operation C failed')
}

// Execute example
await validateExclusiveOperation()`
      }
    ],
    notes: [
      'XOR logic requires exactly one Promise to succeed, otherwise it is considered a failure',
      'Suitable for scenarios requiring exclusive operations, such as resource locking, uniqueness validation',
      'When no Promise succeeds, returns all Promise rejection reasons',
      'When multiple Promises succeed, returns an error indicating multiple operations succeeded simultaneously'
    ]
  }

  return (
      <div className=' w-[90%] sm:w-[75%] mx-auto'>
        {/* Page Header */}
        <div className="mb-8 ">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {config.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
              {config.tag}
            </span>
            <span>{config.description}</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
          <p>
            The <code>{config.title}</code> method implements XOR (exclusive OR) logic gate semantics,
            succeeding when exactly one Promise succeeds, suitable for scenarios requiring exclusive operations.
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