#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations: add (+), sub (-), mul (*), div (/)

const args = process.argv.slice(2);

function printUsage() {
  console.log("Usage:");
  console.log("  node src/calculator.js add 1 2 3    # -> 6");
  console.log("  node src/calculator.js sub 10 4     # -> 6");
  console.log("  node src/calculator.js mul 2 3 4    # -> 24");
  console.log("  node src/calculator.js div 12 3     # -> 4");
  console.log("Operators may also be symbols: + - * /");
}

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

function doAdd(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

function doSub(nums) {
  // sequential subtraction: e.g., sub 10 3 2 => (10 - 3) - 2
  return nums.reduce((a, b) => a - b);
}

function doMul(nums) {
  return nums.reduce((a, b) => a * b, 1);
}

function doDiv(nums) {
  // sequential division: e.g., div 100 2 5 => (100 / 2) / 5
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === 0) {
      console.error('Error: Division by zero encountered.');
      process.exit(2);
    }
  }
  return nums.reduce((a, b) => a / b);
}

let result;
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

// Print result (use default toString for numbers)
if (Number.isFinite(result)) {
  console.log(result);
  process.exit(0);
} else {
  console.error('Error: Result is not a finite number.');
  process.exit(1);
}
