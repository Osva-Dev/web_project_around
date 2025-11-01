import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupText) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupText = popupText;
  }
}
