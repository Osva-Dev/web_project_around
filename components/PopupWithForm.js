import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleForm) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._handleForm = handleForm;
  }
}
