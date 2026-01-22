/**
 * 正确的TypeScript功能测试文件
 * 参考v1版本的测试方式编写
 */

import { PromiseLogic } from '../../v2/PromiseLogic';

describe('PromiseLogic TypeScript Version', () => {
  describe('and (Promise.all)', () => {
    test('should resolve with all values when all promises fulfill', async () => {
      const p1 = Promise.resolve(1);
      const p2 = Promise.resolve(2);
      const p3 = Promise.resolve(3);
      
      const result = await PromiseLogic.and([p1, p2, p3]);
      expect(result).toEqual([1, 2, 3]);
    });

    test('should reject when any promise rejects', async () => {
      const p1 = Promise.resolve(1);
      const p2 = Promise.reject(new Error('Failed'));
      const p3 = Promise.resolve(3);
      
      await expect(PromiseLogic.and([p1, p2, p3])).rejects.toThrow('Failed');
    });
  });

  describe('or (Promise.any)', () => {
    test('should resolve with first fulfilled promise', async () => {
      const p1 = Promise.reject(new Error('First failed'));
      const p2 = Promise.resolve('Success');
      const p3 = Promise.resolve('Also success');
      
      const result = await PromiseLogic.or([p1, p2, p3]);
      expect(result).toBe('Success');
    });

    test('should reject when all promises reject', async () => {
      const p1 = Promise.reject(new Error('Error 1'));
      const p2 = Promise.reject(new Error('Error 2'));
      
      await expect(PromiseLogic.or([p1, p2])).rejects.toThrow();
    });
  });

  describe('race (Promise.race)', () => {
    test('should resolve with first settled promise', async () => {
      const p1 = new Promise(resolve => setTimeout(() => resolve('First'), 100));
      const p2 = new Promise(resolve => setTimeout(() => resolve('Second'), 50));
      
      const result = await PromiseLogic.race([p1, p2]);
      expect(result).toBe('Second');
    });

    test('should reject with first rejected promise', async () => {
      const p1 = new Promise((_, reject) => setTimeout(() => reject(new Error('First failed')), 100));
      const p2 = new Promise((_, reject) => setTimeout(() => reject(new Error('Second failed')), 50));
      
      await expect(PromiseLogic.race([p1, p2])).rejects.toThrow('Second failed');
    });
  });

  describe('xor (exclusive or)', () => {
    test('should resolve when exactly one promise fulfills', async () => {
      const p1 = Promise.reject(new Error('Failed'));
      const p2 = Promise.resolve('Success');
      const p3 = Promise.reject(new Error('Also failed'));
      
      const result = await PromiseLogic.xor([p1, p2, p3]);
      expect(result).toBe('Success');
    });

    test('should reject when no promises fulfill', async () => {
      const p1 = Promise.reject(new Error('Error 1'));
      const p2 = Promise.reject(new Error('Error 2'));
      
      await expect(PromiseLogic.xor([p1, p2])).rejects.toThrow();
    });

    test('should reject when multiple promises fulfill', async () => {
      const p1 = Promise.resolve('First');
      const p2 = Promise.resolve('Second');
      
      await expect(PromiseLogic.xor([p1, p2])).rejects.toThrow();
    });
  });

  describe('nand (not and)', () => {
    test('should resolve when not all promises fulfill', async () => {
      const p1 = Promise.resolve('Success');
      const p2 = Promise.reject(new Error('Failed'));
      
      const result = await PromiseLogic.nand([p1, p2]);
      expect(result).toEqual(['Success']);
    });

    test('should reject when all promises fulfill', async () => {
      const p1 = Promise.resolve('First');
      const p2 = Promise.resolve('Second');
      
      await expect(PromiseLogic.nand([p1, p2])).rejects.toThrow();
    });
  });

  describe('nor (not or)', () => {
    test('should resolve when all promises reject', async () => {
      const p1 = Promise.reject(new Error('Error 1'));
      const p2 = Promise.reject(new Error('Error 2'));
      
      const result = await PromiseLogic.nor([p1, p2]);
      expect(result).toEqual([]);
    });

    test('should reject when any promise fulfills', async () => {
      const p1 = Promise.resolve('Success');
      const p2 = Promise.reject(new Error('Failed'));
      
      await expect(PromiseLogic.nor([p1, p2])).rejects.toThrow();
    });
  });

  describe('xnor (exclusive nor)', () => {
    test('should resolve when all promises have same outcome', async () => {
      const p1 = Promise.resolve('Success');
      const p2 = Promise.resolve('Also success');
      
      const result = await PromiseLogic.xnor([p1, p2]);
      expect(result).toEqual(['Success', 'Also success']);
    });

    test('should reject when promises have mixed outcomes', async () => {
      const p1 = Promise.resolve('Success');
      const p2 = Promise.reject(new Error('Failed'));
      
      await expect(PromiseLogic.xnor([p1, p2])).rejects.toThrow();
    });
  });

  describe('majority', () => {
    test('should resolve with majority fulfilled values', async () => {
      const p1 = Promise.resolve('First');
      const p2 = Promise.resolve('Second');
      const p3 = Promise.reject(new Error('Failed'));
      
      const result = await PromiseLogic.majority([p1, p2, p3]);
      expect(result).toEqual(['First', 'Second']);
    });

    test('should reject when no majority', async () => {
      const p1 = Promise.resolve('First');
      const p2 = Promise.reject(new Error('Failed'));
      const p3 = Promise.reject(new Error('Also failed'));
      
      await expect(PromiseLogic.majority([p1, p2, p3])).rejects.toThrow();
    });
  });

  describe('not', () => {
    test('should invert successful promise to failure', async () => {
      const successfulPromise = Promise.resolve('Success');
      
      await expect(PromiseLogic.not(successfulPromise)).rejects.toBe('Success');
    });

    test('should invert failed promise to success', async () => {
      const failedPromise = Promise.reject(new Error('Failed'));
      
      const result = await PromiseLogic.not(failedPromise);
      expect(result).toEqual(new Error('Failed'));
    });
  });

  describe('allSettled', () => {
    test('should return all settlement results', async () => {
      const p1 = Promise.resolve('Success');
      const p2 = Promise.reject(new Error('Failed'));
      const p3 = Promise.resolve('Another success');
      
      const results = await PromiseLogic.allSettled([p1, p2, p3]);
      
      expect(results).toHaveLength(3);
      expect(results[0]).toEqual({ status: 'fulfilled', value: 'Success' });
      expect(results[1]).toEqual({ status: 'rejected', reason: new Error('Failed') });
      expect(results[2]).toEqual({ status: 'fulfilled', value: 'Another success' });
    });
  });

  describe('allFulfilled', () => {
    test('should resolve with all fulfilled values', async () => {
      const p1 = Promise.resolve(1);
      const p2 = Promise.resolve(2);
      const p3 = Promise.reject(new Error('Failed'));
      
      const result = await PromiseLogic.allFulfilled([p1, p2, p3]);
      expect(result).toEqual([1, 2]);
    });
  });

  describe('allRejected', () => {
    test('should resolve with all rejection reasons', async () => {
      const p1 = Promise.reject(new Error('Error 1'));
      const p2 = Promise.reject(new Error('Error 2'));
      const p3 = Promise.resolve('Success');
      
      const result = await PromiseLogic.allRejected([p1, p2, p3]);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(new Error('Error 1'));
      expect(result[1]).toEqual(new Error('Error 2'));
    });
  });

  describe('createFlipFlop', () => {
    test('should create flip-flop with initial state', () => {
      const flipFlop = PromiseLogic.createFlipFlop(true);
      expect(flipFlop.getState()).toBe(true);
    });

    test('should toggle state', async () => {
      const flipFlop = PromiseLogic.createFlipFlop(false);
      await flipFlop.toggle();
      expect(flipFlop.getState()).toBe(true);
    });

    test('should set state', async () => {
      const flipFlop = PromiseLogic.createFlipFlop(false);
      await flipFlop.set(true);
      expect(flipFlop.getState()).toBe(true);
    });
  });
});