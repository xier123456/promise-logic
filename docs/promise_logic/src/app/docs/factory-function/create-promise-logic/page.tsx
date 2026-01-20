import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'

export default function CreatePromiseLogicPage() {
  const parameters = [
    {
      name: 'options',
      type: 'CreatePromiseLogicOptions',
      description: 'Configuration options for customizing instance behavior and naming'
    }
  ]

  const optionProperties = [
    {
      name: 'prefix',
      type: 'string',
      description: 'Method name prefix, e.g. "async" will generate asyncAnd, asyncOr, etc.'
    },
    {
      name: 'suffix',
      type: 'string',
      description: 'Method name suffix, e.g. "Logic" will generate andLogic, orLogic, etc.'
    },
    {
      name: 'rename',
      type: 'Record<string, string>',
      description: 'Custom rename mapping, e.g. { and: "conjunction", or: "disjunction" }'
    }
  ]

  const behaviors = [
    {
      type: 'success' as const,
      title: 'Creation Successful',
      description: 'Successfully creates a custom PromiseLogic instance containing configured methods.'
    },
    {
      type: 'error' as const,
      title: 'Special Case',
      description: 'The createPromiseLogic method never fails, always returns a valid PromiseLogic instance.'
    }
  ]

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Create default PromiseLogic instance',
      initialCode: `// Create default PromiseLogic instance
import { createPromiseLogic } from 'promise-logic';

async function basicExample() {
  // Create default instance (same as PromiseLogic)
  const logic = createPromiseLogic();
  
  // Use default method names
  const results = await logic.and([
    Promise.resolve('Operation 1'),
    Promise.resolve('Operation 2')
  ]);
  
  console.log('AND result:', results);
  return results;
}

await basicExample();`
    },
    {
      title: 'Add Prefix',
      description: 'Create instance with prefixed method names',
      initialCode: `// Create instance with prefixed method names
import { createPromiseLogic } from 'promise-logic';

async function prefixExample() {
  // Create instance with "async" prefix
  const asyncLogic = createPromiseLogic({ prefix: 'async' });
  
  // Use method names: asyncAnd, asyncOr, asyncXor, etc.
  const result = await asyncLogic.asyncOr([
    Promise.reject('Service A failed'),
    Promise.resolve('Service B succeeded')
  ]);
  
  console.log('asyncOr result:', result);
  
  // Can also use other methods
  const majorityResult = await asyncLogic.asyncMajority([
    Promise.resolve('Node 1'),
    Promise.resolve('Node 2'),
    Promise.reject('Node 3 failed')
  ]);
  
  console.log('asyncMajority result:', majorityResult);
  
  return { orResult: result, majorityResult };
}

await prefixExample();`
    },
    {
      title: 'Add Suffix',
      description: 'Create instance with suffixed method names',
      initialCode: `// Create instance with suffixed method names
import { createPromiseLogic } from 'promise-logic';

async function suffixExample() {
  // Create instance with "Logic" suffix
  const logicUtils = createPromiseLogic({ suffix: 'Logic' });
  
  // Use method names: andLogic, orLogic, xorLogic, etc.
  const result = await logicUtils.xorLogic([
    Promise.reject('Option A failed'),
    Promise.resolve('Option B succeeded'),
    Promise.reject('Option C failed')
  ]);
  
  console.log('xorLogic result:', result);
  
  // Use extended features
  const fulfilled = await logicUtils.allFulfilledLogic([
    Promise.resolve('Success 1'),
    Promise.reject('Failure'),
    Promise.resolve('Success 2')
  ]);
  
  console.log('allFulfilledLogic result:', fulfilled);
  
  return { xorResult: result, fulfilledResults: fulfilled };
}

await suffixExample();`
    },
    {
      title: 'Custom Rename',
      description: 'Fully customize method names',
      initialCode: `// Fully customize method names
import { createPromiseLogic } from 'promise-logic';

async function renameExample() {
  // Create instance with custom naming
  const customLogic = createPromiseLogic({
    rename: {
      and: 'conjunction',
      or: 'disjunction',
      xor: 'exclusiveOr',
      nand: 'notConjunction',
      nor: 'notDisjunction',
      allFulfilled: 'getSuccesses',
      allRejected: 'getFailures'
    }
  });
  
  // Use custom method names
  const conjunctionResult = await customLogic.conjunction([
    Promise.resolve('Validation 1 passed'),
    Promise.resolve('Validation 2 passed')
  ]);
  
  console.log('conjunction result:', conjunctionResult);
  
  const disjunctionResult = await customLogic.disjunction([
    Promise.reject('Primary service failed'),
    Promise.resolve('Backup service succeeded')
  ]);
  
  console.log('disjunction result:', disjunctionResult);
  
  const successes = await customLogic.getSuccesses([
    Promise.resolve('Data 1'),
    Promise.reject('Error'),
    Promise.resolve('Data 2')
  ]);
  
  console.log('getSuccesses result:', successes);
  
  return { 
    conjunction: conjunctionResult, 
    disjunction: disjunctionResult,
    successes 
  };
}

await renameExample();`
    },
    {
      title: 'Combined Configuration',
      description: 'Combine prefix, suffix, and rename',
      initialCode: `// Combine prefix, suffix, and rename
import { createPromiseLogic } from 'promise-logic';

async function combinedExample() {
  // Create complex custom instance
  const advancedLogic = createPromiseLogic({
    prefix: 'async',
    suffix: 'Logic',
    rename: { 
      and: 'conjunction',
      or: 'disjunction',
      race: 'firstCompleted'
    }
  });
  
  // Use method names: asyncConjunctionLogic, asyncDisjunctionLogic, asyncFirstCompletedLogic
  const conjunctionResult = await advancedLogic.asyncConjunctionLogic([
    Promise.resolve('Step 1'),
    Promise.resolve('Step 2')
  ]);
  
  console.log('asyncConjunctionLogic result:', conjunctionResult);
  
  const firstResult = await advancedLogic.asyncFirstCompletedLogic([
    new Promise(resolve => setTimeout(() => resolve('Slow'), 2000)),
    new Promise(resolve => setTimeout(() => resolve('Fast'), 500))
  ]);
  
  console.log('asyncFirstCompletedLogic result:', firstResult);
  
  // Methods not renamed will use prefix and suffix
  const xorResult = await advancedLogic.asyncXorLogic([
    Promise.reject('Option A'),
    Promise.resolve('Option B'),
    Promise.reject('Option C')
  ]);
  
  console.log('asyncXorLogic result:', xorResult);
  
  return { 
    conjunction: conjunctionResult, 
    firstCompleted: firstResult,
    xor: xorResult 
  };
}

await combinedExample();`
    },
    {
      title: 'Real Application',
      description: 'Organize different logic groups in project',
      initialCode: `// Organize different logic groups in project
import { createPromiseLogic } from 'promise-logic';

// Create different logic groups for different business scenarios
const validationLogic = createPromiseLogic({
  prefix: 'validate',
  rename: { 
    and: 'all',
    or: 'any',
    xor: 'exactlyOne'
  }
});

const dataLogic = createPromiseLogic({
  prefix: 'data',
  rename: {
    and: 'loadAll',
    or: 'loadAny',
    allFulfilled: 'getSuccessful',
    allRejected: 'getFailed'
  }
});

const controlLogic = createPromiseLogic({
  prefix: 'control',
  rename: {
    race: 'withTimeout',
    allSettled: 'waitAll'
  }
});

async function useOrganizedLogic() {
  // Validation logic group
  const isValid = await validationLogic.validateAll([
    validateEmail('test@example.com'),
    validatePassword('secure123'),
    validateUsername('user123')
  ]);
  
  console.log('Validation result:', isValid);
  
  // Data logic group
  const successfulData = await dataLogic.dataGetSuccessful([
    loadUserData(),
    loadPostData(),
    loadCommentData()
  ]);
  
  console.log('Successfully loaded data:', successfulData);
  
  // Control logic group
  const result = await controlLogic.controlWithTimeout([
    fetchData(),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
  ]);
  
  console.log('Operation result with timeout:', result);
  
  return { isValid, successfulData, result };
}

// Mock functions
async function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function validatePassword(password) {
  return password.length >= 8;
}

async function validateUsername(username) {
  return username.length >= 3;
}

async function loadUserData() {
  return { user: 'User data' };
}

async function loadPostData() {
  throw new Error('Post data loading failed');
}

async function loadCommentData() {
  return { comments: 'Comment data' };
}

async function fetchData() {
  return { data: 'Fetched data' };
}

await useOrganizedLogic();`
    }
  ]

  const notes = [
    'createPromiseLogic is used to create custom PromiseLogic instances, supporting method name customization',
    'Can use prefix, suffix, and rename configurations simultaneously, configurations are applied in order',
    'Methods not specified in rename will use default naming rules (prefix + original name + suffix)',
    'Custom instances have the same functionality and behavior as default PromiseLogic',
    'Suitable for projects that need to use different naming conventions in different business scenarios',
    'Can be used for code organization, namespace isolation, team standard unification, etc.'
  ]

  return (
      <div className="w-100 sm:w-[75%] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            createPromiseLogic()
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
              Factory Function
            </span>
            <span>Create custom PromiseLogic instance with method name customization</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg text-gray-800 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
          <p>
            <code>createPromiseLogic()</code> is a factory function used to create custom PromiseLogic instances.
            Through configuration options, you can customize method names to better fit your project's naming conventions and business requirements.
          </p>
          <p>
            This feature is particularly suitable for large projects, team collaboration, code refactoring, etc.,
            helping you better organize and manage async logic code.
          </p>
        </div>

        {/* Syntax */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>
            <CodeMarkdown
              content={"```javascript\ncreatePromiseLogic(options?)\n```"}
            />
        </div>

        {/* Parameters */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Parameters</h2>
          <ParameterTable parameters={parameters} />
        </div>

        {/* Configuration Option Properties */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Configuration Option Properties</h2>
          <ParameterTable parameters={optionProperties} />
        </div>

        {/* Return Value */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Return Value</h2>
          <ReturnValue 
            description="Returns a custom PromiseLogic instance containing configured methods."
            type="PromiseLogicInstance"
          />
        </div>

        {/* Behavior */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Behavior</h2>
          <BehaviorSection behaviors={behaviors} />
        </div>

        {/* Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Examples</h2>
          <CodeExamples examples={examples} />
        </div>

        {/* Naming Rules */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Naming Rules</h2>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Method Name Generation Rules</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Priority Order</h4>
                <ol className="text-yellow-700 dark:text-yellow-400 text-sm space-y-1">
                  <li>1. First check if there is a custom name in <code>rename</code> configuration</li>
                  <li>2. If not, apply <code>prefix + original name + suffix</code> rule</li>
                  <li>3. If none configured, use default name</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Example</h4>
                <div className="bg-white dark:bg-gray-900 rounded ">
                  <CodeMarkdown
                    content={"```javascript\n// Configuration: { prefix: 'async', suffix: 'Logic', rename: { and: 'conjunction' } }\n\n// Generated method names:\n// and → asyncConjunctionLogic (rename priority)\n// or → asyncOrLogic (prefix + or + suffix)\n// xor → asyncXorLogic (prefix + xor + suffix)\n// Other methods follow the same pattern...\n```"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <NoteSection title="Important Notes" items={notes} />
      </div>
  )
}
