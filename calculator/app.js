// dataset for managing calculator
const dataset = {
  currentInput: "0",
  previousInput: null,
  operator: null,
  result: null,
};

const display = document.querySelector(".display");

//update the current display with current input
const updateDisplay = (value) => {
  display.textContent = value;
};

//Handle the number button click
const handleNumber = (value) => {
  if (dataset.currentInput === 0) {
    dataset.currentInput = value;
  } else {
    dataset.currentInput += value;
  }
  updateDisplay(dataset.currentInput);
};

//Handle Operator button clicks
const handleOperator = (operator) => {
  if (dataset.operator && dataset.previousInput !== null) {
    calculate();
  }
  dataset.operator = operator;
  dataset.previousInput = dataset.currentInput;
  dataset.currentInput = "0";
};

//Perform the calculation
const calculate = () => {
  let result;
  const prev = parseInt(dataset.previousInput);
  const cur = parseInt(dataset.currentInput);

  switch (dataset.operator) {
    case "+":
      result = prev + cur;
      break;
    case "-":
      result = prev - cur;
      break;
    case "*":
      result = prev * cur;
      break;
    case "/":
      result = prev / cur;
      break;
    default:
      return;
  }
  dataset.result = result;
  dataset.currentInput = result.toString();
  dataset.operator = null;
  dataset.previousInput = null;
  updateDisplay(dataset.result);
};

//Handle All clear button
const handleClear = () => {
  dataset.currentInput = "0";
  dataset.operator = null;
  dataset.previousInput = null;
  dataset.result = null;
  updateDisplay("0");
};

//Handle Delete (⌫) button click
const handleDelete = () => {
  if (dataset.currentInput.length > 1) {
    dataset.currentInput = dataset.currentInput.slice(0, -1);
  } else {
    dataset.currentInput = "0";
  }
  updateDisplay(dataset.currentInput);
};

//handle decimal (.) button click
const handleDecimal = () => {
  if (!dataset.currentInput.includes(".")) {
    dataset.currentInput += ".";
  }
  updateDisplay(dataset.currentInput);
};

// Handle square (x²) button click
const handleSquare = () => {
  const current = parseFloat(dataset.currentInput);
  const squared = current * current;
  dataset.currentInput = squared.toString();
  updateDisplay(dataset.currentInput);
};
