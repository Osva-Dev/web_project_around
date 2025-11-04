// Popup.js
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

    // Bind para que _handleEscClose tenga el contexto correcto al añadirse/quitarse como listener
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  // Método público para abrir el popup
  open() {
    this._popupElement.classList.add("popup_opened");
    // añadir listener para cerrar con ESC mientras esté abierto
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Método público para cerrar el popup
  close() {
    this._popupElement.classList.remove("popup_opened");
    // limpiar listener ESC al cerrar
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Método privado: cierra el popup al pulsar Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Manejador para clicks en el overlay (área sombreada)
  _handleOverlayClick(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  // Manejador para el botón de cierre
  _handleCloseButtonClick() {
    this.close();
  }

  /**
   * Agrega los event listeners:
   * - click en el botón de cierre interno (selector .popup__button_close dentro del popup)
   * - click sobre el overlay (cerrar si target === popup)
   *
   * Este método debe llamarse una vez después de instanciar el Popup.
   */
  setEventListeners() {
    // botón de cierre dentro del popup
    const closeBtn = this._popupElement.querySelector(".popup__button_close");
    if (closeBtn) {
      closeBtn.addEventListener("click", this._handleCloseButtonClick);
    }

    // click en overlay
    this._popupElement.addEventListener("click", this._handleOverlayClick);
  }
}
