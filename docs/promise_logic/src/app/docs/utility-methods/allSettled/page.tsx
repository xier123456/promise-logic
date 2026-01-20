import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function AllSettledDocsPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.allSettled()',
    tag: 'Core Logic Gate',
    description: 'ALLSETTLED Logic - Waits for all Promises to complete (regardless of success or failure)',
    syntax: 'PromiseLogic.allSettled(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<PromiseSettledResult<T>[]>',
    returnDescription: 'Returns a Promise that resolves to an array of completion status of all Promises, containing success or failure information for each Promise.',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Completion Condition',
        description: 'Waits for all Promises to complete (regardless of success or failure), returns an array containing the status of each Promise.'
      },
      {
        type: 'error' as const,
        title: 'Special Case',
        description: 'The allSettled method never fails, always returns a successful result array.'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'ALLSETTLED Logic Example - Waits for all Promises to complete',
        initialCode: `// ALLSETTLED Logic Example - Waits for all Promises to complete
const results = await PromiseLogic.allSettled([
  Promise.resolve('Service A succeeded'),
  Promise.reject('Service B failed'),
  Promise.resolve('Service C succeeded'),
  Promise.reject('Service D failed')
])

console.log('All services completion status:')
results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(\`Service \${index + 1}: Success - \${result.value}\`)
  } else {
    console.log(\`Service \${index + 1}: Failed - \${result.reason}\`)
  }
})

return results`
      },
      {
        title: 'Result Processing',
        description: 'ALLSETTLED Logic Example - Process completion results',
        initialCode: `// ALLSETTLED Logic Example - Process completion results
const results = await PromiseLogic.allSettled([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/invalid').then(r => r.json())
])

// Separate successful and failed results
const successful = results.filter(r => r.status === 'fulfilled').map(r => r.value)
const failed = results.filter(r => r.status === 'rejected').map(r => r.reason)

console.log('Successful results:', successful)
console.log('Failed results:', failed)

return { successful, failed }`
      },
      {
        title: 'Real Application',
        description: 'Batch operation result analysis',
        initialCode: `// Real Application: Batch operation result analysis
async function analyzeBatchOperations() {
  const operations = [
    { id: 1, name: 'User Creation', action: createUser },
    { id: 2, name: 'Order Processing', action: processOrder },
    { id: 3, name: 'Inventory Update', action: updateInventory },
    { id: 4, name: 'Payment Processing', action: processPayment }
  ]

  // Execute all operations, regardless of success or failure
  const results = await PromiseLogic.allSettled(
    operations.map(op => op.action())
  )

  // Analyze results
  const analysis = {
    total: results.length,
    successful: results.filter(r => r.status === 'fulfilled').length,
    failed: results.filter(r => r.status === 'rejected').length,
    details: results.map((result, index) => ({
      operation: operations[index],
      status: result.status,
      result: result.status === 'fulfilled' ? result.value : result.reason
    }))
  }

  console.log('Batch operation analysis:', analysis)
  return analysis
}

// Mock operation functions
async function createUser() {
  return 'User created successfully'
}

async function processOrder() {
  throw new Error('Order processing failed')
}

async function updateInventory() {
  return 'Inventory updated successfully'
}

async function processPayment() {
  return 'Payment processed successfully'
}

// Execute example
await analyzeBatchOperations()`
      }
    ],
    notes: [
      'ALLSETTLED logic behaves exactly like standard Promise.allSettled()',
      'Always returns successful results, containing completion status of all Promises',
      'Suitable for scenarios requiring knowledge of all operation results, such as batch operations, result analysis',
      'Returned array contains status (fulfilled or rejected) and corresponding value or reason for each Promise'
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
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
              {config.tag}
            </span>
            <span>{config.description}</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
          <p>
            The <code>{config.title}</code> method implements ALLSETTLED (all completed) logic gate semantics,
            waiting for all Promises to complete (regardless of success or failure), returning an array containing the status of each Promise.
            It is equivalent to standard <code>Promise.allSettled()</code>, but provides more intuitive logical semantics.
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