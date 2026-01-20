import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'

export default function CreateFlipFlopPage() {
  const parameters = [
    {
      name: 'initialState',
      type: 'boolean',
      description: 'Initial state, defaults to false'
    }
  ]

  const behaviors = [
    {
      type: 'success' as const,
      title: 'Creation Successful',
      description: 'Successfully creates a FlipFlop instance containing state management methods.'
    },
    {
      type: 'error' as const,
      title: 'Special Case',
      description: 'The createFlipFlop method never fails, always returns a valid FlipFlop instance.'
    }
  ]

const examples = [
  {
    title: 'Basic Usage',
    description: 'Create and use FlipFlop state trigger',
    initialCode: `// Create and use FlipFlop state trigger
// Using CommonJS require syntax
const { PromiseLogic } = require('promise-logic');

(async function() {
  // Create FlipFlop instance with initial state false
  const flipFlop = PromiseLogic.createFlipFlop(false);
  
  console.log('Initial state:', flipFlop.getState()); // false
  
  // Toggle state
  await flipFlop.toggle();
  console.log('State after toggle:', flipFlop.getState()); // true
  
  // Toggle again
  await flipFlop.toggle();
  console.log('State after second toggle:', flipFlop.getState()); // false
  
  // Set specific state
  await flipFlop.setState(true);
  console.log('Set state to true:', flipFlop.getState()); // true
  
  return flipFlop.getState();
})().then(result => {
  console.log('Function execution result:', result);
});`
  },
  {
    title: 'State Synchronization',
    description: 'Ensure consistency of state changes',
    initialCode: `// Ensure consistency of state changes
const { PromiseLogic } = require('promise-logic');

(async function() {
  const flipFlop = PromiseLogic.createFlipFlop(false);
  
  // Simulate multiple async operations modifying state simultaneously
  const operations = [
    flipFlop.toggle(),
    flipFlop.toggle(),
    flipFlop.toggle()
  ];
  
  // Wait for all operations to complete
  await Promise.all(operations);
  
  // Final state should be deterministic
  console.log('Final state:', flipFlop.getState()); // true (because toggled odd number of times)
  
  return flipFlop.getState();
})().then(result => {
  console.log('Synchronization example result:', result);
});`
  },
  {
    title: 'Real Application',
    description: 'Implement switch control using FlipFlop',
    initialCode: `// Implement switch control using FlipFlop
const { PromiseLogic } = require('promise-logic');

class LightSwitch {
  #switch = PromiseLogic.createFlipFlop(false);
  
  async turnOn() {
    await this.#switch.setState(true);
    console.log('💡 Light turned on');
    this.#updateUI();
  }
  
  async turnOff() {
    await this.#switch.setState(false);
    console.log('🌙 Light turned off');
    this.#updateUI();
  }
  
  async toggle() {
    await this.#switch.toggle();
    const state = this.#switch.getState();
    console.log(state ? '💡 Light turned on' : '🌙 Light turned off');
    this.#updateUI();
  }
  
  isOn() {
    return this.#switch.getState();
  }
  
  #updateUI() {
    const state = this.#switch.getState();
    console.log('UI update - Current state:', state ? 'ON' : 'OFF');
  }
}

// Usage example
(async function() {
  const light = new LightSwitch();
  
  console.log('Initial state:', light.isOn() ? 'ON' : 'OFF');
  
  await light.turnOn();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  
  await light.toggle();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await light.turnOff();
})();`
  },
  {
    title: 'Advanced Application',
    description: 'Build state machine pattern',
    initialCode: `// Build state machine pattern
const { PromiseLogic } = require('promise-logic');

class StateMachine {
  #states = {
    idle: PromiseLogic.createFlipFlop(true),
    loading: PromiseLogic.createFlipFlop(false),
    success: PromiseLogic.createFlipFlop(false),
    error: PromiseLogic.createFlipFlop(false)
  };
  
  async transitionTo(state) {
    // Reset all states
    await Promise.all([
      this.#states.idle.setState(false),
      this.#states.loading.setState(false),
      this.#states.success.setState(false),
      this.#states.error.setState(false)
    ]);
    
    // Set new state
    await this.#states[state].setState(true);
    
    console.log('Transitioned to state:', state);
    this.#logCurrentState();
  }
  
  getCurrentState() {
    return Object.entries(this.#states)
      .find(([_, flipFlop]) => flipFlop.getState())
      ?.[0] || 'unknown';
  }
  
  #logCurrentState() {
    const state = this.getCurrentState();
    console.log('Current state:', state);
  }
  
  async simulateWorkflow() {
    console.log('Starting workflow...');
    
    await this.transitionTo('loading');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success or failure
    const success = Math.random() > 0.3;
    if (success) {
      await this.transitionTo('success');
      console.log('✅ Operation completed successfully');
    } else {
      await this.transitionTo('error');
      console.log('❌ Operation failed');
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.transitionTo('idle');
    console.log('Workflow ended');
  }
}

// Execute example
const stateMachine = new StateMachine();
stateMachine.simulateWorkflow();`
  }
];

  const notes = [
    'FlipFlop is a state trigger used to manage boolean state toggling',
    'All state change operations are asynchronous, ensuring state consistency',
    'Can be used to build simple state machines, switch controls, mode switching, etc.',
    'FlipFlop instances are thread-safe and can be safely used in multiple async operations',
    'State change operations return Promise, can wait for state change completion'
  ]

  return (
      <div className="w-[90%] sm:w-[75%] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            PromiseLogic.createFlipFlop()
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
              Utility Method
            </span>
            <span>Create state trigger for managing boolean state toggling</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
          <p>
            The <code>PromiseLogic.createFlipFlop()</code> method creates a state trigger (FlipFlop),
            used to manage boolean state toggling. FlipFlop provides state toggling, state setting, and state query functions.
          </p>
          <p>
            FlipFlop's design is inspired by flip-flops in digital circuits,
            it ensures atomicity and consistency of state changes, particularly suitable for async scenarios requiring state management.
          </p>
        </div>

        {/* Syntax */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>
            <CodeMarkdown
            content={
              '```javascript\nPromiseLogic.createFlipFlop(initialState?)\n```'
            }
            />
        </div>

        {/* Parameters */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Parameters</h2>
          <ParameterTable parameters={parameters} />
        </div>

        {/* Return Value */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Return Value</h2>
          <ReturnValue 
            description="Returns a FlipFlop instance containing state management methods."
            type="FlipFlop"
          />
        </div>

        {/* FlipFlop Instance Methods */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">FlipFlop Instance Methods</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">getState()</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Get current state.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded p-3">
                  <CodeMarkdown
                    content={
                      '```javascript\nconst currentState = flipFlop.getState();\n// Returns: boolean\n```'
                    }
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">setState(state)</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Set specific state.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded p-3">
                  <CodeMarkdown
                    content={
                      '```javascript\nawait flipFlop.setState(true);\n// Returns: Promise<void>\n```'
                    }
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">toggle()</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Toggle state (true ↔ false).
                </p>
                <div className="bg-white dark:bg-gray-900 rounded p-3">
                  <CodeMarkdown
                    content={
                      '```javascript\nawait flipFlop.toggle();\n// Returns: Promise<void>\n```'
                    }
                  />
                </div>
              </div>
            </div>
          </div>
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

        {/* Important Notes */}
        <NoteSection title="Important Notes" items={notes} />
      </div>
  )
}
