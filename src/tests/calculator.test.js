const { doAdd, doSub, doMul, doDiv, modulo, power, squareRoot } = require('../calculator');

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

  // New tests for extended operations
  describe('Extended operations: modulo, power, squareRoot', () => {
    test('modulo returns remainder (5 % 2 => 1)', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('modulo with negative numbers', () => {
      expect(modulo(-5, 2)).toBe(-1);
    });

    test('modulo by zero throws', () => {
      expect(() => modulo(10, 0)).toThrow(/modulo by zero/i);
    });

    test('power computes base^exponent (2^8 => 256)', () => {
      expect(power(2, 8)).toBe(256);
    });

    test('power with zero exponent returns 1', () => {
      expect(power(5, 0)).toBe(1);
    });

    test('power with negative exponent returns fractional result', () => {
      expect(power(2, -1)).toBeCloseTo(0.5);
    });

    test('squareRoot returns correct root (sqrt(16) => 4)', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('squareRoot of 0 is 0', () => {
      expect(squareRoot(0)).toBe(0);
    });

    test('squareRoot of negative number throws', () => {
      expect(() => squareRoot(-4)).toThrow(/negative/i);
    });
  });
});
