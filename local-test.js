/**
 * Local test file to verify package imports work correctly
 */

// Test 1: Import main library (v1 - JavaScript version)
try {
  const v1Logic = require('./dist/index.cjs.js');
  console.log('✅ Main library import successful');
  console.log('   PromiseLogic available:', typeof v1Logic.PromiseLogic);
  console.log('   createPromiseLogic available:', typeof v1Logic.createPromiseLogic);
} catch (error) {
  console.error('❌ Main library import failed:', error.message);
}

// Test 2: Import v2 library (TypeScript version)
try {
  const v2Logic = require('./dist/v2/index.cjs.js');
  console.log('✅ V2 library import successful');
  console.log('   PromiseLogic available:', typeof v2Logic.PromiseLogic);
  console.log('   createPromiseLogic available:', typeof v2Logic.createPromiseLogic);
} catch (error) {
  console.error('❌ V2 library import failed:', error.message);
}

// Test 3: Test basic functionality
async function testFunctionality() {
  console.log('\n--- Testing functionality ---');
  
  try {
    // Test v1 functionality
    const v1Result = await require('./dist/index.cjs.js').PromiseLogic.and([
      Promise.resolve('v1-test'),
      Promise.resolve('success')
    ]);
    console.log('✅ V1 and() works:', v1Result);
  } catch (error) {
    console.error('❌ V1 functionality failed:', error.message);
  }
  
  try {
    // Test v2 functionality
    const v2Result = await require('./dist/v2/index.cjs.js').PromiseLogic.and([
      Promise.resolve('v2-test'),
      Promise.resolve('success')
    ]);
    console.log('✅ V2 and() works:', v2Result);
  } catch (error) {
    console.error('❌ V2 functionality failed:', error.message);
  }
  
  // Test special operations
  try {
    const orResult = await require('./dist/v2/index.cjs.js').PromiseLogic.or([
      Promise.reject(new Error('test error')),
      Promise.resolve('first success')
    ]);
    console.log('✅ V2 or() works:', orResult);
  } catch (error) {
    console.error('❌ V2 or() failed:', error.message);
  }
  
  try {
    const xorResult = await require('./dist/v2/index.cjs.js').PromiseLogic.xor([
      Promise.reject(new Error('failed')),
      Promise.resolve('success'),
      Promise.reject(new Error('also failed'))
    ]);
    console.log('✅ V2 xor() works:', xorResult);
  } catch (error) {
    console.error('❌ V2 xor() failed:', error.message);
  }
}

// Run functionality tests
testFunctionality().then(() => {
  console.log('\n--- All tests completed ---');
}).catch(console.error);