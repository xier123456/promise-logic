import { createPromiseLogic } from '../src/factory.js';

describe('createPromiseLogic', () => {
  test('should create object with default method names', () => {
    const logic = createPromiseLogic();
    
    expect(logic).toHaveProperty('and');
    expect(logic).toHaveProperty('or');
    expect(logic).toHaveProperty('race');
    expect(logic).toHaveProperty('allSettled');
    expect(logic).toHaveProperty('xor');
    expect(logic).toHaveProperty('nand');
    expect(logic).toHaveProperty('nor');
    expect(logic).toHaveProperty('xnor');
    expect(logic).toHaveProperty('majority');
  });

  test('should apply prefix to method names', () => {
    const logic = createPromiseLogic({ prefix: 'async' });
    
    expect(logic).toHaveProperty('asyncand');
    expect(logic).toHaveProperty('asyncor');
    expect(logic).toHaveProperty('asyncrace');
  });

  test('should apply suffix to method names', () => {
    const logic = createPromiseLogic({ suffix: 'Logic' });
    
    expect(logic).toHaveProperty('andLogic');
    expect(logic).toHaveProperty('orLogic');
    expect(logic).toHaveProperty('raceLogic');
  });

  test('should apply custom rename mapping', () => {
    const logic = createPromiseLogic({
      rename: {
        and: 'all',
        or: 'any',
        race: 'first'
      }
    });
    
    expect(logic).toHaveProperty('all');
    expect(logic).toHaveProperty('any');
    expect(logic).toHaveProperty('first');
    expect(logic).not.toHaveProperty('and');
    expect(logic).not.toHaveProperty('or');
    expect(logic).not.toHaveProperty('race');
  });

  test('should combine prefix, suffix, and rename', () => {
    const logic = createPromiseLogic({
      prefix: 'async',
      suffix: 'Logic',
      rename: {
        and: 'conjunction',
        or: 'disjunction'
      }
    });
    
    expect(logic).toHaveProperty('asyncconjunctionLogic');
    expect(logic).toHaveProperty('asyncdisjunctionLogic');
    expect(logic).toHaveProperty('asyncraceLogic');
  });

  test('created methods should work correctly', async () => {
    const logic = createPromiseLogic();
    
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);
    
    const result = await logic.and([p1, p2]);
    expect(result).toEqual([1, 2]);
  });
});