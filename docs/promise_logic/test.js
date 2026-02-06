// test.js
// 测试v1版本
import { PromiseLogic } from '../../dist/index.esm.js';

// 测试v2版本
import { PromiseLogic as PromiseLogicTS } from '../../dist/v2/index.esm.js';
import { createPromiseLogic } from '../v1/factory.js';
import { createPromiseLogic as createPromiseLogicTS } from '../../dist/v2/factory.esm.js';

// 运行测试
async function test() {
  console.log('=== 测试 PromiseLogic v1 版本 ===');
  await testV1Methods();
  
  console.log('\n=== 测试 PromiseLogic v2 版本 ===');
  await testV2Methods();
  
  console.log('\n=== 测试工厂函数 v1 版本 ===');
  await testFactoryFunctionV1();
  
  console.log('\n=== 测试工厂函数 v2 版本 ===');
  await testFactoryFunctionV2();
}

// 测试 v1 版本方法
async function testV1Methods() {
  console.log('\n1. 测试核心逻辑门方法:');
  
  // 测试 and 方法
  try {
    const andResult = await PromiseLogic.and([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ]);
    console.log('and 方法测试通过:', andResult);
  } catch (error) {
    console.log('and 方法测试失败:', error.message);
  }
  
  // 测试 or 方法
  try {
    const orResult = await PromiseLogic.or([
      Promise.reject('error1'),
      Promise.resolve('success'),
      Promise.reject('error2')
    ]);
    console.log('or 方法测试通过:', orResult);
  } catch (error) {
    console.log('or 方法测试失败:', error.message);
  }
  
  // 测试 xor 方法
  try {
    const xorResult = await PromiseLogic.xor([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('xor 方法测试通过:', xorResult);
  } catch (error) {
    console.log('xor 方法测试失败:', error.message);
  }
  
  // 测试 nand 方法
  try {
    const nandResult = await PromiseLogic.nand([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('nand 方法测试通过:', nandResult);
  } catch (error) {
    console.log('nand 方法测试失败:', error.message);
  }
  
  // 测试 nor 方法
  try {
    const norResult = await PromiseLogic.nor([
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    console.log('nor 方法测试通过:', norResult);
  } catch (error) {
    console.log('nor 方法测试失败:', error.message);
  }
  
  // 测试 xnor 方法
  try {
    const xnorResult = await PromiseLogic.xnor([
      Promise.resolve('success1'),
      Promise.resolve('success2')
    ]);
    console.log('xnor 方法测试通过:', xnorResult);
  } catch (error) {
    console.log('xnor 方法测试失败:', error.message);
  }
  
  // 测试 majority 方法
  try {
    const majorityResult = await PromiseLogic.majority([
      Promise.resolve('success1'),
      Promise.resolve('success2'),
      Promise.reject('error')
    ]);
    console.log('majority 方法测试通过:', majorityResult);
  } catch (error) {
    console.log('majority 方法测试失败:', error.message);
  }
  
  console.log('\n2. 测试扩展操作:');
  
  // 测试 allFulfilled 方法
  console.log('\n测试 allFulfilled 方法 - 验证立即返回和顺序保持:');
  try {
    const startTime = Date.now();
    console.log('开始执行 allFulfilled，时间:', startTime);
    
    const allFulfilledResult = await PromiseLogic.allFulfilled([
      new Promise(resolve => {
        console.log('第一个 Promise 开始（慢）');
        setTimeout(() => {
          console.log('第一个 Promise 完成:', 'success1');
          resolve('success1');
        }, 100);
      }),
      Promise.reject('error'),
      new Promise(resolve => {
        console.log('第三个 Promise 开始（快）');
        setTimeout(() => {
          console.log('第三个 Promise 完成:', 'success2');
          resolve('success2');
        }, 10);
      })
    ]);
    
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log('allFulfilled 方法测试通过（完整结果）:', allFulfilledResult);
    console.log('allFulfilled 结果顺序（应保持输入顺序）:', allFulfilledResult);
    console.log('allFulfilled 执行时间（应约 10ms，第三个 Promise 完成时返回）:', elapsedTime, 'ms');
    console.log('验证：第一个成功的是第三个 Promise，但完整结果按输入顺序返回');
  } catch (error) {
    console.log('allFulfilled 方法测试失败:', error.message);
  }
  
  // 测试 allRejected 方法
  try {
    const allRejectedResult = await PromiseLogic.allRejected([
      Promise.resolve('success'),
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    console.log('allRejected 方法测试通过:', allRejectedResult);
  } catch (error) {
    console.log('allRejected 方法测试失败:', error.message);
  }
  
  // 测试 allRejected 方法 - 测试初次返回和完整结果
  console.log('\n测试 allRejected 初次返回和完整结果:');
  try {
    const startTime = Date.now();
    const allRejectedResult = await PromiseLogic.allRejected([
      Promise.resolve('success1'),
      Promise.reject('fastError'),
      new Promise((_, reject) => setTimeout(() => reject('slowError'), 100)),
      Promise.reject('error3')
    ]);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log('allRejected 方法测试通过（完整结果）:', allRejectedResult);
    console.log('allRejected 结果顺序（应保持输入顺序）:', allRejectedResult);
    console.log('allRejected 执行时间（应立即返回，约 0-10ms）:', elapsedTime, 'ms');
    console.log('验证：只要有一个失败就立即返回，不等待所有 Promise 完成');
  } catch (error) {
    console.log('allRejected 方法测试失败:', error.message);
  }
  
  // 测试 allRejected 方法 - 验证立即返回行为
  console.log('\n测试 allRejected 立即返回行为:');
  try {
    const startTime = Date.now();
    const allRejectedResult = await PromiseLogic.allRejected([
      Promise.reject('first'),
      new Promise((_, reject) => setTimeout(() => reject('second'), 50)),
      new Promise((_, reject) => setTimeout(() => reject('third'), 100)),
      Promise.resolve('success')
    ]);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log('allRejected 结果:', allRejectedResult);
    console.log('allRejected 执行时间:', elapsedTime, 'ms');
    console.log('验证：应该在 0ms 左右返回（第一个失败），而不是 100ms（所有完成）');
  } catch (error) {
    console.log('allRejected 方法测试失败:', error.message);
  }
  
  // 测试 allFulfilled 方法 - 测试初次返回和完整结果
  console.log('\n测试 allFulfilled 初次返回和完整结果:');
  try {
    const startTime = Date.now();
    const allFulfilledResult = await PromiseLogic.allFulfilled([
      new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
      Promise.resolve('fast'),
      Promise.resolve('medium'),
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log('allFulfilled 方法测试通过（完整结果）:', allFulfilledResult);
    console.log('allFulfilled 结果顺序（应保持输入顺序）:', allFulfilledResult);
    console.log('allFulfilled 执行时间（应立即返回，约 0-10ms）:', elapsedTime, 'ms');
    console.log('验证：只要有一个成功就立即返回，不等待所有 Promise 完成');
  } catch (error) {
    console.log('allFulfilled 方法测试失败:', error.message);
  }
  
  // 测试 allFulfilled 方法 - 验证立即返回行为
  console.log('\n测试 allFulfilled 立即返回行为:');
  try {
    const startTime = Date.now();
    const allFulfilledResult = await PromiseLogic.allFulfilled([
      new Promise(resolve => setTimeout(() => resolve('first'), 50)),
      new Promise(resolve => setTimeout(() => resolve('second'), 100)),
      new Promise(resolve => setTimeout(() => resolve('third'), 150)),
      Promise.reject('error')
    ]);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log('allFulfilled 结果:', allFulfilledResult);
    console.log('allFulfilled 执行时间:', elapsedTime, 'ms');
    console.log('验证：应该在 50ms 左右返回（第一个成功），而不是 150ms（所有完成）');
  } catch (error) {
    console.log('allFulfilled 方法测试失败:', error.message);
  }
  
  // 测试 not 方法
  try {
    const notResult = await PromiseLogic.not(Promise.resolve('success'));
    console.log('not 方法测试通过:', notResult);
  } catch (error) {
    console.log('not 方法测试失败:', error.message);
  }
  
  console.log('\n3. 测试工具方法:');
  
  // 测试 race 方法
  try {
    const raceResult = await PromiseLogic.race([
      new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
      new Promise(resolve => setTimeout(() => resolve('fast'), 10))
    ]);
    console.log('race 方法测试通过:', raceResult);
  } catch (error) {
    console.log('race 方法测试失败:', error.message);
  }
  
  // 测试 allSettled 方法
  try {
    const allSettledResult = await PromiseLogic.allSettled([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('allSettled 方法测试通过:', allSettledResult);
  } catch (error) {
    console.log('allSettled 方法测试失败:', error.message);
  }
  
  console.log('\n4. 测试触发器:');
  
  try {
    const flipFlop = PromiseLogic.createFlipFlop(false);
    console.log('初始状态:', flipFlop.getState());
    
    await flipFlop.set(true);
    console.log('设置后状态:', flipFlop.getState());
    
    await flipFlop.toggle();
    console.log('切换后状态:', flipFlop.getState());
    
    console.log('flipFlop 方法测试通过');
  } catch (error) {
    console.log('flipFlop 方法测试失败:', error.message);
  }
  
  console.log('\n5. 测试 maxTimer:');
  
  try {
    const result = await PromiseLogic.and([
      new Promise(resolve => setTimeout(() => resolve('success'), 100)),
      Promise.resolve('fast')
    ]).maxTimer(200, '自定义超时错误, 200ms 内未完成');
    console.log('maxTimer 测试通过（未超时）:', result);
  } catch (error) {
    console.log('maxTimer 测试失败:', error.message);
  }
  
  try {
    const result = await PromiseLogic.and([
      new Promise(resolve => setTimeout(() => resolve('success'), 3000)),
      Promise.resolve('fast')
    ]).maxTimer(1000, '自定义超时错误, 1000ms 内未完成');
    console.log('maxTimer 测试通过（超时）:', result);
  } catch (error) {
    console.log('maxTimer 测试通过（超时）:', error.message);
  }
}

// 测试 v2 版本方法
async function testV2Methods() {
  console.log('\n1. 测试核心逻辑门方法:');
  
  // 测试 and 方法
  try {
    const andResult = await PromiseLogicTS.and([
      new Promise(resolve => setTimeout(() => resolve('a'), 3000)),
      Promise.resolve('b')
    ]).maxTimer(2000);
    console.log('and 方法测试通过:', andResult);
  } catch (error) {
    console.log('and 方法测试失败:', error.message);
  }
  
  // 测试 or 方法
  try {
    const orResult = await PromiseLogicTS.or([
      Promise.reject('error'),
      Promise.resolve('success')
    ]);
    console.log('or 方法测试通过:', orResult);
  } catch (error) {
    console.log('or 方法测试失败:', error.message);
  }
  
  // 测试 xor 方法
  try {
    const xorResult = await PromiseLogicTS.xor([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('xor 方法测试通过:', xorResult);
  } catch (error) {
    console.log('xor 方法测试失败:', error.message);
  }
  
  // 测试 nand 方法
  try {
    const nandResult = await PromiseLogicTS.nand([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('nand 方法测试通过:', nandResult);
  } catch (error) {
    console.log('nand 方法测试失败:', error.message);
  }
  
  // 测试 nor 方法
  try {
    const norResult = await PromiseLogicTS.nor([
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    console.log('nor 方法测试通过:', norResult);
  } catch (error) {
    console.log('nor 方法测试失败:', error.message);
  }
  
  // 测试 xnor 方法
  try {
    const xnorResult = await PromiseLogicTS.xnor([
      Promise.resolve('success1'),
      Promise.resolve('success2')
    ]);
    console.log('xnor 方法测试通过:', xnorResult);
  } catch (error) {
    console.log('xnor 方法测试失败:', error.message);
  }
  
  // 测试 majority 方法
  try {
    const majorityResult = await PromiseLogicTS.majority([
      Promise.resolve('success1'),
      Promise.resolve('success2'),
      Promise.reject('error')
    ]);
    console.log('majority 方法测试通过:', majorityResult);
  } catch (error) {
    console.log('majority 方法测试失败:', error.message);
  }
  
  console.log('\n2. 测试扩展操作:');
  
  // 测试 allFulfilled 方法
  try {
    const allFulfilledResult = await PromiseLogicTS.allFulfilled([
      Promise.resolve('success1'),
      Promise.reject('error'),
      Promise.resolve('success2')
    ]);
    console.log('allFulfilled 方法测试通过:', allFulfilledResult);
  } catch (error) {
    console.log('allFulfilled 方法测试失败:', error.message);
  }
  
  // 测试 allRejected 方法
  try {
    const allRejectedResult = await PromiseLogicTS.allRejected([
      Promise.resolve('success'),
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    console.log('allRejected 方法测试通过:', allRejectedResult);
  } catch (error) {
    console.log('allRejected 方法测试失败:', error.message);
  }
  
  // 测试 allRejected 方法 - 测试初次返回和完整结果
  console.log('\n测试 allRejected 初次返回和完整结果:');
  try {
    const startTime = Date.now();
    const allRejectedResult = await PromiseLogicTS.allRejected([
      Promise.resolve('success1'),
      Promise.reject('fastError'),
      new Promise((_, reject) => setTimeout(() => reject('slowError'), 100)),
      Promise.reject('error3')
    ]);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log('allRejected 方法测试通过（完整结果）:', allRejectedResult);
    console.log('allRejected 结果顺序（应保持输入顺序）:', allRejectedResult);
    console.log('allRejected 执行时间（v2 等待所有完成，约 100ms）:', elapsedTime, 'ms');
    console.log('验证：v2 版本等待所有 Promise 完成');
  } catch (error) {
    console.log('allRejected 方法测试失败:', error.message);
  }
  
  // 测试 allRejected 方法 - 验证等待所有完成行为
  console.log('\n测试 allRejected 等待所有完成行为:');
  try {
    const startTime = Date.now();
    const allRejectedResult = await PromiseLogicTS.allRejected([
      Promise.reject('first'),
      new Promise((_, reject) => setTimeout(() => reject('second'), 50)),
      new Promise((_, reject) => setTimeout(() => reject('third'), 100)),
      Promise.resolve('success')
    ]);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log('allRejected 结果:', allRejectedResult);
    console.log('allRejected 执行时间:', elapsedTime, 'ms');
    console.log('验证：v2 版本应该在 100ms 左右返回（所有完成）');
  } catch (error) {
    console.log('allRejected 方法测试失败:', error.message);
  }
  
  // 测试 allFulfilled 方法 - 测试初次返回和完整结果
  console.log('\n测试 allFulfilled 初次返回和完整结果:');
  try {
    const startTime = Date.now();
    const allFulfilledResult = await PromiseLogicTS.allFulfilled([
      new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
      Promise.resolve('fast'),
      Promise.resolve('medium'),
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log('allFulfilled 方法测试通过（完整结果）:', allFulfilledResult);
    console.log('allFulfilled 结果顺序（应保持输入顺序）:', allFulfilledResult);
    console.log('allFulfilled 执行时间（v2 等待所有完成，约 100ms）:', elapsedTime, 'ms');
    console.log('验证：v2 版本等待所有 Promise 完成');
  } catch (error) {
    console.log('allFulfilled 方法测试失败:', error.message);
  }
  
  // 测试 allFulfilled 方法 - 验证等待所有完成行为
  console.log('\n测试 allFulfilled 等待所有完成行为:');
  try {
    const startTime = Date.now();
    const allFulfilledResult = await PromiseLogicTS.allFulfilled([
      new Promise(resolve => setTimeout(() => resolve('first'), 50)),
      new Promise(resolve => setTimeout(() => resolve('second'), 100)),
      new Promise(resolve => setTimeout(() => resolve('third'), 150)),
      Promise.reject('error')
    ]);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log('allFulfilled 结果:', allFulfilledResult);
    console.log('allFulfilled 执行时间:', elapsedTime, 'ms');
    console.log('验证：v2 版本应该在 150ms 左右返回（所有完成）');
  } catch (error) {
    console.log('allFulfilled 方法测试失败:', error.message);
  }
  
  // 测试 not 方法
  try {
    const notResult = await PromiseLogicTS.not(Promise.reject('error'));
    console.log('not 方法测试通过:', notResult);
  } catch (error) {
    console.log('not 方法测试失败:', error.message);
  }
  
  console.log('\n3. 测试工具方法:');
  
  // 测试 race 方法
  try {
    const raceResult = await PromiseLogicTS.race([
      new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
      new Promise(resolve => setTimeout(() => resolve('fast'), 10))
    ]);
    console.log('race 方法测试通过:', raceResult);
  } catch (error) {
    console.log('race 方法测试失败:', error.message);
  }
  
  // 测试 allSettled 方法
  try {
    const allSettledResult = await PromiseLogicTS.allSettled([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('allSettled 方法测试通过:', allSettledResult);
  } catch (error) {
    console.log('allSettled 方法测试失败:', error.message);
  }
  
  console.log('\n4. 测试触发器:');
  
  try {
    const flipFlop = PromiseLogicTS.createFlipFlop(false);
    console.log('初始状态:', flipFlop.getState());
    
    await flipFlop.set(true);
    console.log('设置后状态:', flipFlop.getState());
    
    await flipFlop.toggle();
    console.log('切换后状态:', flipFlop.getState());
    
    console.log('flipFlop 方法测试通过');
  } catch (error) {
    console.log('flipFlop 方法测试失败:', error.message);
  }
  
  console.log('\n5. 测试 maxTimer:');
  
  try {
    const result = await PromiseLogicTS.and([
      new Promise(resolve => setTimeout(() => resolve('success'), 100)),
      Promise.resolve('fast')
    ]).maxTimer(200, '自定义超时错误, 200ms 内未完成');
    console.log('maxTimer 测试通过（未超时）:', result);
  } catch (error) {
    console.log('maxTimer 测试失败:', error.message);
  }
  
  try {
    const result = await PromiseLogicTS.and([
      new Promise(resolve => setTimeout(() => resolve('success'), 3000)),
      Promise.resolve('fast')
    ]).maxTimer(1000);
    console.log('maxTimer 测试通过（超时）:', result);
  } catch (error) {
    console.log('maxTimer 测试通过（超时）:', error.message);
  }
}

// 测试工厂函数 v1 版本
async function testFactoryFunctionV1() {
  console.log('\n1. 测试自定义命名的 PromiseLogic 方法:');
  
  const new_PL = createPromiseLogic({
    prefix: 'new_',
    rename: {
      and: 'andPromise',
      or: 'orPromise',
      race: 'racePromise',
      allSettled: 'allSettledPromise',
      xor: 'xorPromise',
      not: 'notPromise',
      nand: 'nandPromise',
      nor: 'norPromise',
      xnor: 'xnorPromise',
      majority: 'majorityPromise',
      allFulfilled: 'allFulfilledPromise',
      allRejected: 'allRejectedPromise'
    }
  });
  
  // 测试 and 方法
  try {
    const andResult = await new_PL.new_andPromise([
      Promise.resolve('success1'),
      Promise.resolve('success2')
    ]);
    console.log('new_andPromise 方法测试通过:', andResult);
  } catch (error) {
    console.log('new_andPromise 方法测试失败:', error.message);
  }
  
  // 测试 or 方法
  try {
    const orResult = await new_PL.new_orPromise([
      Promise.resolve('success1'),
      Promise.resolve('success2')
    ]);
    console.log('new_orPromise 方法测试通过:', orResult);
  } catch (error) {
    console.log('new_orPromise 方法测试失败:', error.message);
  }
  
  // 测试 xor 方法
  try {
    const xorResult = await new_PL.new_xorPromise([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('new_xorPromise 方法测试通过:', xorResult);
  } catch (error) {
    console.log('new_xorPromise 方法测试失败:', error.message);
  }
  
  // 测试 nand 方法
  try {
    const nandResult = await new_PL.new_nandPromise([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('new_nandPromise 方法测试通过:', nandResult);
  } catch (error) {
    console.log('new_nandPromise 方法测试失败:', error.message);
  }
  
  // 测试 nor 方法
  try {
    const norResult = await new_PL.new_norPromise([
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    console.log('new_norPromise 方法测试通过:', norResult);
  } catch (error) {
    console.log('new_norPromise 方法测试失败:', error.message);
  }
  
  // 测试 xnor 方法
  try {
    const xnorResult = await new_PL.new_xnorPromise([
      Promise.resolve('success1'),
      Promise.resolve('success2')
    ]);
    console.log('new_xnorPromise 方法测试通过:', xnorResult);
  } catch (error) {
    console.log('new_xnorPromise 方法测试失败:', error.message);
  }
  
  // 测试 majority 方法
  try {
    const majorityResult = await new_PL.new_majorityPromise([
      Promise.resolve('success1'),
      Promise.resolve('success2'),
      Promise.reject('error')
    ]);
    console.log('new_majorityPromise 方法测试通过:', majorityResult);
  } catch (error) {
    console.log('new_majorityPromise 方法测试失败:', error.message);
  }
  
  // 测试 allFulfilled 方法
  try {
    const allFulfilledResult = await new_PL.new_allFulfilledPromise([
      Promise.resolve('success1'),
      Promise.reject('error'),
      Promise.resolve('success2')
    ]);
    console.log('new_allFulfilledPromise 方法测试通过:', allFulfilledResult);
  } catch (error) {
    console.log('new_allFulfilledPromise 方法测试失败:', error.message);
  }
  
  // 测试 allRejected 方法
  try {
    const allRejectedResult = await new_PL.new_allRejectedPromise([
      Promise.resolve('success'),
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    console.log('new_allRejectedPromise 方法测试通过:', allRejectedResult);
  } catch (error) {
    console.log('new_allRejectedPromise 方法测试失败:', error.message);
  }
  
  // 测试 not 方法
  try {
    const notResult = await new_PL.new_notPromise(Promise.resolve('success'));
    console.log('new_notPromise 方法测试通过:', notResult);
  } catch (error) {
    console.log('new_notPromise 方法测试失败:', error.message);
  }
  
  // 测试 race 方法
  try {
    const raceResult = await new_PL.new_racePromise([
      new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
      new Promise(resolve => setTimeout(() => resolve('fast'), 10))
    ]);
    console.log('new_racePromise 方法测试通过:', raceResult);
  } catch (error) {
    console.log('new_racePromise 方法测试失败:', error.message);
  }
  
  // 测试 allSettled 方法
  try {
    const allSettledResult = await new_PL.new_allSettledPromise([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('new_allSettledPromise 方法测试通过:', allSettledResult);
  } catch (error) {
    console.log('new_allSettledPromise 方法测试失败:', error.message);
  }
  
  console.log('\n2. 测试不同配置的工厂函数:');
  
  // 测试只有前缀的配置
  const prefixOnly = createPromiseLogic({ prefix: 'pl_' });
  try {
    const result = await prefixOnly.pl_and([Promise.resolve(1), Promise.resolve(2)]);
    console.log('prefixOnly pl_and 方法测试通过:', result);
  } catch (error) {
    console.log('prefixOnly pl_and 方法测试失败:', error.message);
  }
  
  // 测试只有后缀的配置
  const suffixOnly = createPromiseLogic({ suffix: '_op' });
  try {
    const result = await suffixOnly.and_op([Promise.resolve(1), Promise.resolve(2)]);
    console.log('suffixOnly and_op 方法测试通过:', result);
  } catch (error) {
    console.log('suffixOnly and_op 方法测试失败:', error.message);
  }
  
  // 测试重命名的配置
  const renamedOnly = createPromiseLogic({
    rename: {
      and: 'all',
      or: 'any',
      xor: 'exclusive'
    }
  });
  try {
    const result = await renamedOnly.all([Promise.resolve(1), Promise.resolve(2)]);
    console.log('renamedOnly all 方法测试通过:', result);
  } catch (error) {
    console.log('renamedOnly all 方法测试失败:', error.message);
  }
}

// 测试工厂函数 v2 版本
async function testFactoryFunctionV2() {
  console.log('\n1. 测试自定义命名的 PromiseLogic 方法:');
  
  const new_PL = createPromiseLogicTS({
    prefix: 'new_',
    rename: {
      and: 'andPromise',
      or: 'orPromise',
      race: 'racePromise',
      allSettled: 'allSettledPromise',
      xor: 'xorPromise',
      not: 'notPromise',
      nand: 'nandPromise',
      nor: 'norPromise',
      xnor: 'xnorPromise',
      majority: 'majorityPromise',
      allFulfilled: 'allFulfilledPromise',
      allRejected: 'allRejectedPromise'
    }
  });
  
  // 测试 and 方法
  try {
    const andResult = await new_PL.new_andPromise([
      Promise.resolve('success1'),
      Promise.resolve('success2')
    ]);
    console.log('new_andPromise 方法测试通过:', andResult);
  } catch (error) {
    console.log('new_andPromise 方法测试失败:', error.message);
  }
  
  // 测试 or 方法
  try {
    const orResult = await new_PL.new_orPromise([
      Promise.resolve('success1'),
      Promise.resolve('success2')
    ]);
    console.log('new_orPromise 方法测试通过:', orResult);
  } catch (error) {
    console.log('new_orPromise 方法测试失败:', error.message);
  }
  
  // 测试 xor 方法
  try {
    const xorResult = await new_PL.new_xorPromise([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('new_xorPromise 方法测试通过:', xorResult);
  } catch (error) {
    console.log('new_xorPromise 方法测试失败:', error.message);
  }
  
  // 测试 nand 方法
  try {
    const nandResult = await new_PL.new_nandPromise([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('new_nandPromise 方法测试通过:', nandResult);
  } catch (error) {
    console.log('new_nandPromise 方法测试失败:', error.message);
  }
  
  // 测试 nor 方法
  try {
    const norResult = await new_PL.new_norPromise([
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    console.log('new_norPromise 方法测试通过:', norResult);
  } catch (error) {
    console.log('new_norPromise 方法测试失败:', error.message);
  }
  
  // 测试 xnor 方法
  try {
    const xnorResult = await new_PL.new_xnorPromise([
      Promise.resolve('success1'),
      Promise.resolve('success2')
    ]);
    console.log('new_xnorPromise 方法测试通过:', xnorResult);
  } catch (error) {
    console.log('new_xnorPromise 方法测试失败:', error.message);
  }
  
  // 测试 majority 方法
  try {
    const majorityResult = await new_PL.new_majorityPromise([
      Promise.resolve('success1'),
      Promise.resolve('success2'),
      Promise.reject('error')
    ]);
    console.log('new_majorityPromise 方法测试通过:', majorityResult);
  } catch (error) {
    console.log('new_majorityPromise 方法测试失败:', error.message);
  }
  
  // 测试 allFulfilled 方法
  try {
    const allFulfilledResult = await new_PL.new_allFulfilledPromise([
      Promise.resolve('success1'),
      Promise.reject('error'),
      Promise.resolve('success2')
    ]);
    console.log('new_allFulfilledPromise 方法测试通过:', allFulfilledResult);
  } catch (error) {
    console.log('new_allFulfilledPromise 方法测试失败:', error.message);
  }
  
  // 测试 allRejected 方法
  try {
    const allRejectedResult = await new_PL.new_allRejectedPromise([
      Promise.resolve('success'),
      Promise.reject('error1'),
      Promise.reject('error2')
    ]);
    console.log('new_allRejectedPromise 方法测试通过:', allRejectedResult);
  } catch (error) {
    console.log('new_allRejectedPromise 方法测试失败:', error.message);
  }
  
  // 测试 not 方法
  try {
    const notResult = await new_PL.new_notPromise(Promise.resolve('success'));
    console.log('new_notPromise 方法测试通过:', notResult);
  } catch (error) {
    console.log('new_notPromise 方法测试失败:', error.message);
  }
  
  // 测试 race 方法
  try {
    const raceResult = await new_PL.new_racePromise([
      new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
      new Promise(resolve => setTimeout(() => resolve('fast'), 10))
    ]);
    console.log('new_racePromise 方法测试通过:', raceResult);
  } catch (error) {
    console.log('new_racePromise 方法测试失败:', error.message);
  }
  
  // 测试 allSettled 方法
  try {
    const allSettledResult = await new_PL.new_allSettledPromise([
      Promise.resolve('success'),
      Promise.reject('error')
    ]);
    console.log('new_allSettledPromise 方法测试通过:', allSettledResult);
  } catch (error) {
    console.log('new_allSettledPromise 方法测试失败:', error.message);
  }
  
  console.log('\n2. 测试不同配置的工厂函数:');
  
  // 测试只有前缀的配置
  const prefixOnly = createPromiseLogicTS({ prefix: 'pl_' });
  try {
    const result = await prefixOnly.pl_and([Promise.resolve(1), Promise.resolve(2)]);
    console.log('prefixOnly pl_and 方法测试通过:', result);
  } catch (error) {
    console.log('prefixOnly pl_and 方法测试失败:', error.message);
  }
  
  // 测试只有后缀的配置
  const suffixOnly = createPromiseLogicTS({ suffix: '_op' });
  try {
    const result = await suffixOnly.and_op([Promise.resolve(1), Promise.resolve(2)]);
    console.log('suffixOnly and_op 方法测试通过:', result);
  } catch (error) {
    console.log('suffixOnly and_op 方法测试失败:', error.message);
  }
  
  // 测试重命名的配置
  const renamedOnly = createPromiseLogicTS({
    rename: {
      and: 'all',
      or: 'any',
      xor: 'exclusive'
    }
  });
  try {
    const result = await renamedOnly.all([Promise.resolve(1), Promise.resolve(2)]);
    console.log('renamedOnly all 方法测试通过:', result);
  } catch (error) {
    console.log('renamedOnly all 方法测试失败:', error.message);
  }
}

test().catch(console.error);
