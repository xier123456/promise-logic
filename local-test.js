// 测试 PromiseLogic 是否正常工作
import { PromiseLogic } from 'promise-logic';

// 测试 AND 逻辑
console.log('测试 AND 逻辑:');
PromiseLogic.and([
  Promise.resolve('成功1'),
  Promise.resolve('成功2'),
  Promise.resolve('成功3')
]).then(result => {
  console.log('AND 结果:', result);
}).catch(error => {
  console.log('AND 错误:', error);
});

// 测试 OR 逻辑
console.log('\n测试 OR 逻辑:');
PromiseLogic.or([
  Promise.reject('失败1'),
  Promise.resolve('成功2'),
  Promise.reject('失败3')
]).then(result => {
  console.log('OR 结果:', result);
}).catch(error => {
  console.log('OR 错误:', error);
});

// 测试 RACE 逻辑
console.log('\n测试 RACE 逻辑:');
PromiseLogic.race([
  new Promise(resolve => setTimeout(() => resolve('延迟2秒'), 2000)),
  new Promise(resolve => setTimeout(() => resolve('延迟1秒'), 1000)),
  new Promise(resolve => setTimeout(() => resolve('延迟3秒'), 3000))
]).then(result => {
  console.log('RACE 结果:', result);
});

// 测试 XOR 逻辑
console.log('\n测试 XOR 逻辑:');
// 测试恰好一个成功的情况
PromiseLogic.xor([
  Promise.reject('失败1'),
  Promise.resolve('成功2'),
  Promise.reject('失败3')
]).then(result => {
  console.log('XOR 结果 (恰好一个成功):', result);
}).catch(error => {
  console.log('XOR 错误 (恰好一个成功):', error.message);
});

// 测试 NOT 逻辑
console.log('\n测试 NOT 逻辑:');
// 测试反转成功的 Promise
PromiseLogic.not(Promise.resolve('成功')).then(result => {
  console.log('NOT 结果 (反转成功):', result);
}).catch(error => {
  console.log('NOT 错误 (反转成功):', error);
});

// 测试反转失败的 Promise
PromiseLogic.not(Promise.reject('失败')).then(result => {
  console.log('NOT 结果 (反转失败):', result);
}).catch(error => {
  console.log('NOT 错误 (反转失败):', error);
});

// 测试 MAJORITY 逻辑
console.log('\n测试 MAJORITY 逻辑:');
// 测试多数成功的情况
PromiseLogic.majority([
  Promise.resolve('成功1'),
  Promise.resolve('成功2'),
  Promise.reject('失败3')
]).then(result => {
  console.log('MAJORITY 结果 (多数成功):', result);
}).catch(error => {
  console.log('MAJORITY 错误 (多数成功):', error.message);
});

// 测试 ALL_FULFILLED 逻辑
console.log('\n测试 ALL_FULFILLED 逻辑:');
PromiseLogic.allFulfilled([
  Promise.resolve('成功1'),
  Promise.reject('失败2'),
  Promise.resolve('成功3')
]).then(result => {
  console.log('ALL_FULFILLED 结果:', result);
});

// 测试 ALL_REJECTED 逻辑
console.log('\n测试 ALL_REJECTED 逻辑:');
PromiseLogic.allRejected([
  Promise.reject('失败1'),
  Promise.resolve('成功2'),
  Promise.reject('失败3')
]).then(result => {
  console.log('ALL_REJECTED 结果:', result);
});

console.log('\n测试完成，查看结果...');

