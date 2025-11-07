import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImageEl = null, popupTextEl = null) {
    super(popupSelector);

    this._popupImage =
      popupImageEl || this._popup.querySelector(".popup__image");
    this._popupText =
      popupTextEl || this._popup.querySelector(".popup__paragraph");
    this._imagesContainer = this._popup.querySelector(".popup__images");
  }

  open({ name, link } = {}) {
    if (this._popupImage && link !== undefined && name !== undefined) {
      this._popupImage.src = link;
      this._popupImage.alt = name;
    }
    if (this._popupText && name !== undefined) {
      this._popupText.textContent = name;
    }
    if (this._imagesContainer) {
      this._imagesContainer.style.display = "block";
    }
    super.open();
  }

  close() {
    super.close();
    if (this._imagesContainer) {
      this._imagesContainer.style.display = "none";
    }
  }
}
