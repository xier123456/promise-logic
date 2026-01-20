import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function AllFulfilledPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.allFulfilled()',
    tag: 'Extended Feature',
    description: 'Get all successful results, always returns a successful result array',
    syntax: 'PromiseLogic.allFulfilled(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<T[]>',
    returnDescription: 'Always returns a Promise that resolves to an array of values from all successful Promises (may be empty).',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Success Condition',
        description: 'Waits for all Promises to complete, then returns an array of values from all successful Promises.'
      },
      {
        type: 'error' as const,
        title: 'Special Case',
        description: 'The allFulfilled method never fails, even if all Promises fail it will return an empty array.'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'Get all successful operation results',
        initialCode: `// Get all successful operation results
import { PromiseLogic } from 'promise-logic';

async function getAllSuccessfulResults() {
  const results = await PromiseLogic.allFulfilled([
    Promise.resolve('Operation 1 succeeded'),
    Promise.reject('Operation 2 failed'),
    Promise.resolve('Operation 3 succeeded'),
    Promise.reject('Operation 4 failed')
  ]);

  console.log('Successful operations:', results);
  console.log('Success count:', results.length);
  return results;
}

await getAllSuccessfulResults();`
      },
      {
        title: 'Batch Operation Analysis',
        description: 'Analyze batch operation execution',
        initialCode: `// Analyze batch operation execution
import { PromiseLogic } from 'promise-logic';

async function analyzeBatchOperations() {
  const operations = [
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/invalid').then(r => r.json()), // This will fail
    fetch('/api/comments').then(r => r.json())
  ];

  const successfulResults = await PromiseLogic.allFulfilled(operations);
  
  console.log('Batch operation analysis:');
  console.log('Total operations:', operations.length);
  console.log('Successful operations:', successfulResults.length);
  console.log('Success rate:', (successfulResults.length / operations.length * 100).toFixed(1) + '%');
  console.log('Successful results:', successfulResults);
  
  return {
    total: operations.length,
    successful: successfulResults.length,
    successRate: successfulResults.length / operations.length,
    results: successfulResults
  };
}

await analyzeBatchOperations();`
      },
      {
        title: 'Fault-Tolerant Data Processing',
        description: 'Gracefully handle partially failed data loading',
        initialCode: `// Gracefully handle partially failed data loading
import { PromiseLogic } from 'promise-logic';

async function loadUserDataWithFallback(userIds) {
  // Load multiple user data in parallel
  const userPromises = userIds.map(id => 
    fetch(/api/users/{id})
      .then(r => {
        if (!r.ok) throw new Error('User '+id+' loading failed');
        return r.json();
      })
      .catch(error => {
        console.warn('User '+id+' loading failed:', error.message);
        throw error; // Continue throwing error, let allFulfilled filter
      })
  );

  // Get all successfully loaded user data
  const successfulUsers = await PromiseLogic.allFulfilled(userPromises);
  
  console.log('Number of successfully loaded users:', successfulUsers.length);
  console.log('Number of failed user loads:', userIds.length - successfulUsers.length);
  
  // Even if some user data loading fails, can continue processing successful data
  if (successfulUsers.length > 0) {
    console.log('Available user data:', successfulUsers);
    // Proceed with further processing...
  } else {
    console.log('All user data loading failed, need fallback handling');
  }
  
  return successfulUsers;
}

// Execute example
const userIds = ['user1', 'user2', 'user3', 'user4'];
await loadUserDataWithFallback(userIds);`
      }
    ],
    notes: [
      'allFulfilled always returns successful results, even if all Promises fail it returns an empty array',
      'Suitable for scenarios where you need to get successful results without caring about failures',
      'Can be combined with other logic gates to build more complex control flows',
      'Returned array only contains values from successful Promises, no failure information'
    ]
  }

  return (
      <div className="w-[90%] sm:w-[75%] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
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
            The <code>{config.title}</code> method is used to get results from all successful Promises,
            regardless of how many Promises fail, it always returns a successful result array.
          </p>
          <p>
            This method is particularly suitable for applications that need to gracefully handle partial failure scenarios,
            such as batch data loading, service health checks, fault-tolerant system design, etc.
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

        {/* Difference from allSettled */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Difference from allSettled</h2>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Key Differences</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">allFulfilled</h4>
                <ul className="text-yellow-700 dark:text-yellow-400 text-sm space-y-1">
                  <li>• Only returns successful results</li>
                  <li>• Return type: <code>T[]</code></li>
                  <li>• Does not contain failure information</li>
                  <li>• Suitable for scenarios that only need successful data</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">allSettled</h4>
                <ul className="text-yellow-700 dark:text-yellow-400 text-sm space-y-1">
                  <li>• Returns status of all operations</li>
                  <li>• Return type: <code>PromiseSettledResult&lt;T&gt;[]</code></li>
                  <li>• Contains success and failure information</li>
                  <li>• Suitable for scenarios requiring complete status analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <NoteSection title="Important Notes" items={config.notes} />
      </div>
  )
}