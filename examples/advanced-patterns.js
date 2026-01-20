import { PromiseLogic } from '../src/index.js';

// Advanced usage patterns
async function advancedPatterns() {
  console.log('=== PromiseLogic Advanced Patterns ===\n');

  // 1. Error handling pattern
  console.log('1. Error Handling Pattern:');
  
  // Fine-grained error handling with allSettled
  const tasks = [
    Promise.resolve('Data fetch successful'),
    Promise.reject(new Error('Network request failed')),
    Promise.resolve('Cache hit'),
    Promise.reject(new Error('Permission denied'))
  ];

  const results = await PromiseLogic.allSettled(tasks);
  
  const successful = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);
    
  const failed = results
    .filter(result => result.status === 'rejected')
    .map(result => result.reason.message);

  console.log('✅ Successful tasks:', successful);
  console.log('❌ Failed tasks:', failed);

  // 2. Race condition handling
  console.log('\n2. Race Condition Handling:');
  
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Request timeout')), 1000)
  );
  
  const apiPromise = new Promise(resolve => 
    setTimeout(() => resolve('API response data'), 500)
  );

  try {
    const raceResult = await PromiseLogic.race([apiPromise, timeoutPromise]);
    console.log('✅ Race result:', raceResult);
  } catch (error) {
    console.log('❌ Race failed:', error.message);
  }

  // 3. Fallback strategy
  console.log('\n3. Fallback Strategy:');
  
  const primaryService = Promise.reject(new Error('Primary service unavailable'));
  const backupService1 = Promise.reject(new Error('Backup service 1 unavailable'));
  const backupService2 = Promise.resolve('Backup service 2 response');

  try {
    const fallbackResult = await PromiseLogic.or([
      primaryService,
      backupService1,
      backupService2
    ]);
    console.log('✅ Fallback result:', fallbackResult);
  } catch (error) {
    console.log('❌ All services unavailable:', error.message);
  }

  // 4. Batch operations
  console.log('\n4. Batch Operations:');
  
  const batchTasks = Array.from({ length: 5 }, (_, i) => 
    Promise.resolve(`Task ${i + 1} completed`)
  );

  try {
    const batchResult = await PromiseLogic.and(batchTasks);
    console.log('✅ Batch operation result:');
    batchResult.forEach((result, index) => {
      console.log(`   Task ${index + 1}: ${result}`);
    });
  } catch (error) {
    console.log('❌ Batch operation failed:', error.message);
  }

  // 5. Conditional execution
  console.log('\n5. Conditional Execution Pattern:');
  
  const condition = true; // Simulate condition
  const conditionalTasks = [
    Promise.resolve('Mandatory task'),
    ...(condition ? [Promise.resolve('Conditional task')] : [])
  ];

  try {
    const conditionalResult = await PromiseLogic.and(conditionalTasks);
    console.log('✅ Conditional execution result:', conditionalResult);
  } catch (error) {
    console.log('❌ Conditional execution failed:', error.message);
  }

  // 6. Chained composition
  console.log('\n6. Chained Composition Pattern:');
  
  // Phase 1: Data fetching
  const dataFetching = await PromiseLogic.and([
    Promise.resolve('User data'),
    Promise.resolve('Configuration data')
  ]);
  
  console.log('Phase 1 completed:', dataFetching);

  // Phase 2: Data processing (depends on phase 1 results)
  const dataProcessing = await PromiseLogic.and([
    Promise.resolve(`Processed: ${dataFetching[0]}`),
    Promise.resolve(`Processed: ${dataFetching[1]}`)
  ]);
  
  console.log('Phase 2 completed:', dataProcessing);

  // Phase 3: Result validation
  const validation = await PromiseLogic.or([
    Promise.resolve('Validation passed'),
    Promise.reject(new Error('Validation failed'))
  ]);
  
  console.log('Phase 3 completed:', validation);
}

// Run advanced examples
advancedPatterns().catch(console.error);