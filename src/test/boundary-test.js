// 边界情况测试脚本
import { PromiseLogic } from '../../dist/index.esm.js';
import { PromiseLogic as PromiseLogicTS } from '../../dist/v2/index.esm.js';

async function testBoundaryCases() {
  console.log('=== 测试边界情况 ===\n');

  // 测试 allFulfilled 边界情况
  console.log('1. 测试 allFulfilled 边界情况:');
  
  // 测试 1: 空数组
  console.log('\n测试 1: allFulfilled 处理空数组');
  try {
    const result = await PromiseLogic.allFulfilled([]);
    console.log('✓ 测试通过: 空数组返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  // 测试 2: 所有 promise 都 reject
  console.log('\n测试 2: allFulfilled 处理所有 promise 都 reject 的情况');
  try {
    const result = await PromiseLogic.allFulfilled([
      Promise.reject('error1'),
      Promise.reject('error2'),
      Promise.reject('error3')
    ]);
    console.log('✓ 测试通过: 所有 reject 返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  // 测试 3: 混合情况
  console.log('\n测试 3: allFulfilled 处理混合情况');
  try {
    const result = await PromiseLogic.allFulfilled([
      Promise.resolve('success1'),
      Promise.reject('error'),
      Promise.resolve('success2')
    ]);
    console.log('✓ 测试通过: 混合情况返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  // 测试 4: 单个 reject
  console.log('\n测试 4: allFulfilled 处理单个 reject');
  try {
    const result = await PromiseLogic.allFulfilled([
      Promise.reject('error')
    ]);
    console.log('✓ 测试通过: 单个 reject 返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  // 测试 allRejected 边界情况
  console.log('\n2. 测试 allRejected 边界情况:');
  
  // 测试 1: 空数组
  console.log('\n测试 1: allRejected 处理空数组');
  try {
    const result = await PromiseLogic.allRejected([]);
    console.log('✓ 测试通过: 空数组返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  // 测试 2: 所有 promise 都 resolve
  console.log('\n测试 2: allRejected 处理所有 promise 都 resolve 的情况');
  try {
    const result = await PromiseLogic.allRejected([
      Promise.resolve('success1'),
      Promise.resolve('success2'),
      Promise.resolve('success3')
    ]);
    console.log('✓ 测试通过: 所有 resolve 返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  // 测试 3: 混合情况
  console.log('\n测试 3: allRejected 处理混合情况');
  try {
    const result = await PromiseLogic.allRejected([
      Promise.reject('error1'),
      Promise.resolve('success'),
      Promise.reject('error2')
    ]);
    console.log('✓ 测试通过: 混合情况返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  // 测试 4: 单个 resolve
  console.log('\n测试 4: allRejected 处理单个 resolve');
  try {
    const result = await PromiseLogic.allRejected([
      Promise.resolve('success')
    ]);
    console.log('✓ 测试通过: 单个 resolve 返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  // 测试 v2 版本
  console.log('\n3. 测试 v2 版本边界情况:');
  
  // 测试 v2 allFulfilled 空数组
  console.log('\n测试 v2 allFulfilled 处理空数组');
  try {
    const result = await PromiseLogicTS.allFulfilled([]);
    console.log('✓ 测试通过: 空数组返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  // 测试 v2 allRejected 空数组
  console.log('\n测试 v2 allRejected 处理空数组');
  try {
    const result = await PromiseLogicTS.allRejected([]);
    console.log('✓ 测试通过: 空数组返回', result);
  } catch (error) {
    console.log('✗ 测试失败:', error.message);
  }

  console.log('\n=== 边界情况测试完成 ===');
}

// 运行测试
testBoundaryCases().catch(console.error);
