// Popup.js
export default class Popup {
  /**
   * @param {string} popupSelector - selector CSS del popup (ej: ".popup")
   */
  constructor(popupSelector) {
    // guardar elemento del popup en this._popup (nombre utilizado por la hija)
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      throw new Error(
        `Popup: no se encontró elemento con selector ${popupSelector}`
      );
    }

    // bind de métodos para poder añadir/quitar listeners correctamente
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  // abrir popup
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // cerrar popup
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // cerrar con ESC (método privado)
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // cerrar al hacer click en overlay
  _handleOverlayClick(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  // añade listeners: botón de cierre y overlay
  setEventListeners() {
    const closeBtn = this._popup.querySelector(".popup__button_close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }
    this._popup.addEventListener("click", this._handleOverlayClick);
  }
}
