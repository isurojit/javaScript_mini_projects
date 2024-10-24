// Dataset for managing the state of the calculator
const dataset = {
  currentInput: "0",
  previousInput: null,
  operator: null,
  result: null,
};

const display = document.getElementById("display");

// Update the display with the current input or result
function updateDisplay() {
  if (dataset.operator && dataset.previousInput !== null) {
    // If operator is present, show previousInput, operator, and currentInput
    display.textContent = `${dataset.previousInput} ${dataset.operator} ${dataset.currentInput}`;
  } else {
    // Otherwise, just show the current input
    display.textContent = dataset.currentInput;
  }
}

// Handle number button clicks
function handleNumber(value) {
  if (dataset.currentInput === "0") {
    dataset.currentInput = value;
  } else {
    dataset.currentInput += value;
  }
  updateDisplay(dataset.currentInput);
}

// Handle operator button clicks
function handleOperator(operator) {
  if (dataset.operator && dataset.previousInput !== null) {
    calculate(); // Perform calculation if operator is already selected
  }
  dataset.operator = operator; // Store the operator
  dataset.previousInput = dataset.currentInput; // Move the current input to previousInput
  dataset.currentInput = "0"; // Reset current input for the next number
  updateDisplay(); // Update the display to show the operator
}

// Perform the calculation
function calculate() {
  let result;
  const prev = parseFloat(dataset.previousInput);
  const current = parseFloat(dataset.currentInput);
  switch (dataset.operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  dataset.result = result;
  dataset.currentInput = result.toString();
  dataset.operator = null;
  dataset.previousInput = null;
  updateDisplay(dataset.result);
}

// Handle All Clear (AC) button click
function handleClear() {
  dataset.currentInput = "0";
  dataset.previousInput = null;
  dataset.operator = null;
  dataset.result = null;
  updateDisplay("0");
}

// Handle Delete (⌫) button click
function handleDelete() {
  if (dataset.currentInput.length > 1) {
    dataset.currentInput = dataset.currentInput.slice(0, -1);
  } else {
    dataset.currentInput = "0";
  }
  updateDisplay(dataset.currentInput);
}

// Handle decimal (.) button click
function handleDecimal() {
  if (!dataset.currentInput.includes(".")) {
    dataset.currentInput += ".";
  }
  updateDisplay(dataset.currentInput);
}

// Handle square (x²) button click
function handleSquare() {
  const current = parseFloat(dataset.currentInput);
  const squared = current * current;
  dataset.currentInput = squared.toString();
  updateDisplay(dataset.currentInput);
}

// Event listeners for number buttons
document.querySelectorAll("[data-value]").forEach((button) => {
  button.addEventListener("click", () => handleNumber(button.dataset.value));
});

// Event listeners for operator buttons
document.querySelectorAll("[data-operator]").forEach((button) => {
  button.addEventListener("click", () =>
    handleOperator(button.dataset.operator)
  );
});

// Event listener for equals button
document.getElementById("equals").addEventListener("click", calculate);

// Event listener for All Clear (AC) button
document.getElementById("clear").addEventListener("click", handleClear);

// Event listener for Delete (⌫) button
document.getElementById("delete").addEventListener("click", handleDelete);

// Event listener for decimal (.) button
document
  .querySelector('[data-value="."]')
  .addEventListener("click", handleDecimal);

// Event listener for square (x²) button
document.getElementById("square").addEventListener("click", handleSquare);
