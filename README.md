
# Promise Logic - Advanced Promise Logic Gates for Async Programming

Compose promises with logic gate semantics (AND, OR, NOT, XOR, NAND, NOR, XNOR, Majority). Forget APIs, remember logic.

## Features

- **Logic Gate Semantics**: Extend Promise API with AND, OR, NOT, XOR, NAND, NOR, XNOR, Majority operations
- **Dual Entry Points**: Choose between JavaScript or enhanced TypeScript experience
- **Type Safety**: Complete TypeScript definitions with strict type checking
- **Promise Utilities**: Additional utilities like Flip-Flop state management
- **Zero Dependencies**: Pure JavaScript/TypeScript implementation
- **Tree Shakeable**: Optimized for modern bundlers

## Recent Updates

### Version 2.3.2 Highlights

**🚀 NOT Gate Implementation**  
Introduced the NOT logic gate for promise inversion, enabling flexible negation patterns in asynchronous workflows:

```javascript
// Success -> Failure transformation
await PromiseLogic.not(Promise.resolve('success')); // Rejects with 'success'

// Failure -> Success transformation  
const result = await PromiseLogic.not(Promise.reject('error')); // Resolves with 'error'
```

**📦 Enhanced TypeScript System**  
Completely revamped TypeScript architecture with:
- Full generic type propagation
- Strict type checking with zero `any` types  
- Advanced type inference for all operations
- Seamless IDE integration with IntelliSense

**⚡ Performance Optimizations**
- Optimized internal logic for better efficiency
- Reduced memory overhead in gate operations
- Improved error handling and edge case management

**📚 Documentation Enhancements**
- Comprehensive API reference with TypeScript examples
- Better usage guidelines and best practices
- Clear entry point documentation for different environments

## Installation

```bash
npm install promise-logic
```

## Quick Start

### JavaScript (Default)

```javascript
// ES Modules
import { PromiseLogic } from 'promise-logic';

// CommonJS
const { PromiseLogic } = require('promise-logic');

// Use logic gates
const results = await PromiseLogic.and([
  Promise.resolve('data1'),
  Promise.resolve('data2')
]);
// results = ['data1', 'data2']
```

### TypeScript (Enhanced)

```typescript
// TypeScript version with full type inference
import { PromiseLogic } from 'promise-logic/typescript';

// Type-safe operations with automatic inference
const numbers = await PromiseLogic.and<number>([
  Promise.resolve(1),
  Promise.resolve(2)
]); 

const strings = await PromiseLogic.or<string>([
  Promise.resolve('hello'),
  Promise.resolve('world')
]); 
```

## Core Logic Gates

### `and(promises)`
Resolves with all values when all promises fulfill. Equivalent to `Promise.all()`.

```javascript
const results = await PromiseLogic.and([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]);
// results = [1, 2, 3]
```

### `or(promises)`
Resolves with the first fulfilled promise. Equivalent to `Promise.any()`.

```javascript
const result = await PromiseLogic.or([
  Promise.reject('error'),
  Promise.resolve('success')
]);
// result = 'success'
```

### `xor(promises)`
Exclusive OR - resolves only when exactly one promise fulfills.

```javascript
try {
  const result = await PromiseLogic.xor([
    Promise.reject('error1'),
    Promise.resolve('success'),
    Promise.reject('error2')
  ]);
  // result = 'success'
} catch (error) {
  // Throws if zero or multiple promises fulfill
}
```

### `nand(promises)`
Not AND - resolves when not all promises fulfill.

```javascript
const results = await PromiseLogic.nand([
  Promise.resolve('success'),
  Promise.reject('error')
]);
// results = ['success']
```

### `nor(promises)`
Not OR - resolves only when all promises reject.

```javascript
const results = await PromiseLogic.nor([
  Promise.reject('error1'),
  Promise.reject('error2')
]);
// results = []
```

### `xnor(promises)`
Exclusive NOR - resolves when all promises have the same outcome.

```javascript
const results = await PromiseLogic.xnor([
  Promise.resolve('a'),
  Promise.resolve('b')
]);
// results = ['a', 'b']
```

### `majority(promises)`
Resolves when majority (>50%) of promises fulfill.

```javascript
const results = await PromiseLogic.majority([
  Promise.resolve('a'),
  Promise.resolve('b'),
  Promise.reject('error')
]);
// results = ['a', 'b']
```

## NOT Gate - New in v2.3.2

### `not(promise)`
Inverts promise resolution - successful promises become rejections, and vice versa.

```javascript
// Success -> Failure
try {
  await PromiseLogic.not(Promise.resolve('success'));
} catch (error) {
  console.log(error); // 'success'
}

// Failure -> Success
const result = await PromiseLogic.not(Promise.reject('error'));
console.log(result); // 'error'
```

**Use Cases:**
- Transform error handling patterns
- Create conditional promise flows
- Implement retry logic with inverted conditions
- Build fallback mechanisms

## Advanced Utilities

### `race(promises)`
Equivalent to `Promise.race()`.

### `allSettled(promises)`
Equivalent to `Promise.allSettled()`.

### `allFulfilled(promises)`
Resolves with all fulfilled values, ignoring rejections.

### `allRejected(promises)`
Resolves with all rejection reasons, ignoring fulfillments.

### `createFlipFlop(initialState?)`
Creates a stateful flip-flop for managing boolean state across async operations.

```javascript
const flipFlop = PromiseLogic.createFlipFlop(false);

// Get current state
console.log(flipFlop.getState()); // false

// Toggle state
await flipFlop.toggle();
console.log(flipFlop.getState()); // true

// Wait for specific state
await flipFlop.waitFor(true); // Resolves immediately if already true

// Async state change
setTimeout(() => flipFlop.set(false), 100);
await flipFlop.waitForChange(); // Waits for state change
```

## TypeScript Support - Enhanced in v2.3.2

The TypeScript version (`promise-logic/typescript`) provides:

- **Full Type Inference**: Automatic type deduction for all operations
- **Strict Type Checking**: Zero `any` types, complete type safety
- **IDE Support**: Enhanced IntelliSense and code completion
- **Generic Type Propagation**: Proper handling of complex generic scenarios

```typescript
import { PromiseLogic } from 'promise-logic/typescript';

// TypeScript infers everything
const result = await PromiseLogic.and([
  Promise.resolve({ id: 1, name: 'Alice' }),
  Promise.resolve({ id: 2, name: 'Bob' })
]);
// result type: Array<{ id: number, name: string }>

// Complex generic types work seamlessly
async function processPromises<T>(promises: Promise<T>[]): Promise<T[]> {
  return await PromiseLogic.and(promises);
}
```

## Entry Points

| Import Path | Purpose | Recommended For |
|------------|---------|----------------|
| `promise-logic` | Default JavaScript version | General use, mixed codebases |
| `promise-logic/typescript` | Enhanced TypeScript version | TypeScript projects, strict type safety |

## Migration Note

If you're upgrading from earlier versions, note that the TypeScript system has been completely redesigned for better type safety and developer experience. All existing APIs remain compatible.

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check code coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT © 2026