### **1. Core Philosophy**

**Replace API Memory with Logical Concepts**  
The design philosophy of `promise-logic` is: **Developers should focus on business logic, not on the details of Promise APIs**.  
Traditional Promise combinations (such as `Promise.all`, `Promise.race`) have naming and semantics that are not intuitive enough, especially in complex asynchronous scenarios where code readability rapidly declines.  
`promise-logic` abstracts asynchronous combinations into logical operations like `and`, `or`, `xor` through the concept of **Logic Gates**, making code semantically clear and self-explanatory.

---

### **2. Features**

1. **Logical Semantics**
   - `and`: All tasks must succeed (equivalent to `Promise.all`)
   - `or`: At least one task succeeds (equivalent to `Promise.any`)
   - `xor`: **Exactly one task succeeds**
   - `nand`: Not all tasks succeed (at least one fails)
   - `nor`: All tasks fail (no task succeeds)
   - `xnor`: All tasks succeed or all fail (same state)
   - `not`: Inverts the result of a single Promise
   - `majority`: Most tasks succeed

2. **Zero Dependencies**
   Only depends on native Promise, no additional runtime dependencies.

3. **Full Test Coverage**
   All logic gates have undergone rigorous unit testing to ensure behavior meets expectations.

4. **Clear Error Classification**
   - `PromiseLogicError` unified error type
   - `error.type` distinguishes specific logical errors (e.g., `'XOR_ERROR'`)

5. **Timeout Control**
   - `maxTimer`: Adds timeout functionality to any Promise operation (unit: milliseconds).

maxTimer can only detect timeout of Promise operations, cannot interrupt or cancel Promise operations themselves, this is a JavaScript characteristic.

6. **Extended Operations**
   - `allFulfilled`: Returns all successful results
   - `allRejected`: Returns all failed results
   - `allSettled`: Returns all results (both successful and failed)

---

### **3. Installation**

```bash
npm install promise-logic
```

---

### **4. Quick Start**

#### Example: Primary/Backup Service Call (XOR Scenario)

```javascript
import { PromiseLogic } from 'promise-logic';

// Primary service call
const primary = fetch('https://api.main.com/data');
// Backup service call
const backup = fetch('https://api.backup.com/data');

// Execute XOR logic: exactly one success
PromiseLogic.xor([primary, backup])
  .then((result) => {
    console.log('Successfully fetched data:', result);
  })
  .catch((error) => {
    if (error.type === 'XOR_ERROR') {
      console.error('Both primary and backup services succeeded or failed, which does not meet XOR semantics');
    } else {
      console.error('Network error:', error);
    }
  });
```

#### Example: Majority Decision (Majority Scenario)

```javascript
import { PromiseLogic } from 'promise-logic';

const services = [
  fetch('https://api.node1.com/vote'),
  fetch('https://api.node2.com/vote'),
  fetch('https://api.node3.com/vote')
];

PromiseLogic.majority(services)
  .then((results) => {
    console.log('Majority of services returned success:', results);
  })
  .catch((error) => {
    console.error('Majority of services failed:', error);
  });
```

```typescript
import { PromiseLogic } from 'promise-logic/typescript';

const services = [
  fetch('https://api.node1.com/vote'),
  fetch('https://api.node2.com/vote'),
  fetch('https://api.node3.com/vote')
];

// Type assertion can be done, or let PromiseLogic infer types automatically
PromiseLogic.majority<Response>(services)
  .then((results) => {
    console.log('Majority of services returned success:', results);
  })
  .catch((error) => {
    console.error('Majority of services failed:', error);
  });
```

#### Example: Timeout Control

```javascript
import { PromiseLogic } from 'promise-logic';

// Execute operation with timeout
PromiseLogic.and([
  Promise.resolve(1),
  new Promise((resolve) => setTimeout(resolve, 1000)), // 1 second operation
  Promise.resolve(3)
])
  .maxTimer(2000) // 2 second timeout
  .then((result) => {
    console.log('Operation completed within timeout:', result);
  })
  .catch((error) => {
    console.error('Operation timed out or failed:', error.message);
  });
```

#### Example: Extended Operations

```javascript
import { PromiseLogic } from 'promise-logic';

const operations = [
  Promise.resolve('success1'),
  Promise.reject('error1'),
  Promise.resolve('success2'),
  Promise.reject('error2')
];

// Get all successful results
PromiseLogic.allFulfilled(operations).then((results) => {
  console.log('Successful results:', results); // ['success1', 'success2']
});

// Get all failed results
PromiseLogic.allRejected(operations).then((errors) => {
  console.log('Failed results:', errors); // ['error1', 'error2']
});

// Get all results (both success and failure)
PromiseLogic.allSettled(operations).then((results) => {
  console.log('All results:', results);
});
```

#### Example: Custom majority threshold

```javascript
import { PromiseLogic } from 'promise-logic';

const services = [
  Promise.resolve('service1'),
  Promise.resolve('service2'),
  Promise.reject('service3'),
  Promise.reject('service4')
];

// Default threshold (0.5): requires at least 3 successes
// Custom threshold (0.4): requires at least 2 successes
PromiseLogic.majority(services, { max: 0.4 })
  .then((results) => {
    console.log('Custom threshold met, successful results:', results); // ['service1', 'service2']
  })
  .catch((error) => {
    console.error('Custom threshold not met:', error);
  });
```

## Recent Updates

### v2.7.0

- **Added Modular Architecture**: Separated logic gate implementations into independent modules for better code maintainability
- **Fixed NOT Logic Gate**: Fixed potential risks in NOT logic gate in production environments
- **Improved Error Messages**: Enhanced error message format for clearer error details
- **Enhanced Test Coverage**: Added complete factory function tests for v1 and v2 versions
- **Updated Documentation**: Added custom factory function usage guide


### Using Factory Function

The factory function allows you to create PromiseLogic methods with custom names:

```javascript
import { createPromiseLogic } from 'promise-logic/factory';

// Create instance with custom naming
const logic = createPromiseLogic({
  prefix: 'api_',
  suffix: '_call',
  rename: {
    and: 'all',
    or: 'any',
    xor: 'exclusive'
  }
});

// Use custom-named methods
logic.api_all_call([fetch('/api/users'), fetch('/api/posts')]);

logic.api_any_call([fetch('/api/cache'), fetch('/api/database')]);
```

### TypeScript Support

```typescript
import { PromiseLogic } from 'promise-logic/typescript';

// Type inference
PromiseLogic.and([Promise.resolve(1), Promise.resolve(2)]).then(
  (results: number[]) => {
    console.log(results);
  }
);

// Type assertion
PromiseLogic.and<number>([Promise.resolve(1), Promise.resolve(2)]);
```

---

### **5. API Reference**

| API            | Description                                                                                                                         |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `and`          | All Promises succeed, returns result array; any failure causes overall failure.                                                                        |
| `or`           | At least one Promise succeeds, returns first success result; all failures cause overall failure.                                                                |
| `xor`          | **Exactly one Promise succeeds**, returns that result; otherwise throws `XOR_ERROR`.                                                            |
| `nand`         | Not all Promises succeed (at least one fails), returns success result array; all succeed causes overall failure.                                              |
| `nor`          | All Promises fail (no task succeeds), returns empty array; any success causes overall failure.                                                        |
| `xnor`         | All Promises succeed or all fail (same state), returns success result array; otherwise throws `XNOR_ERROR`.                                           |
| `not`          | Inverts the result of a single Promise: success becomes failure, failure becomes success.                                                                            |
| `majority`     | More than specified threshold of Promises succeed, returns success result array; otherwise overall failure. Accepts `options` parameter, where `max` property can customize threshold (default: 0.5), range: (0, 1). |
| `allFulfilled` | Returns all successful results as an array, ignoring failures.                                                                                     |
| `allRejected`  | Returns all failed results as an array, ignoring successes.                                                                                     |
| `allSettled`   | Returns all results (both successful and failed) as an array.                                                                                     |
| `race`         | Returns the first completed Promise result (regardless of success or failure).                                                                            |
| `maxTimer`     | Adds timeout functionality to any Promise operation (unit: milliseconds).                                                                              |

## **Note**: `maxTimer` can only detect timeout of Promise operations, cannot interrupt or cancel Promise operations themselves, this is a JavaScript characteristic.

### **6. Real-world Application Scenarios**

1. **Primary/Backup Service Calls**
   - Use `xor` to ensure **exactly one service responds**, avoiding duplicate processing.
2. **Distributed Decision Making**
   - Use `majority` to implement majority consensus (e.g., distributed voting).
3. **Resource Competition**
   - Use `or` to get the first available resource (e.g., CDN node selection).
   - Use `not` to check if a resource is available.
4. **Full-link Validation**
   - Use `and` to ensure all dependent services succeed (e.g., order creation).

---

### **7. Contribution Guide**

1. **Development Environment**
   ```bash
   git clone https://github.com/haowhite/promise-logic.git
   cd promise-logic
   npm install
   ```
2. **Testing**
   ```bash
   npm test
   ```
3. **Commit Guidelines**
   - Commit messages must include prefixes like `feat:` (new feature), `fix:` (bug fix), `docs:` (documentation).
   - Pull Requests must include test cases.

---

### **8. Resource Links**

- **GitHub Repository**: [https://github.com/xier123456/promise-logic](https://github.com/xier123456/promise-logic)
- **npm Package**: [https://www.npmjs.com/package/promise-logic](https://www.npmjs.com/package/promise-logic)
- **Issue Tracking**: [GitHub Issues](https://github.com/xier123456/promise-logic/issues)
