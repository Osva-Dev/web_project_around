export default class Card {
  #data;
  #element;
  _handleCardClick;
  _handleLikeClick;

  constructor(data, handleCardClick, handleLikeClick) {
    this.#data = data;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this.#create();
  }

  #create() {
    const template = document
      .querySelector("#tpl-card")
      .content.firstElementChild.cloneNode(true);
    this.#element = template;

    this.#element.querySelector(".place__title").textContent = this.#data.name;

    const imgEl = this.#element.querySelector(".place__image");
    imgEl.src = this.#data.link;
    imgEl.alt = this.#data.name;

    // Inicializar estado visual del like
    const likeBtn = this.#element.querySelector(".place__like");
    likeBtn.src = this.#data.isLiked
      ? "./images/icons/heart-complete.svg"
      : "./images/icons/heart.svg";

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.#element
      .querySelector(".place__like")
      .addEventListener("click", () => this.#toggleLike());
    this.#element
      .querySelector(".place__delete")
      .addEventListener("click", () => this.#deleteCard());
    this.#element
      .querySelector(".place__image")
      .addEventListener("click", () => this.#showImage());
  }

  #toggleLike() {
    if (!this._handleLikeClick) return;

    this._handleLikeClick(this.#data._id, this.#data.isLiked)
      .then((updatedCard) => {
        this.#data.isLiked = updatedCard.isLiked;

        const likeBtn = this.#element.querySelector(".place__like");
        likeBtn.src = updatedCard.isLiked
          ? "./images/icons/heart-complete.svg"
          : "./images/icons/heart.svg";
      })
      .catch((err) => console.error(err));
  }

  #deleteCard() {
    this.#element.remove();
  }

  #showImage() {
    if (typeof this._handleCardClick === "function") {
      this._handleCardClick({ name: this.#data.name, link: this.#data.link });
    }
  }

  getElement() {
    return this.#element;
  }
}
