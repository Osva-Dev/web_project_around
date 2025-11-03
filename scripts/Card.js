export class Card {
  #data;
  #element;

  constructor(data) {
    this.#data = data;
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
    const likeBtn = this.#element.querySelector(".place__like");
    likeBtn.src = likeBtn.src.includes("heart.svg")
      ? "./images/icons/heart-complete.svg"
      : "./images/icons/heart.svg";
  }

  #deleteCard() {
    this.#element.remove();
  }

  #showImage() {
    const event = new CustomEvent("card:imageClick", {
      detail: { name: this.#data.name, link: this.#data.link },
      bubbles: true,
    });
    this.#element.dispatchEvent(event);
  }

  getElement() {
    return this.#element;
  }
}
