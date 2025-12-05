export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    if (!this._popup) {
      throw new Error(`Popup: no se encontró el selector ${popupSelector}`);
    }

    this._buttonClose = this._popup.querySelector(".popup__button_close");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    if (this._buttonClose) {
      this._buttonClose.addEventListener("click", () => this.close());
    }

    this._popup.addEventListener("mousedown", this._handleOverlayClose);
  }
}
