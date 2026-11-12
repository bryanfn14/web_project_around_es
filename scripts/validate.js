const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputsList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector),
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector,
  );
  toggleButtonState(inputsList, submitButton);

  inputsList.forEach((input) =>
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input);
      toggleButtonState(inputsList, submitButton);
    }),
  );
};

export const resetValidation = (formElement) => {
  const inputsList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector),
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector,
  );

  inputsList.forEach((input) => {
    hideInputError(formElement, input);
  });

  toggleButtonState(inputsList, submitButton);
};

export const enableValidation = () => {
  const formList = document.querySelectorAll(validationConfig.formSelector);

  formList.forEach(function (form) {
    form.setAttribute("novalidate", "");
    setEventListeners(form);
  });
};
