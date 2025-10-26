import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popup = document.querySelector(".popup");
const buttonClose = popup.querySelector(".popup__button_close");
const popImg = popup.querySelector(".popup__images");
const popImage = popImg.querySelector(".popup__image");
const popTxt = popImg.querySelector(".popup__paragraph");

const formProfile = document.getElementById("form-profile");
const formPlace = document.getElementById("form-place");

const nameEl = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const buttonEdit = document.querySelector(".profile__button_edit");
const buttonAdd = document.querySelector(".profile__button_add");

const placeSection = document.querySelector(".place");

// Cards iniciales
const initialCards = [
  { name: "Valle de Yosemite", link: "./images/places/Valle_de_Yosemite.jpg" },
  { name: "Lago Louise", link: "./images/places/Lago_Louise.png" },
  { name: "Montañas Calvas", link: "./images/places/Montañas_Calvas.png" },
  { name: "Latemar", link: "./images/places/Latemar.png" },
  {
    name: "Parque Nacional de la Vanoise",
    link: "./images/places/Vanois__National.png",
  },
  { name: "Lago di Braies", link: "./images/places/Lago_di_Braes.png" },
];

// Crear y añadir cards iniciales
initialCards.forEach((data) => {
  const card = new Card(data);
  placeSection.prepend(card.getElement());
});

// Funciones abrir/cerrar popup
const openPopup = (formType) => {
  popImg.style.display = "none";
  if (formType === "profile") {
    formProfile.style.display = "block";
    formPlace.style.display = "none";
    formProfile.querySelector(".popup__input_name").value = nameEl.textContent;
    formProfile.querySelector(".popup__input_about").value =
      profession.textContent;
  } else {
    formPlace.style.display = "block";
    formProfile.style.display = "none";
    formPlace.reset();
  }
  popup.classList.add("popup_opened");
};

const closePopup = () => {
  popup.classList.remove("popup_opened");
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "none";
};

// Inicializar popups
buttonEdit.addEventListener("click", () => openPopup("profile"));
buttonAdd.addEventListener("click", () => openPopup("place"));
buttonClose.addEventListener("click", closePopup);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popup.classList.contains("popup_opened"))
    closePopup();
});
popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopup();
});

// Validaciones
new FormValidator(formProfile).enableValidation();
new FormValidator(formPlace).enableValidation();

// Submit formulario perfil
formProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  nameEl.textContent = formProfile.querySelector(".popup__input_name").value;
  profession.textContent = formProfile.querySelector(
    ".popup__input_about"
  ).value;
  closePopup();
});

// Submit formulario lugar
formPlace.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = formPlace.querySelector(".popup__input_name").value;
  const link = formPlace.querySelector(".popup__input_about").value;
  if (name && link) {
    const card = new Card({ name, link });
    placeSection.prepend(card.getElement());
    closePopup();
  }
});

// CustomEvent para imagen
placeSection.addEventListener("card:imageClick", (e) => {
  popImage.src = e.detail.link;
  popImage.alt = e.detail.name;
  popTxt.textContent = e.detail.name;
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "block";
  popup.classList.add("popup_opened");
});
