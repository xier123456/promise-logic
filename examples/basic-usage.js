import { PromiseLogic, createPromiseLogic } from '../src/index.js';

// Basic usage examples
async function basicUsage() {
  console.log('=== PromiseLogic Basic Usage Examples ===\n');

  // 1. AND logic - All promises must succeed
  console.log('1. AND Logic (All promises succeed):');
  try {
    const andResult = await PromiseLogic.and([
      Promise.resolve('Task 1 completed'),
      Promise.resolve('Task 2 completed'),
      Promise.resolve('Task 3 completed')
    ]);
    console.log('✅ AND Result:', andResult);
  } catch (error) {
    console.log('❌ AND Failed:', error.message);
  }

  // 2. OR logic - Any promise succeeds
  console.log('\n2. OR Logic (Any promise succeeds):');
  try {
    const orResult = await PromiseLogic.or([
      Promise.reject(new Error('First failed')),
      Promise.resolve('Second succeeded'),
      Promise.resolve('Third succeeded')
    ]);
    console.log('✅ OR Result:', orResult);
  } catch (error) {
    console.log('❌ OR Failed:', error.message);
  }

  // 3. RACE logic - First settled promise wins
  console.log('\n3. RACE Logic (First settled promise):');
  try {
    const raceResult = await PromiseLogic.race([
      new Promise(resolve => setTimeout(() => resolve('Slow task'), 100)),
      new Promise(resolve => setTimeout(() => resolve('Fast task'), 50))
    ]);
    console.log('✅ RACE Result:', raceResult);
  } catch (error) {
    console.log('❌ RACE Failed:', error.message);
  }

  // 4. ALL_SETTLED logic - All promises settle
  console.log('\n4. ALL_SETTLED Logic (All promises settle):');
  try {
    const settledResult = await PromiseLogic.allSettled([
      Promise.resolve('Success 1'),
      Promise.reject(new Error('Failure 1')),
      Promise.resolve('Success 2')
    ]);
    console.log('✅ ALL_SETTLED Result:');
    settledResult.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`   Task ${index + 1}: ✅ ${result.value}`);
      } else {
        console.log(`   Task ${index + 1}: ❌ ${result.reason.message}`);
      }
    });
  } catch (error) {
    console.log('❌ ALL_SETTLED Failed:', error.message);
  }

  // 5. Factory function usage
  console.log('\n5. Factory Function Usage:');
  const customLogic = createPromiseLogic({
    prefix: 'async',
    suffix: 'Logic',
    rename: { and: 'conjunction' }
  });

  console.log('Custom method names:', Object.keys(customLogic));

  try {
    const factoryResult = await customLogic.conjunction([
      Promise.resolve('Factory method 1'),
      Promise.resolve('Factory method 2')
    ]);
    console.log('✅ Factory Function Result:', factoryResult);
  } catch (error) {
    console.log('❌ Factory Function Failed:', error.message);
  }
}

// Run examples
basicUsage().catch(console.error);