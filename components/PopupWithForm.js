import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);

    if (!this._form) {
      throw new Error(
        `PopupWithForm: no se encontró el formulario con selector ${formSelector}`
      );
    }

    this._handleFormSubmit = handleFormSubmit;
    this._submitHandler = this._submitHandler.bind(this);
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll("input, textarea, select");
    const values = {};
    inputs.forEach((input) => {
      let key = input.name && input.name.trim() !== "" ? input.name : null;

      if (!key) {
        const classList = input.className || "";
        if (classList.includes("popup__input_name")) key = "name";
        else if (classList.includes("popup__input_about")) key = "about";
        else if (classList.includes("popup__input_link")) key = "link";
        else if (input.id) key = input.id;
        else key = `input-${Math.random().toString(36).slice(2, 8)}`;
      }

      values[key] = input.value;
    });
    return values;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
    this._form.style.display = "none";
  }

  setEventListeners() {
    this._form.addEventListener("submit", this._submitHandler);
  }
}
