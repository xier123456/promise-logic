import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function RaceDocsPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.race()',
    tag: 'Core Logic Gate',
    description: 'RACE Logic - Returns the first completed Promise (regardless of success or failure)',
    syntax: 'PromiseLogic.race(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<T>',
    returnDescription: 'Returns a Promise that resolves to the value of the first completed Promise (regardless of success or failure).',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Completion Condition',
        description: 'Returns the value of the first completed Promise, whether that Promise succeeded or failed.'
      },
      {
        type: 'error' as const,
        title: 'Special Case',
        description: 'If the first completed Promise failed, the returned Promise will also be rejected.'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'RACE Logic Example - Returns the first completed Promise',
        initialCode: `// RACE Logic Example - Returns the first completed Promise
const result = await PromiseLogic.race([
  new Promise(resolve => setTimeout(() => resolve('Slow service'), 2000)),
  new Promise(resolve => setTimeout(() => resolve('Fast service'), 500)),
  new Promise((_, reject) => setTimeout(() => reject('Failed service'), 1000))
])

console.log('First completed service:', result)
return result`
      },
      {
        title: 'Error Handling',
        description: 'RACE Logic Example - First completed Promise fails',
        initialCode: `// RACE Logic Example - First completed Promise fails
try {
  const result = await PromiseLogic.race([
    new Promise((_, reject) => setTimeout(() => reject('Fast failure'), 100)),
    new Promise(resolve => setTimeout(() => resolve('Slow success'), 2000))
  ])
  console.log('Success:', result)
} catch (error) {
  console.log('First completed Promise failed:', error)
  return error
}`
      },
      {
        title: 'Real Application',
        description: 'Timeout control',
        initialCode: `// Real Application: Timeout control
async function fetchWithTimeout(url, timeoutMs) {
  try {
    // Race between request and timeout
    const result = await PromiseLogic.race([
      fetch(url).then(r => r.json()),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
      )
    ])
    
    console.log('Request result:', result)
    return result
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}

// Execute example
await fetchWithTimeout('/api/data', 5000)`
      }
    ],
    notes: [
      'RACE logic behaves exactly like standard Promise.race()',
      'Returns the first completed Promise, whether successful or failed',
      'Suitable for timeout control, performance racing scenarios',
      'Note: If the first completed Promise fails, the entire operation will also fail'
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
            The <code>{config.title}</code> method implements RACE (competition) logic gate semantics,
            returning the value of the first completed Promise, whether that Promise succeeded or failed.
            It is equivalent to standard <code>Promise.race()</code>, but provides more intuitive logical semantics.
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