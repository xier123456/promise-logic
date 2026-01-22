#!/usr/bin/env node

/**
 * Comprehensive test suite for PromiseLogic library
 * Tests all methods and edge cases
 */

import { PromiseLogic, createPromiseLogic } from '../../v1/index.js';

class PromiseLogicTestSuite {
  constructor() {
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = [];
  }

  async run() {
    console.log('=== PromiseLogic Test Suite ===\n');
    
    await this.testCoreMethods();
    await this.testAdvancedLogicMethods();
    await this.testFactoryFunction();
    await this.testErrorHandling();
    await this.testFlipFlop();
    
    this.printSummary();
  }

  async testCoreMethods() {
    console.log('1. Testing Core Methods:');
    
    await this.testMethod('AND', async () => {
      const result = await PromiseLogic.and([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
      ]);
      return JSON.stringify(result) === JSON.stringify([1, 2, 3]);
    });

    await this.testMethod('OR', async () => {
      const result = await PromiseLogic.or([
        Promise.reject('error'),
        Promise.resolve('success')
      ]);
      return result === 'success';
    });

    await this.testMethod('RACE', async () => {
      const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 10));
      const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 50));
      const result = await PromiseLogic.race([fast, slow]);
      return result === 'fast';
    });

    await this.testMethod('ALL_SETTLED', async () => {
      const result = await PromiseLogic.allSettled([
        Promise.resolve('success'),
        Promise.reject(new Error('failure'))
      ]);
      return result.length === 2 && 
             result[0].status === 'fulfilled' && 
             result[1].status === 'rejected';
    });
  }

  async testAdvancedLogicMethods() {
    console.log('\n2. Testing Advanced Logic Methods:');
    
    await this.testMethod('XOR (exactly one success)', async () => {
      const result = await PromiseLogic.xor([
        Promise.resolve('success'),
        Promise.reject('failure')
      ]);
      return result === 'success';
    });

    await this.testMethod('NAND (not all success)', async () => {
      const result = await PromiseLogic.nand([
        Promise.resolve('success'),
        Promise.reject('failure')
      ]);
      return JSON.stringify(result) === JSON.stringify(['success']);
    });

    await this.testMethod('NOR (all failure)', async () => {
      const result = await PromiseLogic.nor([
        Promise.reject('failure1'),
        Promise.reject('failure2')
      ]);
      return JSON.stringify(result) === JSON.stringify([]);
    });

    await this.testMethod('XNOR (all success or all failure)', async () => {
      const result = await PromiseLogic.xnor([
        Promise.resolve('success1'),
        Promise.resolve('success2')
      ]);
      return JSON.stringify(result) === JSON.stringify(['success1', 'success2']);
    });

    await this.testMethod('MAJORITY (majority success)', async () => {
      const result = await PromiseLogic.majority([
        Promise.resolve('success1'),
        Promise.resolve('success2'),
        Promise.reject('failure')
      ]);
      return JSON.stringify(result) === JSON.stringify(['success1', 'success2']);
    });
  }

  async testFactoryFunction() {
    console.log('\n3. Testing Factory Function:');
    
    await this.testMethod('Custom naming', async () => {
      const logic = createPromiseLogic({
        prefix: 'async',
        rename: { and: 'conjunction' }
      });
      
      const result = await logic.conjunction([
        Promise.resolve('test1'),
        Promise.resolve('test2')
      ]);
      
      return JSON.stringify(result) === JSON.stringify(['test1', 'test2']);
    });
  }

  async testErrorHandling() {
    console.log('\n4. Testing Error Handling:');
    
    await this.testMethod('XOR error (all failure)', async () => {
      try {
        await PromiseLogic.xor([
          Promise.reject('error1'),
          Promise.reject('error2')
        ]);
        return false; // Should not reach here
      } catch (error) {
        return error.type === 'XOR_ERROR';
      }
    });

    await this.testMethod('NAND error (all success)', async () => {
      try {
        await PromiseLogic.nand([
          Promise.resolve('success1'),
          Promise.resolve('success2')
        ]);
        return false;
      } catch (error) {
        return error.type === 'NAND_ERROR';
      }
    });
  }

  async testFlipFlop() {
    console.log('\n5. Testing Flip-Flop:');
    
    await this.testMethod('Initial state', () => {
      const flipFlop = PromiseLogic.createFlipFlop(true);
      return flipFlop.getState() === true;
    });

    await this.testMethod('State change', () => {
      const flipFlop = PromiseLogic.createFlipFlop(false);
      flipFlop.set(true);
      return flipFlop.getState() === true;
    });

    await this.testMethod('Toggle', () => {
      const flipFlop = PromiseLogic.createFlipFlop(false);
      flipFlop.toggle();
      return flipFlop.getState() === true;
    });
  }

  async testMethod(name, testFn) {
    this.totalTests++;
    
    try {
      const result = await testFn();
      if (result) {
        console.log(`   ✅ ${name}`);
        this.passedTests++;
      } else {
        console.log(`   ❌ ${name}`);
        this.failedTests.push(name);
      }
    } catch (error) {
      console.log(`   ❌ ${name} - Error: ${error.message}`);
      this.failedTests.push(name);
    }
  }

  printSummary() {
    console.log('\n=== Test Summary ===');
    console.log(`Total Tests: ${this.totalTests}`);
    console.log(`Passed: ${this.passedTests}`);
    console.log(`Failed: ${this.failedTests.length}`);
    
    if (this.failedTests.length > 0) {
      console.log('\nFailed Tests:');
      this.failedTests.forEach(test => console.log(`   ❌ ${test}`));
    }
    
    if (this.failedTests.length === 0) {
      console.log('\n🎉 All tests passed! PromiseLogic is ready for use.');
    } else {
      console.log('\n⚠️ Some tests failed. Please check the implementation.');
    }
  }
}

// Run the test suite
const testSuite = new PromiseLogicTestSuite();
testSuite.run().catch(error => {
  console.error('Test suite error:', error);
  process.exit(1);
});