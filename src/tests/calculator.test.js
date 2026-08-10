const { doAdd, doSub, doMul, doDiv } = require('../calculator');

describe('Calculator core functions', () => {
  test('adds numbers (2 + 3)', () => {
    expect(doAdd([2, 3])).toBe(5);
  });

  test('subtracts numbers (10 - 4)', () => {
    expect(doSub([10, 4])).toBe(6);
  });

  test('multiplies numbers (45 * 2)', () => {
    expect(doMul([45, 2])).toBe(90);
  });

  test('divides numbers (20 / 5)', () => {
    expect(doDiv([20, 5])).toBe(4);
  });

  test('addition with multiple operands', () => {
    expect(doAdd([1, 2, 3, 4])).toBe(10);
  });

  test('multiplication with multiple operands', () => {
    expect(doMul([2, 3, 4])).toBe(24);
  });

  test('sequential subtraction (20 - 5 - 3)', () => {
    expect(doSub([20, 5, 3])).toBe(12);
  });

  test('sequential division (100 / 2 / 5)', () => {
    expect(doDiv([100, 2, 5])).toBe(10);
  });

  test('division by zero throws', () => {
    expect(() => doDiv([10, 0])).toThrow(/division by zero/i);
  });

  test('sub with no operands throws', () => {
    expect(() => doSub([])).toThrow(/requires at least one operand/i);
  });

  test('div with no operands throws', () => {
    expect(() => doDiv([])).toThrow(/requires at least one operand/i);
  });
});
