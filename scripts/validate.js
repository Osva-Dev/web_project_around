const displayFieldError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const clearFieldError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
};

const validateField = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    displayFieldError(
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    clearFieldError(formElement, inputElement);
  }
};

const hasInvalidFields = (inputList) =>
  inputList.some((input) => !input.validity.valid);

const updateSubmitButtonState = (inputList, buttonElement) => {
  if (hasInvalidFields(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.removeAttribute("disabled");
  }
};

const initializeFormValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button_save");

  updateSubmitButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      validateField(formElement, inputElement);
      updateSubmitButtonState(inputList, buttonElement);
    });
  });
};

const activateFormValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__container"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    initializeFormValidation(formElement);
  });
};

// Inicializa el sistema de validación
activateFormValidation();
