# Promise-Logic 完整 API 文档

## 目录

1. [概述](#概述)
2. [安装](#安装)
3. [核心概念](#核心概念)
4. [逻辑门方法](#逻辑门方法)
5. [扩展操作](#扩展操作)
6. [工具方法](#工具方法)
7. [工厂函数](#工厂函数)
8. [错误处理](#错误处理)
9. [类型定义](#类型定义)
10. [使用示例](#使用示例)

---

## 概述

`promise-logic` 是一个基于逻辑门概念的 Promise 组合库，通过 `and`、`or`、`xor` 等逻辑操作来组合异步任务，使代码语义更加清晰。

### 核心特性

- **逻辑语义化**：使用逻辑门概念替代 Promise API
- **零依赖**：仅依赖原生 Promise
- **全测试覆盖**：所有方法经过严格单元测试
- **错误分类明确**：统一的错误类型和错误分类
- **超时控制**：为任何 Promise 操作添加超时功能
- **TypeScript 支持**：完整的类型定义

---

## 安装

```bash
npm install promise-logic
```

---

## 核心概念

### 逻辑门

Promise-Logic 将异步组合抽象为逻辑门操作：

- **AND 门**：所有输入为真时输出为真
- **OR 门**：至少一个输入为真时输出为真
- **XOR 门**：有且仅有一个输入为真时输出为真
- **NAND 门**：所有输入为真时输出为假
- **NOR 门**：所有输入为假时输出为真
- **XNOR 门**：所有输入相同（全真或全假）时输出为真
- **MAJORITY 门**：多数输入为真时输出为真

### PromiseWithTimer

所有方法返回 `PromiseWithTimer` 实例，它包装了原生 Promise 并提供额外功能：

- `maxTimer(ms)`：添加超时控制
- `then()`、`catch()`、`finally()`：标准 Promise 方法
- `toPromise()`：转换为普通 Promise

---

## 逻辑门方法

### and

所有 Promise 必须成功，返回结果数组；任一失败则整体失败。

**语法**

```typescript
PromiseLogic.and<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>
```

**参数**

- `iterable`：Promise 或值的可迭代对象

**返回值**

- `PromiseWithTimer<T[]>`：所有 Promise 成功时的结果数组

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

PromiseLogic.and(promises)
  .then(results => {
    console.log(results); // [1, 2, 3]
  })
  .catch(error => {
    console.error('AND gate failed:', error);
  });
```

**错误类型**

- `AND_ERROR`：当任一 Promise 失败时抛出

---

### or

至少一个 Promise 成功，返回首个成功结果；全部失败则整体失败。

**语法**

```typescript
PromiseLogic.or<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T>
```

**参数**

- `iterable`：Promise 或值的可迭代对象

**返回值**

- `PromiseWithTimer<T>`：首个成功 Promise 的结果

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

const promises = [
  new Promise(resolve => setTimeout(() => resolve('fast'), 100)),
  new Promise(resolve => setTimeout(() => resolve('slow'), 200))
];

PromiseLogic.or(promises)
  .then(result => {
    console.log(result); // 'fast'
  })
  .catch(error => {
    console.error('OR gate failed:', error);
  });
```

---

### xor

有且仅有一个 Promise 成功，返回该结果；否则抛出 `XOR_ERROR`。

**语法**

```typescript
PromiseLogic.xor<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T>
```

**参数**

- `iterable`：Promise 或值的可迭代对象

**返回值**

- `PromiseWithTimer<T>`：唯一成功 Promise 的结果

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

// 主备服务调用场景
const primary = fetch('https://api.main.com/data');
const backup = fetch('https://api.backup.com/data');

PromiseLogic.xor([primary, backup])
  .then(result => {
    console.log('成功获取数据:', result);
  })
  .catch(error => {
    if (error.type === 'XOR_ERROR') {
      console.error('主备服务均成功或均失败，不符合 XOR 语义');
    }
  });
```

**错误类型**

- `XOR_ERROR`：当成功数量不等于 1 时抛出

---

### nand

所有 Promise 均失败时成功，返回成功结果数组；任一成功则整体失败。

**语法**

```typescript
PromiseLogic.nand<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>
```

**参数**

- `iterable`：Promise 或值的可迭代对象

**返回值**

- `PromiseWithTimer<T[]>`：成功 Promise 的结果数组（当不是所有都成功时）

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

const promises = [
  Promise.reject('error1'),
  Promise.reject('error2'),
  Promise.resolve('success')
];

PromiseLogic.nand(promises)
  .then(results => {
    console.log(results); // ['success']
  })
  .catch(error => {
    if (error.type === 'NAND_ERROR') {
      console.error('所有 Promise 都成功了，不符合 NAND 语义');
    }
  });
```

**错误类型**

- `NAND_ERROR`：当所有 Promise 都成功时抛出

---

### nor

所有 Promise 均失败时成功，返回空数组；任一成功则整体失败。

**语法**

```typescript
PromiseLogic.nor<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>
```

**参数**

- `iterable`：Promise 或值的可迭代对象

**返回值**

- `PromiseWithTimer<T[]>`：空数组（当所有都失败时）

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

const promises = [
  Promise.reject('error1'),
  Promise.reject('error2'),
  Promise.reject('error3')
];

PromiseLogic.nor(promises)
  .then(results => {
    console.log(results); // []
  })
  .catch(error => {
    if (error.type === 'NOR_ERROR') {
      console.error('有 Promise 成功了，不符合 NOR 语义');
    }
  });
```

**错误类型**

- `NOR_ERROR`：当有任一 Promise 成功时抛出

---

### xnor

所有 Promise 全部成功或全部失败时成功，返回成功结果数组；否则抛出 `XNOR_ERROR`。

**语法**

```typescript
PromiseLogic.xnor<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T[]>
```

**参数**

- `iterable`：Promise 或值的可迭代对象

**返回值**

- `PromiseWithTimer<T[]>`：成功 Promise 的结果数组

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

// 全部成功
const allSuccess = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

PromiseLogic.xnor(allSuccess)
  .then(results => {
    console.log(results); // [1, 2, 3]
  });

// 全部失败
const allFail = [
  Promise.reject('error1'),
  Promise.reject('error2')
];

PromiseLogic.xnor(allFail)
  .then(results => {
    console.log(results); // []
  });
```

**错误类型**

- `XNOR_ERROR`：当部分成功、部分失败时抛出

---

### majority

超过指定阈值的 Promise 成功时成功，返回成功结果数组；否则整体失败。

**语法**

```typescript
PromiseLogic.majority<T>(
  iterable: Iterable<T | PromiseLike<T>>,
  options?: { max: number }
): PromiseWithTimer<T[]>
```

**参数**

- `iterable`：Promise 或值的可迭代对象
- `options.max`：成功阈值，默认 0.5（50%），范围 0-1

**返回值**

- `PromiseWithTimer<T[]>`：成功 Promise 的结果数组

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

const services = [
  Promise.resolve('service1'),
  Promise.resolve('service2'),
  Promise.reject('service3'),
  Promise.reject('service4')
];

// 默认阈值（0.5）：需要至少3个成功
PromiseLogic.majority(services)
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error('未达到多数阈值:', error);
  });

// 自定义阈值（0.4）：需要至少2个成功
PromiseLogic.majority(services, { max: 0.4 })
  .then(results => {
    console.log(results); // ['service1', 'service2']
  });
```

**错误类型**

- `MAJORITY_ERROR`：当成功数量未达到阈值时抛出

---

## 扩展操作

### allFulfilled

返回所有成功结果作为数组，忽略失败结果。

**语法**

```typescript
PromiseLogic.allFulfilled(
  iterable: Iterable<PromiseLike<unknown>>
): PromiseWithTimer<unknown[]>
```

**参数**

- `iterable`：Promise 的可迭代对象

**返回值**

- `PromiseWithTimer<unknown[]>`：所有成功 Promise 的结果数组

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

const operations = [
  Promise.resolve('success1'),
  Promise.reject('error1'),
  Promise.resolve('success2'),
  Promise.reject('error2')
];

PromiseLogic.allFulfilled(operations)
  .then(results => {
    console.log(results); // ['success1', 'success2']
  });
```

---

### allRejected

返回所有失败结果作为数组，忽略成功结果。

**语法**

```typescript
PromiseLogic.allRejected<T>(
  iterable: Iterable<T | PromiseLike<T>>
): PromiseWithTimer<unknown[]>
```

**参数**

- `iterable`：Promise 的可迭代对象

**返回值**

- `PromiseWithTimer<unknown[]>`：所有失败 Promise 的错误原因数组

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

const operations = [
  Promise.resolve('success1'),
  Promise.reject('error1'),
  Promise.resolve('success2'),
  Promise.reject('error2')
];

PromiseLogic.allRejected(operations)
  .then(errors => {
    console.log(errors); // ['error1', 'error2']
  });
```

---

### allSettled

返回所有结果（包括成功和失败）作为数组。

**语法**

```typescript
PromiseLogic.allSettled<T>(
  iterable: Iterable<T | PromiseLike<T>>
): PromiseWithTimer<PromiseSettledResult<T>[]>
```

**参数**

- `iterable`：Promise 的可迭代对象

**返回值**

- `PromiseWithTimer<PromiseSettledResult<T>[]>`：所有 Promise 的结果数组

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

const operations = [
  Promise.resolve('success1'),
  Promise.reject('error1'),
  Promise.resolve('success2')
];

PromiseLogic.allSettled(operations)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('成功:', result.value);
      } else {
        console.log('失败:', result.reason);
      }
    });
  });
```

---

### not

反转单个 Promise 的结果：成功变失败，失败变成功。

**语法**

```typescript
PromiseLogic.not<T>(promise: PromiseLike<T>): PromiseWithTimer<unknown>
```

**参数**

- `promise`：要反转的 Promise

**返回值**

- `PromiseWithTimer<unknown>`：反转后的结果

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

// 成功的 Promise 变失败
PromiseLogic.not(Promise.resolve('success'))
  .catch(error => {
    console.log(error); // 'success'
  });

// 失败的 Promise 变成功
PromiseLogic.not(Promise.reject('error'))
  .then(result => {
    console.log(result); // 'error'
  });
```

---

## 工具方法

### race

返回第一个完成的 Promise 结果（无论成功或失败）。

**语法**

```typescript
PromiseLogic.race<T>(iterable: Iterable<T | PromiseLike<T>>): PromiseWithTimer<T>
```

**参数**

- `iterable`：Promise 或值的可迭代对象

**返回值**

- `PromiseWithTimer<T>`：第一个完成的 Promise 的结果

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

const promises = [
  new Promise(resolve => setTimeout(() => resolve('fast'), 100)),
  new Promise(resolve => setTimeout(() => resolve('slow'), 200))
];

PromiseLogic.race(promises)
  .then(result => {
    console.log(result); // 'fast'
  });
```

---

### maxTimer

为任何 Promise 操作添加超时功能（单位：毫秒）。

**注意**：`maxTimer` 只能侦听 Promise 操作的超时，不能中断和取消 Promise 操作本身，这是 JavaScript 的特性。

**语法**

```typescript
promiseWithTimer.maxTimer(ms: number): Promise<T>
```

**参数**

- `ms`：超时时间（毫秒）

**返回值**

- `Promise<T>`：带超时控制的 Promise

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

PromiseLogic.and([
  Promise.resolve(1),
  new Promise(resolve => setTimeout(resolve, 1000)),
  Promise.resolve(3)
])
.maxTimer(2000) // 2秒超时
.then(result => {
  console.log('操作在超时时间内完成:', result);
})
.catch(error => {
  console.error('操作超时或失败:', error.message);
});
```

---

## 工厂函数

### createPromiseLogic

创建自定义命名的 PromiseLogic 方法集合。

**语法**

```typescript
function createPromiseLogic(
  options?: CreatePromiseLogicOptions
): Record<string, Function>

interface CreatePromiseLogicOptions {
  prefix?: string;
  suffix?: string;
  rename?: Record<string, string>;
}
```

**参数**

- `options.prefix`：方法名前缀
- `options.suffix`：方法名后缀
- `options.rename`：方法重命名映射

**返回值**

- `Record<string, Function>`：自定义命名的方法集合

**示例**

```typescript
import { createPromiseLogic } from 'promise-logic';

// 添加前缀
const logic = createPromiseLogic({ prefix: 'logic_' });
logic.logic_and([Promise.resolve(1), Promise.resolve(2)]);

// 添加后缀
const logic = createPromiseLogic({ suffix: '_logic' });
logic.and_logic([Promise.resolve(1), Promise.resolve(2)]);

// 重命名
const logic = createPromiseLogic({
  rename: {
    and: 'all',
    or: 'any',
    xor: 'exclusive'
  }
});
logic.all([Promise.resolve(1), Promise.resolve(2)]);
logic.any([Promise.resolve(1), Promise.resolve(2)]);
logic.exclusive([Promise.resolve(1), Promise.reject(2)]);

// 组合使用
const logic = createPromiseLogic({
  prefix: 'pl_',
  suffix: '_op',
  rename: {
    and: 'all',
    or: 'any'
  }
});
logic.pl_all_op([Promise.resolve(1), Promise.resolve(2)]);
logic.pl_any_op([Promise.resolve(1), Promise.resolve(2)]);
```

**支持的方法**

- `and`
- `or`
- `not`
- `race`
- `allSettled`
- `xor`
- `nand`
- `nor`
- `xnor`
- `majority`
- `allFulfilled`
- `allRejected`

---

## 错误处理

### PromiseLogicError

所有逻辑门方法抛出的错误类型。

**属性**

- `type`：错误类型字符串
- `message`：错误描述
- `results`：所有 Promise 的结果数组

**错误类型**

| 错误类型 | 描述 |
|---------|------|
| `AND_ERROR` | AND 门失败 |
| `XOR_ERROR` | XOR 条件失败 |
| `NAND_ERROR` | NAND 条件失败 |
| `NOR_ERROR` | NOR 条件失败 |
| `XNOR_ERROR` | XNOR 条件失败 |
| `MAJORITY_ERROR` | 多数条件失败 |
| `ALL_SUCCESSFUL_ERROR` | 全部成功条件失败 |
| `ALL_FAILED_ERROR` | 全部失败条件失败 |

**示例**

```typescript
import { PromiseLogic } from 'promise-logic';

PromiseLogic.xor([
  Promise.resolve(1),
  Promise.resolve(2)
])
.catch(error => {
  if (error.type === 'XOR_ERROR') {
    console.error('XOR 错误:', error.message);
    console.error('结果:', error.results);
  }
});
```

---

## 类型定义

### FlipFlop

触发器接口（已从文档中排除，但仍在类型定义中）。

### CreatePromiseLogicOptions

工厂函数选项接口。

```typescript
interface CreatePromiseLogicOptions {
  prefix?: string;
  suffix?: string;
  rename?: Record<string, string>;
}
```

### PromiseWithTimer

带定时器的 Promise 包装类。

```typescript
class PromiseWithTimer<T> {
  maxTimer(ms: number): Promise<T>;
  then<U>(...): PromiseWithTimer<U>;
  catch<U>(...): PromiseWithTimer<U>;
  finally(...): PromiseWithTimer<T>;
  toPromise(): Promise<T>;
}
```

---

## 使用示例

### 主备服务调用（XOR）

```typescript
import { PromiseLogic } from 'promise-logic';

const primary = fetch('https://api.main.com/data');
const backup = fetch('https://api.backup.com/data');

PromiseLogic.xor([primary, backup])
  .then(result => {
    console.log('成功获取数据:', result);
  })
  .catch(error => {
    if (error.type === 'XOR_ERROR') {
      console.error('主备服务均成功或均失败');
    }
  });
```

### 多数决决策（Majority）

```typescript
import { PromiseLogic } from 'promise-logic';

const services = [
  fetch('https://api.node1.com/vote'),
  fetch('https://api.node2.com/vote'),
  fetch('https://api.node3.com/vote')
];

PromiseLogic.majority(services)
  .then(results => {
    console.log('多数服务返回成功:', results);
  });
```

### 资源竞争（OR）

```typescript
import { PromiseLogic } from 'promise-logic';

const cdnNodes = [
  fetch('https://cdn1.com/resource'),
  fetch('https://cdn2.com/resource'),
  fetch('https://cdn3.com/resource')
];

PromiseLogic.or(cdnNodes)
  .then(result => {
    console.log('从最快节点获取资源:', result);
  });
```

### 全链路校验（AND）

```typescript
import { PromiseLogic } from 'promise-logic';

const validations = [
  validateUser(),
  validateOrder(),
  validatePayment(),
  validateInventory()
];

PromiseLogic.and(validations)
  .then(results => {
    console.log('所有校验通过:', results);
  })
  .catch(error => {
    console.error('校验失败:', error);
  });
```

### 超时控制

```typescript
import { PromiseLogic } from 'promise-logic';

PromiseLogic.and([
  fetch('https://api.example.com/data'),
  fetch('https://api.example.com/metadata')
])
.maxTimer(5000) // 5秒超时
.then(results => {
  console.log('请求成功:', results);
})
.catch(error => {
  console.error('请求超时或失败:', error.message);
});
```

### 自定义工厂函数

```typescript
import { createPromiseLogic } from 'promise-logic';

const api = createPromiseLogic({
  prefix: 'api_',
  suffix: '_call',
  rename: {
    and: 'all',
    or: 'any',
    xor: 'exclusive'
  }
});

api.api_all_call([
  fetch('/api/users'),
  fetch('/api/posts')
]);

api.api_any_call([
  fetch('/api/cache'),
  fetch('/api/database')
]);
```

---

## 实际应用场景

1. **主备服务调用**
   - 使用 `xor` 确保有且仅有一个服务响应

2. **分布式决策**
   - 使用 `majority` 实现多数决共识

3. **资源竞争**
   - 使用 `or` 获取首个可用资源
   - 使用 `not` 检查资源是否可用

4. **全链路校验**
   - 使用 `and` 确保所有依赖服务均成功

5. **错误收集**
   - 使用 `allRejected` 收集所有错误
   - 使用 `allSettled` 获取完整状态

---

## 贡献指南

1. **开发环境**
   ```bash
   git clone https://github.com/xier123456/promise-logic.git
   cd promise-logic
   npm install
   ```

2. **测试**
   ```bash
   npm test
   ```

3. **提交规范**
   - 提交信息需包含 `feat:`（新功能）、`fix:`（修复）、`docs:`（文档）前缀
   - Pull Request 需附带测试用例

---

## 资源链接

- **GitHub 仓库**：https://github.com/xier123456/promise-logic
- **npm 包**：https://www.npmjs.com/package/promise-logic
- **Issue 跟踪**：https://github.com/xier123456/promise-logic/issues
