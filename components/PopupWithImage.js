// PopupWithImage.js
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  /**
   * @param {string} popupSelector - selector del popup
   * @param {HTMLElement|null} popupImageEl - (opcional) referencia al <img> ya buscada desde utils.js
   * @param {HTMLElement|null} popupTextEl - (opcional) referencia al párrafo de la leyenda
   */
  constructor(popupSelector, popupImageEl = null, popupTextEl = null) {
    super(popupSelector);

    // Si se pasan elementos desde fuera (utils.js), úsalos; si no, búscalos dentro del popup
    this._popupImage =
      popupImageEl || this._popup.querySelector(".popup__image");
    this._popupText =
      popupTextEl || this._popup.querySelector(".popup__paragraph");

    if (!this._popupImage || !this._popupText) {
      // No rompemos la app, pero avisamos en consola para que lo corrijas si falta algo en el HTML
      console.warn(
        "PopupWithImage: no se encontraron elementos .popup__image o .popup__paragraph"
      );
    }
  }

  /**
   * Sobrescribe open() para colocar la imagen y la leyenda antes de abrir
   * @param {{ name: string, link: string }} data
   */
  open({ name, link }) {
    if (this._popupImage) {
      this._popupImage.src = link;
      this._popupImage.alt = name;
    }
    if (this._popupText) {
      this._popupText.textContent = name;
    }
    super.open();
  }
}
