//Popup del perfil

let popup = document.querySelector(".popup");
let buttonEdit = document.querySelector(".profile__button_edit");
let buttonClose = document.querySelector(".popup__button_close");
let form = document.querySelector(".popup__container");
let name = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__profession");
let inputName = document.querySelector(".popup__input_name");
let inputAbout = document.querySelector(".popup__input_about");

function openEdit() {
  inputName.value = name.textContent;
  inputAbout.value = profession.textContent;
  popup.classList.toggle("popup_opened");
}

buttonEdit.addEventListener("click", openEdit);
buttonClose.addEventListener("click", openEdit);

function saveChange(e) {
  e.preventDefault();
  name.textContent = inputName.value;
  profession.textContent = inputAbout.value;
  openEdit();
}

form.addEventListener("submit", saveChange);

//Cartas principales

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const place = document.querySelector(".place");

initialCards.forEach((element) => {
  const card = document.createElement("div");
  card.innerHTML = `
   <div class="place__card">
    <img class="place__image" src="${element.link}" alt="${element.name}">
    <div class="place__content">
  <h2 class="place__title"> ${element.name} </h2>
                <img
                class="place__like"
                src="./images/icons/heart.svg"
                alt="Like"
              />
  </div>
  </div>
  `;
  place.appendChild(card);
});
