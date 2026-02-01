import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExampleData } from '@/types/docs'
import Link from 'next/link'

export default function QuickStartPage() {
  const examples: CodeExampleData[] = [
    {
      title: 'Basic AND Logic',
      description: 'Succeeds when all Promises succeed, equivalent to Promise.all()',
      initialCode: `// Basic AND Logic Example
const results = await PromiseLogic.and([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
])

console.log('All data loaded:', results)
return results`
    },
    {
      title: 'Timeout Control',
      description: 'Use maxTimer to add timeout control',
      initialCode: `// Timeout Control Example
try {
  const results = await PromiseLogic.and([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]).maxTimer(5000) // 5 second timeout
  
  console.log('All data loaded within timeout:', results)
  return results
} catch (error) {
  console.log('Timeout or error:', error.message)
  return error
}`
    },
    {
      title: 'Basic OR Logic',
      description: 'Returns first successful Promise, equivalent to Promise.any()',
      initialCode: `// Basic OR Logic Example
const result = await PromiseLogic.or([
  fetch('/api/primary').then(r => r.json()),
  fetch('/api/backup').then(r => r.json()),
  fetch('/api/fallback').then(r => r.json())
])

console.log('First successful service:', result)
return result`
    },
    {
      title: 'Basic RACE Logic',
      description: 'Returns first completed Promise (regardless of success or failure), equivalent to Promise.race()',
      initialCode: `// Basic RACE Logic Example
const result = await PromiseLogic.race([
  fetch('/api/data').then(r => r.json()),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Request timeout')), 5000)
  )
])

console.log('First completed operation:', result)
return result`
    },
    {
      title: 'Basic ALLSETTLED Logic',
      description: 'Waits for all Promises to complete (regardless of success or failure), equivalent to Promise.allSettled()',
      initialCode: `// Basic ALLSETTLED Logic Example
const results = await PromiseLogic.allSettled([
  fetch('/api/success1').then(r => r.json()),
  fetch('/api/failure').then(r => r.json()),
  fetch('/api/success2').then(r => r.json())
])

// Analyze results
const successful = results.filter(r => r.status === 'fulfilled').map(r => r.value)
const failed = results.filter(r => r.status === 'rejected').map(r => r.reason)

console.log('Successful operations:', successful)
console.log('Failed operations:', failed)

return { successful, failed }`
    },
    {
      title: 'Composite Logic Application',
      description: 'Combine multiple logic gates to implement complex business logic',
      initialCode: `// Composite Logic Application Example
async function complexLogicExample() {
  // Scenario: User registration process
  const registrationSteps = [
    validateUserData(),
    checkUsernameUnique(),
    createUserAccount(),
    sendWelcomeEmail()
  ]

  try {
    // All steps must succeed (AND logic)
    const results = await PromiseLogic.and(registrationSteps).maxTimer(10000)
    console.log('User registration successful:', results)
    return { success: true, data: results }
  } catch (error) {
    // If registration fails, get status of all steps (ALLSETTLED logic)
    const status = await PromiseLogic.allSettled(registrationSteps)
    console.log('User registration failed, step status:', status)
    return { success: false, error, status }
  }
}

// Mock step functions
async function validateUserData() {
  return 'User data validation passed'
}

async function checkUsernameUnique() {
  return 'Username uniqueness check passed'
}

async function createUserAccount() {
  return 'User account created successfully'
}

async function sendWelcomeEmail() {
  return 'Welcome email sent successfully'
}

await complexLogicExample()`
    }
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Start
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
            Getting Started
          </span>
          <span>Quickly master PromiseLogic's core usage through examples</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          Welcome to PromiseLogic! This guide will help you quickly master how to use logic gate semantics 
          to compose Promises through a series of practical examples. Whether you're a beginner or an experienced 
          developer, these examples will help you understand PromiseLogic's core concepts.
        </p>
        <p>
          All PromiseLogic methods return a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality like timeout control via the <code>maxTimer()</code> method.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Prerequisites</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Before You Start</h3>
          <ul className="text-yellow-700 dark:text-yellow-400 text-sm space-y-2">
            <li>• Ensure PromiseLogic is properly installed following <a href="/docs/installation" className="underline">Installation Guide</a></li>
            <li>• Familiar with basic JavaScript Promise concepts</li>
            <li>• Understand fundamentals of asynchronous programming</li>
            <li>• Have your development environment ready (Node.js or browser)</li>
          </ul>
        </div>
      </div>

      {/* Core Concepts Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Core Concepts Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">AND Logic</h3>
            <p className="text-blue-700 dark:text-blue-400 text-sm">
              Succeeds when all Promises succeed, equivalent to standard Promise.all()
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">OR Logic</h3>
            <p className="text-green-700 dark:text-green-400 text-sm">
              Returns first successful Promise, equivalent to Promise.any()
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">RACE Logic</h3>
            <p className="text-purple-700 dark:text-purple-400 text-sm">
              Returns first completed Promise, equivalent to Promise.race()
            </p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">ALLSETTLED Logic</h3>
            <p className="text-indigo-700 dark:text-indigo-400 text-sm">
              Waits for all Promises to complete, equivalent to Promise.allSettled()
            </p>
          </div>
        </div>
      </div>

      {/* PromiseWithTimer */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">PromiseWithTimer</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Timeout Control</h3>
          <p className="text-blue-700 dark:text-blue-400 text-sm mb-4">
            All PromiseLogic methods return a <code>PromiseWithTimer</code> instance which provides the <code>maxTimer()</code> method for timeout control.
          </p>
          <div className="bg-white dark:bg-gray-900 rounded">
            <CodeMarkdown
              content={`\`\`\`javascript
// Use maxTimer to add timeout control
const result = await PromiseLogic.and([
  fetch('/api/data1').then(r => r.json()),
  fetch('/api/data2').then(r => r.json())
]).maxTimer(5000) // 5 second timeout

// If timeout occurs, an error will be thrown
\`\`\``}
            />
          </div>
          <p className="text-blue-700 dark:text-blue-400 text-sm mt-4">
            Note: maxTimer can only detect timeout, cannot cancel Promise operation itself
          </p>
        </div>
      </div>

      {/* Basic Examples */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Basic Examples</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The following examples showcase PromiseLogic's most commonly used logic gate operations.
          Each example can be directly copied and run in your project.
        </p>
        <CodeExamples examples={examples} />
      </div>

      {/* Next Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Next Steps</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Deepen Your Learning</h3>
          <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
            <li>• Check <Link href="/docs/logic-gates/and" className="text-blue-600 dark:text-blue-400 underline">AND Logic Documentation</Link> for detailed usage</li>
            <li>• Explore <Link href="/docs/logic-gates/or" className="text-blue-600 dark:text-blue-400 underline">OR Logic Documentation</Link> to learn service degradation strategies</li>
            <li>• Learn <Link href="/docs/logic-gates/xor" className="text-blue-600 dark:text-blue-400 underline">XOR Logic</Link> to implement mutually exclusive operations</li>
            <li>• Understand <Link href="/docs/utility-methods/allSettled" className="text-blue-600 dark:text-blue-400 underline">ALLSETTLED Logic</Link> for result analysis</li>
          </ul>
        </div>
      </div>

      {/* Important Notes */}
      <NoteSection 
        title="Quick Start Tips"
        items={[
          'All examples can be run directly in browser console or Node.js environment',
          'Recommended to understand basic examples before trying composite logic applications',
          'Remember to add appropriate error handling in real projects',
          'PromiseLogic is fully compatible with existing Promise code and can be migrated gradually',
          'Use maxTimer() to add timeout control to any PromiseLogic operation',
          'If you encounter issues, refer to detailed API documentation or submit an Issue'
        ]}
      />
    </div>
  )
}
