# PromiseLogic

> Compose promises with logic gate semantics - Forget APIs, remember logic.

PromiseLogic is a comprehensive utility library that provides intuitive logical gate semantics for Promise composition. It extends the standard Promise API with logical operations that mirror digital circuit design, making asynchronous programming more intuitive and expressive.

## 🎯 Philosophy

**"Forget APIs, remember logic."** - Replace fragmented API knowledge with fundamental logic concepts that work consistently across all asynchronous operations.

## ✨ Features

- 🧠 **Complete Logic Gate Semantics**: AND, OR, XOR, NAND, NOR, XNOR, Majority
- 🔄 **Extended Promise Operations**: All fulfilled/rejected results, complete settlement analysis
- 🔧 **Dual API Pattern**: Static class methods + Configurable factory function
- 📦 **Production Ready**: Zero dependencies, complete TypeScript support
- 🧪 **Test Driven**: 100% test coverage with comprehensive edge cases
- 🌳 **Tree Shaking**: Optimized bundle output for modern build systems

## 🚀 Installation

```bash
npm install promise-logic
```

## 📖 Quick Start

### Basic Logic Gates

```javascript
import { PromiseLogic } from 'promise-logic';

// AND logic - All promises must succeed (equivalent to Promise.all)
const results = await PromiseLogic.and([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]);

// OR logic - Any promise succeeds (short-circuits on first success)
const data = await PromiseLogic.or([
  fetchPrimaryService(),
  fetchBackupService()
]);

// XOR logic - Exactly one promise must succeed
const uniqueResult = await PromiseLogic.xor([
  cacheLookup(),
  databaseQuery()
]);
```

### Advanced Logic Operations

```javascript
// NAND logic - Not all promises succeed (at least one failure)
const hasFailures = await PromiseLogic.nand([
  validateInput(),
  checkPermissions(),
  verifyResources()
]);

// NOR logic - All promises must fail
const allFailed = await PromiseLogic.nor([
  experimentalFeature(),
  deprecatedAPI()
]);

// Majority logic - More than half succeed
const consensus = await PromiseLogic.majority([
  server1.query(),
  server2.query(),
  server3.query()
]);
```

### Extended Result Analysis

```javascript
// Get only successful results
const successes = await PromiseLogic.allFulfilled([
  apiCall1(),
  apiCall2(),
  apiCall3()
]);

// Get only failure reasons
const failures = await PromiseLogic.allRejected([
  riskyOperation1(),
  riskyOperation2()
]);

// Get complete settlement information
const allResults = await PromiseLogic.allResults([
  operation1(),
  operation2()
]);

// Strict all-success validation
const allSuccessful = await PromiseLogic.allSuccessful([
  validation1(),
  validation2(),
  validation3()
]);

// Strict all-failure validation
const allFailed = await PromiseLogic.allFailed([
  deprecatedCall1(),
  deprecatedCall2()
]);
```

## 🔧 API Reference

### Core Logic Gates

#### `PromiseLogic.and(iterable)`
Equivalent to `Promise.all`. Resolves when all promises fulfill, rejects if any promise rejects.

#### `PromiseLogic.or(iterable)`
Resolves with the first successful promise. Rejects only if all promises reject.

#### `PromiseLogic.xor(iterable)`
Resolves when exactly one promise fulfills. Rejects if zero or multiple promises fulfill.

#### `PromiseLogic.nand(iterable)`
Resolves when not all promises fulfill (at least one rejection). Rejects if all promises fulfill.

#### `PromiseLogic.nor(iterable)`
Resolves when all promises reject. Rejects if any promise fulfills.

#### `PromiseLogic.xnor(iterable)`
Resolves when all promises fulfill or all reject. Rejects in mixed scenarios.

#### `PromiseLogic.majority(iterable)`
Resolves when more than half of promises fulfill. Rejects otherwise.

### Extended Operations

#### `PromiseLogic.allFulfilled(iterable)`
Always resolves with an array of fulfilled values (empty if none).

#### `PromiseLogic.allRejected(iterable)`
Always resolves with an array of rejection reasons (empty if none).

#### `PromiseLogic.allResults(iterable)`
Equivalent to `Promise.allSettled`. Returns complete settlement information.

#### `PromiseLogic.allSuccessful(iterable)`
Resolves with all values only if every promise fulfills. Rejects otherwise.

#### `PromiseLogic.allFailed(iterable)`
Resolves with all rejection reasons only if every promise rejects. Rejects otherwise.

### Utility Methods

#### `PromiseLogic.race(iterable)`
Equivalent to `Promise.race`. Resolves or rejects with the first settled promise.

#### `PromiseLogic.allSettled(iterable)`
Equivalent to `Promise.allSettled`. Always resolves with settlement results.

#### `PromiseLogic.createFlipFlop(initialState?)`
Creates a stateful flip-flop utility for managing boolean state transitions.

## 🏭 Factory Function

Create customized instances with method name transformations:

```javascript
import { createPromiseLogic } from 'promise-logic';

// Default naming
const logic = createPromiseLogic();
await logic.and([promise1, promise2]);

// With prefix
const asyncLogic = createPromiseLogic({ prefix: 'async' });
await asyncLogic.asyncand([promise1, promise2]);

// With suffix
const logicUtils = createPromiseLogic({ suffix: 'Logic' });
await logicUtils.andLogic([promise1, promise2]);

// With custom renaming
const customLogic = createPromiseLogic({
  rename: {
    and: 'conjunction',
    or: 'disjunction',
    xor: 'exclusiveOr'
  }
});
await customLogic.conjunction([promise1, promise2]);

// Combined transformations
const advancedLogic = createPromiseLogic({
  prefix: 'async',
  suffix: 'Logic',
  rename: { and: 'conjunction' }
});
await advancedLogic.asyncconjunctionLogic([promise1, promise2]);
```

## 🎪 Real-World Examples

### Service Orchestration

```javascript
// Load balancing with fallback
const userData = await PromiseLogic.or([
  primaryUserService.getUser(id),
  secondaryUserService.getUser(id),
  cacheService.getUser(id)
]);

// Multi-step validation
const isValid = await PromiseLogic.and([
  validateEmail(email),
  validatePassword(password),
  checkRateLimit(ipAddress)
]);

// Consensus-based decision making
const configuration = await PromiseLogic.majority([
  configServer1.getConfig(),
  configServer2.getConfig(),
  configServer3.getConfig()
]);
```

### Error Recovery & Analysis

```javascript
// Graceful degradation
const [successfulResults, failedOperations] = await Promise.all([
  PromiseLogic.allFulfilled(operations),
  PromiseLogic.allRejected(operations)
]);

// Comprehensive error reporting
const results = await PromiseLogic.allResults(operations);
const successful = results.filter(r => r.status === 'fulfilled');
const failed = results.filter(r => r.status === 'rejected');

console.log(`Operations: ${successful.length} successful, ${failed.length} failed`);
```

### State Management

```javascript
// Flip-flop for toggle operations
const toggle = PromiseLogic.createFlipFlop(false);

// Toggle state and wait for change
await toggle.toggle();
console.log(toggle.getState()); // true

// Set specific state
await toggle.setState(false);
```

## 🛠️ Error Handling

All logic gates throw `PromiseLogicError` with descriptive messages:

```javascript
try {
  await PromiseLogic.xor([apiCall1(), apiCall2()]);
} catch (error) {
  if (error.type === 'XOR_ERROR') {
    console.log('Expected exactly one successful call');
  }
  console.log('Failed promises:', error.results);
}
```

## 📊 TypeScript Support

Full TypeScript support with precise type inference:

```typescript
import { PromiseLogic } from 'promise-logic';

// Type inference for successful results
const numbers: number[] = await PromiseLogic.and([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]);

// Type-safe error handling
try {
  await PromiseLogic.nand(operations);
} catch (error: PromiseLogicError) {
  // error has full type information
}
```

## 🔍 Advanced Usage

### Custom Logic Composition

```javascript
// Create complex logic flows
async function advancedOperation(promises) {
  const [successes, failures] = await Promise.all([
    PromiseLogic.allFulfilled(promises),
    PromiseLogic.allRejected(promises)
  ]);

  if (successes.length >= failures.length) {
    return { data: successes, warnings: failures };
  } else {
    throw new Error('Operation mostly failed');
  }
}
```

### Performance Optimization

```javascript
// Batch processing with logic gates
const batches = chunkArray(operations, BATCH_SIZE);
const batchResults = await PromiseLogic.allFulfilled(
  batches.map(batch => PromiseLogic.and(batch))
);

// Flatten results
const allResults = batchResults.flat();
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- [GitHub Repository](https://github.com/xier123456/promise-logic)
- [npm Package](https://www.npmjs.com/package/promise-logic)
- [Issue Tracker](https://github.com/xier123456/promise-logic/issues)

---

**PromiseLogic** - Making asynchronous logic as simple as digital circuits. 🎯