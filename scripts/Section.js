export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._rederedItems = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
}
