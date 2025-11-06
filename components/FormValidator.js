export default class FormValidator {
  constructor(formElement) {
    this.form = formElement;
    this.inputList = Array.from(this.form.querySelectorAll(".popup__input"));
    this.button = this.form.querySelector(".popup__button_save");
  }

  _showError(input, message) {
    const error = input.nextElementSibling;
    input.classList.add("popup__input_type_error");
    if (error) error.textContent = message;
  }

  _hideError(input) {
    const error = input.nextElementSibling;
    input.classList.remove("popup__input_type_error");
    if (error) error.textContent = "";
  }

  _validateField(input) {
    if (!input.validity.valid) this._showError(input, input.validationMessage);
    else this._hideError(input);
  }

  _hasInvalidFields() {
    return this.inputList.some((input) => !input.validity.valid);
  }

  _updateButtonState() {
    if (this._hasInvalidFields()) {
      this.button.classList.add("popup__button_disabled");
      this.button.setAttribute("disabled", "");
    } else {
      this.button.classList.remove("popup__button_disabled");
      this.button.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    this._updateButtonState();
    this.inputList.forEach((input) =>
      input.addEventListener("input", () => {
        this._validateField(input);
        this._updateButtonState();
      })
    );
  }

  enableValidation() {
    this._setEventListeners();
  }
}
