const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const password2 = document.querySelector(".password2");

const btn = document.querySelector(".submit");
const form = document.querySelector(".form");

// Function for showing error message
const showError = function (input, message) {
  const formControl = input.parentElement;

  formControl.classList.add("error");
  formControl.classList.remove("success");

  const small = formControl.querySelector("small");
  small.innerText = message;
};

//  Function for success
const showSuccess = function (input) {
  const formControl = input.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
};

const checkRequired = function (inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const getFieldName = function (input) {
  return input.className.charAt(0).toUpperCase() + input.className.slice(1);
};

// Email validation function
const validateEmail = (input) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid!");
  }
};

// To check minimum length required for form input
const checkLength = function (input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be more than ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// To check for password match
const checkPasswordMatch = function (input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Password do not match`);
  }
};

// Adding eventlistener to form element
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  validateEmail(email);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkPasswordMatch(password, password2);
});
