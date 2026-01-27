// test.js
// 测试v1版本
import { PromiseLogic } from '../../dist/index.esm.js';


// 测试v2版本
import { PromiseLogic as PromiseLogicTS } from '../../dist/v2/index.esm.js';

// 运行测试
async function test() {
  console.log('=== 测试 PromiseLogic v1 版本 ===');
  await testV1Methods();
  
  console.log('\n=== 测试 PromiseLogic v2 版本 ===');
  await testV2Methods();
}

// 测试 v1 版本方法
async function testV1Methods() {
  // 测试 and 方法
  try {
    const andResult = await PromiseLogic.and([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ])
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
}

// 测试 v2 版本方法
async function testV2Methods() {
  // 测试核心逻辑门方法
  await testCoreLogicGates();
  
  // 测试扩展操作
  await testExtendedOperations();
  
  // 测试工具方法
  await testUtilityMethods();
  
  // 测试触发器
  await testFlipFlop();
}

// 测试核心逻辑门方法
async function testCoreLogicGates() {
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
}

// 测试扩展操作
async function testExtendedOperations() {
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
  
  // 测试 not 方法
  try {
    const notResult = await PromiseLogicTS.not(Promise.reject('error'));
    console.log('not 方法测试通过:', notResult);
  } catch (error) {
    console.log('not 方法测试失败:', error.message);
  }
}

// 测试工具方法
async function testUtilityMethods() {
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
}

// 测试触发器
async function testFlipFlop() {
  console.log('\n4. 测试触发器:');
  
  try {
    // 创建触发器
    const flipFlop = PromiseLogicTS.createFlipFlop(false);
    console.log('初始状态:', flipFlop.getState());
    
    // 设置状态
    await flipFlop.set(true);
    console.log('设置后状态:', flipFlop.getState());
    
    // 切换状态
    await flipFlop.toggle();
    console.log('切换后状态:', flipFlop.getState());
    
    console.log('flipFlop 方法测试通过');
  } catch (error) {
    console.log('flipFlop 方法测试失败:', error.message);
  }
}

test().catch(console.error);