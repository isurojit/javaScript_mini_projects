const descriptionInput = document.getElementById("description");
const categorySelect = document.getElementById("category");
const amountInput = document.getElementById("amount");
const btn = document.getElementById("submit-btn");

btn.addEventListener("click", trackExpense);

const errorMsg = (msg, pos) => {
  // Remove any existing error message
  const existingError = pos.parentElement.querySelector("small");
  if (existingError) {
    existingError.remove();
  }

  // Add the new error message
  const error = document.createElement("small");
  error.classList.add("text-red-500", "block", "mt-2");
  error.innerHTML = `${msg}`;
  pos.parentElement.appendChild(error);
};

function trackExpense(e) {
  e.preventDefault();
  const description = descriptionInput.value;
  const category = categorySelect.value;
  const amount = amountInput.value;

  // Validate fields and show single error message if necessary
  const fields = [descriptionInput, categorySelect, amountInput];
  let hasError = false;

  fields.forEach((input) => {
    if (input.id === "description" && input.value === "") {
      errorMsg("Please enter a description", input);
      hasError = true;
    } else if (input.id === "category" && input.value === "") {
      errorMsg("Please select a category", input);
      hasError = true;
    } else if (input.id === "amount" && input.value === "") {
      errorMsg("Please enter an amount", input);
      hasError = true;
    }
  });

  // Stop if any field has an error
  if (hasError) return;

  // Add entry to the table if no errors are present
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="p-2 border border-gray-300">${description}</td>
    <td class="p-2 border border-gray-300">${category}</td> 
    <td class="p-2 border border-gray-300">${amount}</td>`;

  const expenseTable = document.getElementById("expense-table");
  expenseTable.appendChild(row);

  // Clear the form inputs
  descriptionInput.value = "";
  categorySelect.value = "";
  amountInput.value = "";
}
