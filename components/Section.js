// Section.js
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = Array.isArray(items) ? items : [];
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    if (!this._container) {
      throw new Error(
        `Section: no se encontró el contenedor con selector ${containerSelector}`
      );
    }
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, prepend = true) {
    if (!(element instanceof HTMLElement)) {
      throw new Error(
        "Section.addItem: el parámetro element debe ser un HTMLElement"
      );
    }
    if (prepend) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
