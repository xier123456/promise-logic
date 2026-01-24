


### **1. 核心理念**

**用逻辑概念替代 API 记忆**  
`promise-logic` 的设计哲学是：**开发者应专注于业务逻辑，而非 Promise API 的细节**。  
传统 Promise 组合（如 `Promise.all`、`Promise.race`）的命名与语义不够直观，尤其在复杂异步场景下，代码可读性迅速下降。  
`promise-logic` 通过**逻辑门（Logic Gate）** 的方式，将异步组合抽象为 `and`、`or`、`xor` 等逻辑操作，使代码语义清晰、逻辑自解释。

---

### **2. 功能特性**

1. **逻辑语义化**  
   - `and`：所有任务必须成功（等价于 `Promise.all`）  
   - `or`：至少一个任务成功（等价于 `Promise.race`）  
   - `xor`：**有且仅有一个任务成功**  
   - `nand`：所有任务均失败  

   - `not`：反转单个 Promise 的结果  
   - `majority`：多数任务成功  

2. **零依赖**  
   仅依赖原生 Promise，无额外运行时依赖。

3. **全测试覆盖**  
   所有逻辑门均经过严格单元测试，确保行为符合预期。

4. **错误分类明确**  
   - `PromiseLogicError` 统一错误类型  
   - `error.type` 区分具体逻辑错误（如 `'XOR_ERROR'`）

---

### **3. 安装**

```bash
npm install promise-logic
```

---

### **4. 快速开始**

#### 示例：主备服务调用（XOR 场景）
```javascript
import { PromiseLogic } from 'promise-logic';

// 主服务调用
const primary = fetch('https://api.main.com/data');
// 备用服务调用
const backup = fetch('https://api.backup.com/data');

// 执行 XOR 逻辑：有且仅有一个成功
PromiseLogic.xor([primary, backup])
  .then(result => {
    console.log('成功获取数据:', result);
  })
  .catch(error => {
    if (error.type === 'XOR_ERROR') {
      console.error('主备服务均成功或均失败，不符合 XOR 语义');
    } else {
      console.error('网络错误:', error);
    }
  });
```

#### 示例：多数决决策（Majority 场景）
```javascript
import { PromiseLogic } from 'promise-logic';

const services = [
  fetch('https://api.node1.com/vote'),
  fetch('https://api.node2.com/vote'),
  fetch('https://api.node3.com/vote')
];

PromiseLogic.majority(services)
  .then(results => {
    console.log('多数服务返回成功:', results);
  })
  .catch(error => {
    console.error('多数服务失败:', error);
  });
```

```typescript
import { PromiseLogic } from 'promise-logic/typescript';

const services = [
  fetch('https://api.node1.com/vote'),
  fetch('https://api.node2.com/vote'),
  fetch('https://api.node3.com/vote')
];

//可以进行类型断言，也可以默认让PromiseLogic自动推断类型
PromiseLogic.majority<Response>(services)
  .then(results => {
    console.log('多数服务返回成功:', results);
  })
  .catch(error => {
    console.error('多数服务失败:', error);
  });
```

---

### **5. API 参考**

| API        | 说明                                                                 |
| :--------- | :------------------------------------------------------------------- |
| `and`      | 所有 Promise 成功，返回结果数组；任一失败则整体失败。           |
| `or`       | 至少一个 Promise 成功，返回首个成功结果；全部失败则整体失败。   |
| `xor`      | **有且仅有一个 Promise 成功**，返回该结果；否则抛出 `XOR_ERROR`。 |
| `nand`     | 所有 Promise 均失败，返回错误数组；任一成功则整体失败。         |
| `not`      | 反转单个 Promise 的结果 |
| `majority` | 超过半数 Promise 成功，返回成功结果数组；否则整体失败。         |

---

### **6. 实际应用场景**

1. **主备服务调用**  
   - 使用 `xor` 确保**有且仅有一个服务响应**，避免重复处理。  
2. **分布式决策**  
   - 使用 `majority` 实现多数决共识（如分布式投票）。  
3. **资源竞争**  
   - 使用 `or` 获取首个可用资源（如 CDN 节点选择）。  
   - 使用 `not` 检查资源是否可用。  
4. **全链路校验**  
   - 使用 `and` 确保所有依赖服务均成功（如订单创建）。  

---

### **7. 贡献指南**

1. **开发环境**  
   ```bash
   git clone https://github.com/haowhite/promise-logic.git
   cd promise-logic
   npm install
   ```
2. **测试**  
   ```bash
   npm test
   ```
3. **提交规范**  
   - 提交信息需包含 `feat:`（新功能）、`fix:`（修复）、`docs:`（文档）前缀。  
   - Pull Request 需附带测试用例。  

---

### **8. 资源链接**

- **GitHub 仓库**：[https://github.com/xier123456/promise-logic](https://github.com/xier123456/promise-logic)  
- **npm 包**：[https://www.npmjs.com/package/promise-logic](https://www.npmjs.com/package/promise-logic)  
- **Issue 跟踪**：[GitHub Issues](https://github.com/xier123456/promise-logic/issues)  

