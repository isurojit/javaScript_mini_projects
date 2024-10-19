const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const cnfPasswordField = document.getElementById("cnf_password");
const form = document.getElementById("form");
const submitButton = document.getElementById("submit"); // Add a reference to the submit button
const inputFields = document.querySelectorAll("input");
const viewIcons = document.querySelectorAll(".emoji");

const errorGenerator = (message) => {
  const ele = document.createElement("small");
  ele.innerHTML = message;
  ele.classList.add("text-red-500", "block", "mt-2");
  return ele;
};

const validateInput = (input, regex, errorMessage) => {
  const value = input.value;
  const existingError = input.parentElement.querySelector("small");

  if (!regex.test(value)) {
    if (!existingError) {
      const errorElement = errorGenerator(errorMessage);
      input.parentElement.appendChild(errorElement);
    }
    return false; // Return false if invalid
  } else {
    if (existingError) {
      existingError.remove(); // Remove existing error if the input is valid
    }
    return true; // Return true if valid
  }
};

// Function to check all fields
const checkAllFields = () => {
  const isNameValid = validateInput(
    nameField,
    /^[a-zA-Z ]{2,30}$/,
    "Enter valid name"
  );
  const isEmailValid = validateInput(
    emailField,
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    "Enter valid email"
  );
  const isPasswordValid = validateInput(
    passwordField,
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
    "Minimum 8 characters, at least one uppercase, one lowercase, one digit, and one special character"
  );
  const isCnfPasswordValid = passwordField.value === cnfPasswordField.value;

  // Check if all fields are valid
  submitButton.disabled = !(
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isCnfPasswordValid
  );
};

// Attach event listeners to input fields
inputFields.forEach((input) => {
  input.addEventListener("input", checkAllFields); // Check validity on input
});

// Password confirmation check
cnfPasswordField.addEventListener("input", () => {
  const existingCnfError =
    cnfPasswordField.parentElement.querySelector("small");
  if (passwordField.value !== cnfPasswordField.value) {
    if (!existingCnfError) {
      const errorElement = errorGenerator("Password did not match");
      cnfPasswordField.parentElement.appendChild(errorElement);
    }
  } else {
    if (existingCnfError) {
      existingCnfError.remove();
    }
  }
  checkAllFields(); // Call the check function after confirming password
});

// View toggle functionality remains unchanged
viewIcons.forEach((eye) => {
  eye.addEventListener("click", () => {
    if (eye.classList.contains("password")) {
      toggleEye(passwordField, eye);
    } else if (eye.classList.contains("cnf_password")) {
      toggleEye(cnfPasswordField, eye);
    }
  });
});

function toggleEye(input, eyeIcon) {
  if (input.type === "password") {
    input.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}
