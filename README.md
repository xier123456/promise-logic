


### **1. Core Philosophy**

**Replace API Memory with Logical Concepts**  
The design philosophy of `promise-logic` is: **Developers should focus on business logic, not the details of Promise APIs**.  
Traditional Promise combinations (such as `Promise.all`, `Promise.race`) have naming and semantics that are not intuitive enough, especially in complex asynchronous scenarios where code readability rapidly declines.  
`promise-logic` abstracts asynchronous combinations into logical operations like `AND`, `OR`, `XOR` through the concept of **Logic Gates**, making code semantically clear and self-explanatory.

---

### **2. Features**

1. **Logical Semantics**  
   - `AND`: All tasks must succeed (equivalent to `Promise.all`)  
   - `OR`: At least one task succeeds (equivalent to `Promise.race`)  
   - `XOR`: **Exactly one task succeeds** (no direct equivalent in traditional Promise)  
   - `NAND`: All tasks fail  
   - `Majority`: Most tasks succeed  

2. **Zero Dependencies**  
   Only depends on native Promise, no additional runtime dependencies.

3. **Full Test Coverage**  
   All logic gates have undergone rigorous unit testing to ensure behavior meets expectations.

4. **Clear Error Classification**  
   - `PromiseLogicError` unified error type  
   - `error.type` distinguishes specific logical errors (e.g., `'XOR_ERROR'`)

---

### **3. Installation**

```bash
npm install promise-logic
```

---

### **4. Quick Start**

#### Example: Primary/Backup Service Call (XOR Scenario)
```javascript
import { XOR } from 'promise-logic';

// Primary service call
const primary = fetch('https://api.main.com/data');
// Backup service call
const backup = fetch('https://api.backup.com/data');

// Execute XOR logic: exactly one success
XOR(primary, backup)
  .then(result => {
    console.log('Successfully fetched data:', result);
  })
  .catch(error => {
    if (error.type === 'XOR_ERROR') {
      console.error('Both primary and backup services succeeded or failed, which does not meet XOR semantics');
    } else {
      console.error('Network error:', error);
    }
  });
```

#### Example: Majority Decision (Majority Scenario)
```javascript
import { Majority } from 'promise-logic';

const services = [
  fetch('https://api.node1.com/vote'),
  fetch('https://api.node2.com/vote'),
  fetch('https://api.node3.com/vote')
];

Majority(...services)
  .then(results => {
    console.log('Majority of services returned success:', results);
  })
  .catch(error => {
    console.error('Majority of services failed:', error);
  });
```

---

### **5. API Reference**

| API        | Description                                                                 |
| :--------- | :-------------------------------------------------------------------------- |
| `AND`      | All Promises succeed, returns result array; any failure causes overall failure. |
| `OR`       | At least one Promise succeeds, returns first success result; all failures cause overall failure. |
| `XOR`      | **Exactly one Promise succeeds**, returns that result; otherwise throws `XOR_ERROR`. |
| `NAND`     | All Promises fail, returns error array; any success causes overall failure. |
| `Majority` | More than half of Promises succeed, returns success result array; otherwise overall failure. |

---

### **6. Real-world Application Scenarios**

1. **Primary/Backup Service Calls**  
   - Use `XOR` to ensure **exactly one service responds**, avoiding duplicate processing.  
2. **Distributed Decision Making**  
   - Use `Majority` to implement majority consensus (e.g., distributed voting).  
3. **Resource Competition**  
   - Use `OR` to get the first available resource (e.g., CDN node selection).  
4. **Full-link Validation**  
   - Use `AND` to ensure all dependent services succeed (e.g., order creation).  

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

- **GitHub Repository**：[https://github.com/xier123456/promise-logic](https://github.com/xier123456/promise-logic)  
- **npm Package**：[https://www.npmjs.com/package/promise-logic](https://www.npmjs.com/package/promise-logic)  
- **Issue Tracking**：[GitHub Issues](https://github.com/xier123456/promise-logic/issues)  

