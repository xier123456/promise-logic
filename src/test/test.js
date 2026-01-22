// test.js
// import { PromiseLogic } from 'promise-logic';

// // 测试v2版本
// import { PromiseLogic  } from 'promise-logic/typescript';

// 运行测试
async function test() {
  const result = await PromiseLogic.and([
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3)
  ]);
  console.log('v1 result:', result);
  
  const tsResult = await PromiseLogicTS.and([
    Promise.resolve('a'),
    Promise.resolve('b')
  ]);
  console.log('v2 result:', tsResult);
}

test().catch(console.error);