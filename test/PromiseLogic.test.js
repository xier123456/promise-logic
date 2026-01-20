import { PromiseLogic } from '../src/PromiseLogic.js';

describe('PromiseLogic', () => {
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

  describe('allSettled (Promise.allSettled)', () => {
    test('should resolve with all settlement results', async () => {
      const p1 = Promise.resolve('Success');
      const p2 = Promise.reject(new Error('Failed'));
      const p3 = Promise.resolve('Another success');
      
      const result = await PromiseLogic.allSettled([p1, p2, p3]);
      expect(result).toEqual([
        { status: 'fulfilled', value: 'Success' },
        { status: 'rejected', reason: new Error('Failed') },
        { status: 'fulfilled', value: 'Another success' }
      ]);
    });
  });

  describe('xor (exclusive or)', () => {
    test('should resolve when exactly one promise fulfills', async () => {
      const fulfilled = Promise.resolve('success');
      const rejected = Promise.reject(new Error('failure'));
      
      const result = await PromiseLogic.xor([fulfilled, rejected]);
      expect(result).toBe('success');
    });

    test('should reject with XOR_ERROR when all reject', async () => {
      const p1 = Promise.reject(new Error('err1'));
      const p2 = Promise.reject(new Error('err2'));
      
      await expect(PromiseLogic.xor([p1, p2]))
        .rejects.toMatchObject({ type: 'XOR_ERROR' });
    });

    test('should reject with XOR_ERROR when multiple fulfill', async () => {
      const p1 = Promise.resolve('success1');
      const p2 = Promise.resolve('success2');
      const p3 = Promise.reject(new Error('failure'));
      
      await expect(PromiseLogic.xor([p1, p2, p3]))
        .rejects.toMatchObject({ type: 'XOR_ERROR' });
    });
  });

  describe('nand (not and)', () => {
    test('should resolve when not all promises fulfill', async () => {
      const p1 = Promise.resolve('success');
      const p2 = Promise.reject(new Error('failure'));
      
      const result = await PromiseLogic.nand([p1, p2]);
      expect(result).toEqual(['success']);
    });

    test('should reject with NAND_ERROR when all promises fulfill', async () => {
      const p1 = Promise.resolve('success1');
      const p2 = Promise.resolve('success2');
      
      await expect(PromiseLogic.nand([p1, p2]))
        .rejects.toMatchObject({ type: 'NAND_ERROR' });
    });

    test('should return empty array when all reject', async () => {
      const p1 = Promise.reject(new Error('err1'));
      const p2 = Promise.reject(new Error('err2'));
      
      const result = await PromiseLogic.nand([p1, p2]);
      expect(result).toEqual([]);
    });
  });

  describe('nor (not or)', () => {
    test('should resolve with empty array when all promises reject', async () => {
      const p1 = Promise.reject(new Error('err1'));
      const p2 = Promise.reject(new Error('err2'));
      
      const result = await PromiseLogic.nor([p1, p2]);
      expect(result).toEqual([]);
    });

    test('should reject with NOR_ERROR when any promise fulfills', async () => {
      const p1 = Promise.reject(new Error('failure'));
      const p2 = Promise.resolve('success');
      
      await expect(PromiseLogic.nor([p1, p2]))
        .rejects.toMatchObject({ type: 'NOR_ERROR' });
    });
  });

  describe('xnor (exclusive nor)', () => {
    test('should resolve when all promises fulfill', async () => {
      const p1 = Promise.resolve('success1');
      const p2 = Promise.resolve('success2');
      
      const result = await PromiseLogic.xnor([p1, p2]);
      expect(result).toEqual(['success1', 'success2']);
    });

    test('should resolve with empty array when all promises reject', async () => {
      const p1 = Promise.reject(new Error('err1'));
      const p2 = Promise.reject(new Error('err2'));
      
      const result = await PromiseLogic.xnor([p1, p2]);
      expect(result).toEqual([]);
    });

    test('should reject with XNOR_ERROR when mixed results', async () => {
      const p1 = Promise.resolve('success');
      const p2 = Promise.reject(new Error('failure'));
      
      await expect(PromiseLogic.xnor([p1, p2]))
        .rejects.toMatchObject({ type: 'XNOR_ERROR' });
    });
  });

  describe('majority', () => {
    test('should resolve when majority of promises fulfill', async () => {
      const p1 = Promise.resolve('success1');
      const p2 = Promise.resolve('success2');
      const p3 = Promise.reject(new Error('failure'));
      
      const result = await PromiseLogic.majority([p1, p2, p3]);
      expect(result).toEqual(['success1', 'success2']);
    });

    test('should reject with MAJORITY_ERROR when minority fulfill', async () => {
      const p1 = Promise.resolve('success');
      const p2 = Promise.reject(new Error('err1'));
      const p3 = Promise.reject(new Error('err2'));
      
      await expect(PromiseLogic.majority([p1, p2, p3]))
        .rejects.toMatchObject({ type: 'MAJORITY_ERROR' });
    });

    test('should reject when exactly half fulfill (edge case)', async () => {
      const p1 = Promise.resolve('success');
      const p2 = Promise.reject(new Error('failure'));
      
      await expect(PromiseLogic.majority([p1, p2]))
        .rejects.toMatchObject({ type: 'MAJORITY_ERROR' });
    });
  });

  describe('createFlipFlop', () => {
    test('should create flip-flop with initial state', () => {
      const flipFlop = PromiseLogic.createFlipFlop(true);
      expect(flipFlop.getState()).toBe(true);
    });

    test('should set new state', () => {
      const flipFlop = PromiseLogic.createFlipFlop(false);
      flipFlop.set(true);
      expect(flipFlop.getState()).toBe(true);
    });

    test('should toggle state', () => {
      const flipFlop = PromiseLogic.createFlipFlop(false);
      flipFlop.toggle();
      expect(flipFlop.getState()).toBe(true);
      flipFlop.toggle();
      expect(flipFlop.getState()).toBe(false);
    });

    test('should wait for state change', async () => {
      const flipFlop = PromiseLogic.createFlipFlop(false);
      
      setTimeout(() => flipFlop.set(true), 10);
      
      const result = await flipFlop.waitForChange();
      expect(result).toBe(true);
    });

    test('should wait for specific state', async () => {
      const flipFlop = PromiseLogic.createFlipFlop(false);
      
      setTimeout(() => flipFlop.set(true), 10);
      
      const result = await flipFlop.waitFor(true);
      expect(result).toBe(true);
    });

    test('should resolve immediately if already in target state', async () => {
      const flipFlop = PromiseLogic.createFlipFlop(true);
      
      const result = await flipFlop.waitFor(true);
      expect(result).toBe(true);
    });
  });
});