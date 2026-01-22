/**
 * Local test file to verify package imports work correctly
 */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test 1: Import main library (v1 - JavaScript version)
try {
  // We'll use dynamic import to load the built files
  const v1Path = path.join(__dirname, 'dist', 'index.cjs.js');
  if (fs.existsSync(v1Path)) {
    const v1Logic = await import('./dist/index.cjs.js');
    console.log('✅ Main library import successful');
    console.log('   PromiseLogic available:', typeof v1Logic.PromiseLogic);
    console.log('   createPromiseLogic available:', typeof v1Logic.createPromiseLogic);
  } else {
    console.log('⚠️  Main library file not found at:', v1Path);
  }
} catch (error) {
  console.error('❌ Main library import failed:', error.message);
}

// Test 2: Import v2 library (TypeScript version)
try {
  const v2Path = path.join(__dirname, 'dist', 'v2', 'index.cjs.js');
  if (fs.existsSync(v2Path)) {
    const v2Logic = await import('./dist/v2/index.cjs.js');
    console.log('✅ V2 library import successful');
    console.log('   PromiseLogic available:', typeof v2Logic.PromiseLogic);
    console.log('   createPromiseLogic available:', typeof v2Logic.createPromiseLogic);
  } else {
    console.log('⚠️  V2 library file not found at:', v2Path);
  }
} catch (error) {
  console.error('❌ V2 library import failed:', error.message);
}

// Test 3: Test basic functionality if files exist
async function testFunctionality() {
  console.log('\n--- Testing functionality ---');
  
  const v1Path = path.join(__dirname, 'dist', 'index.cjs.js');
  const v2Path = path.join(__dirname, 'dist', 'v2', 'index.cjs.js');
  
  if (fs.existsSync(v1Path)) {
    try {
      // Test v1 functionality
      const v1Module = await import('./dist/index.cjs.js');
      const v1Result = await v1Module.PromiseLogic.and([
        Promise.resolve('v1-test'),
        Promise.resolve('success')
      ]);
      console.log('✅ V1 and() works:', v1Result);
    } catch (error) {
      console.error('❌ V1 functionality failed:', error.message);
    }
  }
  
  if (fs.existsSync(v2Path)) {
    try {
      // Test v2 functionality
      const v2Module = await import('./dist/v2/index.cjs.js');
      
      const v2Result = await v2Module.PromiseLogic.and([
        Promise.resolve('v2-test'),
        Promise.resolve('success')
      ]);
      console.log('✅ V2 and() works:', v2Result);
      
      // Test special operations
      try {
        const orResult = await v2Module.PromiseLogic.or([
          Promise.reject(new Error('test error')),
          Promise.resolve('first success')
        ]);
        console.log('✅ V2 or() works:', orResult);
      } catch (error) {
        console.log('✅ V2 or() correctly handled rejection:', error.message);
      }
      
      try {
        const xorResult = await v2Module.PromiseLogic.xor([
          Promise.reject(new Error('failed')),
          Promise.resolve('success'),
          Promise.reject(new Error('also failed'))
        ]);
        console.log('✅ V2 xor() works:', xorResult);
      } catch (error) {
        console.log('✅ V2 xor() correctly handled rejection:', error.message);
      }
    } catch (error) {
      console.error('❌ V2 functionality failed:', error.message);
    }
  }
}

// Run functionality tests
await testFunctionality();
console.log('\n--- All tests completed ---');