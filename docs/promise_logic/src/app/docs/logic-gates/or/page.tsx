import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function OrDocsPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.or()',
    tag: 'Core Logic Gate',
    description: 'OR Logic - Returns the first successful Promise',
    syntax: 'PromiseLogic.or(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<T>',
    returnDescription: 'Returns a Promise that resolves to the value of the first successful Promise.',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Success Condition',
        description: 'Returns the value of the first Promise that resolves successfully.'
      },
      {
        type: 'error' as const,
        title: 'Failure Condition',
        description: 'When all input Promises are rejected, the returned Promise is rejected with an AggregateError containing all rejection reasons.'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'OR Logic Example - Returns the first successful Promise',
        initialCode: `// OR Logic Example - Returns the first successful Promise
const result = await PromiseLogic.or([
  Promise.reject('Service A unavailable'),
  Promise.resolve('Service B responded successfully'),
  Promise.resolve('Service C responded successfully')
])

console.log('Success result:', result)
return result`
      },
      {
        title: 'Error Handling',
        description: 'OR Logic Failure Example - All Promises fail',
        initialCode: `// OR Logic Failure Example - All Promises fail
try {
  const result = await PromiseLogic.or([
    Promise.reject('Service A failed'),
    Promise.reject('Service B failed'),
    Promise.reject('Service C failed')
  ])
  console.log('Success:', result)
} catch (error) {
  console.log('All services failed:', error)
  return error
}`
      },
      {
        title: 'Real Application',
        description: 'Service degradation strategy',
        initialCode: `// Real Application: Service degradation strategy
async function fetchUserProfile() {
  try {
    // Try multiple user service endpoints, return the first successful one
    const profile = await PromiseLogic.or([
      fetch('/api/users/primary').then(r => r.json()),
      fetch('/api/users/backup').then(r => r.json()),
      fetch('/api/users/fallback').then(r => r.json())
    ])
    
    console.log('User profile:', profile)
    return profile
  } catch (error) {
    console.error('All user services unavailable:', error)
    throw error
  }
}

// Execute example
await fetchUserProfile()`
      }
    ],
    notes: [
      'OR logic behaves similarly to standard Promise.any(), but provides more intuitive logical semantics',
      'Suitable for scenarios requiring service degradation or failover',
      'When all Promises fail, returns AggregateError containing all failure reasons',
      'For scenarios where all operations must succeed, consider using PromiseLogic.and()'
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
            The <code>{config.title}</code> method implements OR logic gate semantics, returning the value of the first Promise that resolves successfully.
            It is equivalent to standard <code>Promise.any()</code>, but provides more intuitive logical semantics.
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