# Promise Logic - A Declarative Promise Library Based on Logic Gates

This description might sound a bit awkward, but it essentially means a Promise wrapper library designed based on the concept of logic gates, providing a more declarative syntax. However, promiseLogic's implementation is based on promises, so we can say it's a promise-based wrapper library.

This design is really interesting. I spent a lot of time thinking about it and realized that promise state machines ultimately have only two outcomes: either fulfilled or rejected. This state design can be abstracted using boolean operations, allowing for declarative writing that reduces our memory burden and mental load during development. Let's look at some examples.

Installation:

npm:

```bash
npm install promise-logic
```

```javascript
import PromiseLogic from 'promise-logic';

// Native Promise
const promise = Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]);

// Promise Logic -- AND gate
const promiseLogic = PromiseLogic.and([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]); // [1,2,3]

// This syntax is more semantic, easier to understand, reduces team communication costs, and is more friendly to learners

// Native promise
const promise = Promise.any([
  Promise.resolve(1),
  Promise.reject(2),
  Promise.resolve(3)
]); // 1

// Promise Logic -- OR gate
const promiseLogicOr = PromiseLogic.or([
  Promise.resolve(1),
  Promise.reject(2),
  Promise.resolve(3)
]); // 1

// The result of or is consistent with native promise.any, but from here, I think you should see the pattern, and there's more to it
```

It also supports TypeScript syntax:

```javascript
const promiseLogic =
  PromiseLogic.and <
  number >
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]; // [1,2,3]

const promiseLogicOr =
  PromiseLogic.or <
  string >
  [
    Promise.resolve('data 1'),
    Promise.reject('error 2'),
    Promise.resolve('data 3')
  ]; // 'data 1'
```

#### We can also create flexible combinations for complex request resources

```javascript
// OR + AND
// Suppose we have a scenario where we want to get data from multiple data sources, need the fastest request result, but also need all requests in one request group to succeed before returning a result. Implementing this with native Promise would be extremely complex

// Now we can implement it like this:
const result = await PromiseLogic.or([
  PromiseLogic.and([
    // Request group 1
    fetch('/api/data1'), // Request 1
    fetch('/api/data2') // Request 2
  ]),
  PromiseLogic.and([
    // Request group 2
    fetch('/api/data3'), // Request 3
    fetch('/api/data4') // Request 4
  ])
]); // Result: [fetch('/api/data1'),fetch('/api/data2')] or [fetch('/api/data3'),fetch('/api/data4')] or error

// This returns the fastest successful result, and this successful result must come from a request group where all requests in the AND combination have succeeded
```

Of course, there are other logic gates like exclusive OR, NAND, NOR, XNOR, majority, etc. Their implementations are all very simple, so I won't introduce them one by one. They all use the same pattern but have different logical semantics, so you can choose which one to use based on your scenario.

#### `PromiseLogic.xor`

#### `PromiseLogic.majority`

#### `PromiseLogic.nor`

#### `PromiseLogic.xnor`

#### `PromiseLogic.nand`

#### `PromiseLogic.not`

We've kept the native methods for more straightforward usage:

- `PromiseLogic.allSettled`
- `PromiseLogic.race`

### `PromiseLogic.createFlipFlop` - Async Boolean Flip-Flop

This is used to create a stateful flip-flop for managing boolean states in asynchronous operations. You might be wondering why, but let's continue:

Here's how to use this flip-flop to manage connection states:

```javascript
const connectionState = PromiseLogic.createFlipFlop(false);

// Managing device connection state
class ConnectionManager {
  constructor() {
    this.connectionState = PromiseLogic.createFlipFlop(false); // Initial disconnected state
  }

  async connect() {
    console.log('Connecting...');
    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.connectionState.set(true); // Set connected state
    console.log('Connected!');
  }

  async disconnect() {
    console.log('Disconnecting...');
    await this.connectionState.set(false); // Set disconnected state
    console.log('Disconnected!');
  }

  async waitForConnection() {
    console.log('Waiting for connection...');
    await this.connectionState.waitFor(true); // Wait until connected
    console.log('Connection established!');
  }

  async monitorConnection() {
    // Monitor state changes
    while (true) {
      const newState = await this.connectionState.waitForChange();
      console.log('Connection state changed to:', newState ? 'connected' : 'disconnected');
      if (!newState) break; // Exit if disconnected
    }
  }
}

// Usage
const manager = new ConnectionManager();

// Start monitoring in background
manager.monitorConnection();

// Connect and wait
await manager.connect();
await manager.waitForConnection();

// Disconnect after 2 seconds
setTimeout(async () => {
  await manager.disconnect();
}, 2000);
```

This is because in asynchronous operations, we often need to make decisions and execute subsequent operations based on a certain state, and this flip-flop can help us manage this state in asynchronous operations.

API

```javascript
PromiseLogic.createFlipFlop(initialState);
```

**Parameters:**

- `initialState` (boolean, optional): Initial state, default value is `false`

**Returns:**
An object with the following methods:

- `getState()`: Returns the current boolean state
- `set(newState: boolean)`: Sets the new state and returns Promise<boolean>
- `toggle()`: Toggles the current state and returns Promise<boolean>
- `waitForChange()`: Returns a Promise that resolves when the state changes
- `waitFor(targetState: boolean)`: Returns a Promise that resolves when the state matches the target

### `createPromiseLogic(options)`

Creates a customizable object containing PromiseLogic methods with configurable naming.

**Parameters:**

- `options` (object, optional): Configuration options
  - `prefix` (string, optional): String to prepend to all method names
  - `suffix` (string, optional): String to append to all method names
  - `rename` (Record<string, string>, optional): Mapping of original method names to new names

**Returns:**
An object containing PromiseLogic methods with customized names.

```javascript
// Basic usage - returns all methods with default names
const logic = createPromiseLogic();

// Combined options
const combined = createPromiseLogic({
  prefix: 'async', // Add prefix
  suffix: 'Op', // Add suffix
  rename: {
    // API renaming
    and: 'Conjunction',
    or: 'Disjunction'
  }
});

// Call combined method (async)+ (Conjunction) + (Op)
const result = await logic.asycnConjunctionOp([
  fetch('/api/data1'),
  fetch('/api/data2')
]);
```