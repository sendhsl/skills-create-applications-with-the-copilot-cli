#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations: add (+), sub (-), mul (*), div (/)

function printUsage() {
  console.log("Usage:");
  console.log("  node src/calculator.js add 1 2 3    # -> 6");
  console.log("  node src/calculator.js sub 10 4     # -> 6");
  console.log("  node src/calculator.js mul 2 3 4    # -> 24");
  console.log("  node src/calculator.js div 12 3     # -> 4");
  console.log("  node src/calculator.js mod 10 3     # -> 1");
  console.log("  node src/calculator.js pow 2 8      # -> 256");
  console.log("  node src/calculator.js sqrt 16      # -> 4");
  console.log("Operators may also be symbols: + - * / %");
}

// Core functions (exported for testing)
function doAdd(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

function doSub(nums) {
  // sequential subtraction: e.g., sub 10 3 2 => (10 - 3) - 2
  if (nums.length === 0) throw new Error('sub requires at least one operand');
  return nums.reduce((a, b) => a - b);
}

function doMul(nums) {
  return nums.reduce((a, b) => a * b, 1);
}

function doDiv(nums) {
  // sequential division: e.g., div 100 2 5 => (100 / 2) / 5
  if (nums.length === 0) throw new Error('div requires at least one operand');
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === 0) {
      throw new Error('Division by zero');
    }
  }
  return nums.reduce((a, b) => a / b);
}

// Export functions for unit tests and other modules
const addition = doAdd; // compatibility alias expected by external checks
const multiplication = doMul; // compatibility alias expected by external checks

// New utility functions requested in feature request
function modulo(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('modulo requires numeric arguments');
  }
  if (b === 0) {
    throw new Error('Modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  if (typeof base !== 'number' || typeof exponent !== 'number') {
    throw new Error('power requires numeric arguments');
  }
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (typeof n !== 'number') {
    throw new Error('squareRoot requires a numeric argument');
  }
  if (n < 0) {
    throw new Error('squareRoot of negative number');
  }
  return Math.sqrt(n);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    doAdd,
    doSub,
    doMul,
    doDiv,
    addition,
    multiplication,
    modulo,
    power,
    squareRoot,
    printUsage,
  };
}

// CLI entrypoint - run only when executed directly
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printUsage();
    process.exit(1);
  }

  const op = args[0].toLowerCase();
  const rawOperands = args.slice(1);

  if (rawOperands.length === 0) {
    console.error('Error: No operands provided.');
    printUsage();
    process.exit(1);
  }

  const operands = rawOperands.map((s) => {
    const n = Number(s);
    if (Number.isNaN(n)) {
      console.error(`Error: Invalid number: ${s}`);
      process.exit(1);
    }
    return n;
  });

  let result;
  try {
    switch (op) {
      case 'add':
      case '+':
        result = doAdd(operands);
        break;
      case 'sub':
      case '-':
        result = doSub(operands);
        break;
      case 'mul':
      case '*':
      case 'x':
      case 'X':
        result = doMul(operands);
        break;
      case 'div':
      case '/':
        result = doDiv(operands);
        break;
      case 'mod':
      case '%':
        if (operands.length < 2) throw new Error('mod requires two operands');
        result = modulo(operands[0], operands[1]);
        break;
      case 'pow':
      case 'power':
        if (operands.length < 2) throw new Error('power requires base and exponent');
        result = power(operands[0], operands[1]);
        break;
      case 'sqrt':
      case 'sqrt':
        if (operands.length < 1) throw new Error('sqrt requires one operand');
        result = squareRoot(operands[0]);
        break;
      case 'help':
      case '--help':
      case '-h':
        printUsage();
        process.exit(0);
      default:
        console.error(`Error: Unknown operator: ${op}`);
        printUsage();
        process.exit(1);
    }
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(2);
  }

  // Print result (use default toString for numbers)
  if (Number.isFinite(result)) {
    console.log(result);
    process.exit(0);
  } else {
    console.error('Error: Result is not a finite number.');
    process.exit(1);
  }
}
