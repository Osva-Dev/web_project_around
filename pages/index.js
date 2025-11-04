import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import Popup from "../components/Popup.js";

import { initialCards } from "../utils/utils.js";

const popup = document.querySelector(".popup");
const popImg = popup.querySelector(".popup__images");
const popImage = popImg.querySelector(".popup__image");
const popTxt = popImg.querySelector(".popup__paragraph");
const formProfile = document.getElementById("form-profile");
const formPlace = document.getElementById("form-place");
const buttonEdit = document.querySelector(".profile__button_edit");
const buttonAdd = document.querySelector(".profile__button_add");
const placeSection = document.querySelector(".place");

// Instancia UserInfo (pasa los selectores de los elementos en la página)
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
});

// Instancia Popup (usar selector del popup)
const popupInstance = new Popup(".popup");
popupInstance.setEventListeners(); // añade cierre por botón y por overlay

// Crear y añadir cards iniciales
initialCards.forEach((data) => {
  const card = new Card(data);
  placeSection.prepend(card.getElement());
});

// Funciones abrir/cerrar popup (mantienen lógica de mostrar formularios/imagen)
const openPopup = (formType) => {
  popImg.style.display = "none";
  if (formType === "profile") {
    formProfile.style.display = "block";
    formPlace.style.display = "none";
    // rellenar inputs con la información actual usando UserInfo
    const { name, profession } = userInfo.getUserInfo();
    formProfile.querySelector(".popup__input_name").value = name;
    formProfile.querySelector(".popup__input_about").value = profession;
  } else {
    formPlace.style.display = "block";
    formProfile.style.display = "none";
    formPlace.reset();
  }
  popupInstance.open();
};

const closePopup = () => {
  popupInstance.close();
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "none";
};

// Inicializar popups (abrir)
buttonEdit.addEventListener("click", () => openPopup("profile"));
buttonAdd.addEventListener("click", () => openPopup("place"));

// NOTA: ya no es necesario añadir aquí listeners para cierre (overlay/ESC/botón)
// porque Popup.setEventListeners() y Popup.open()/close() lo manejan.

// Validaciones
new FormValidator(formProfile).enableValidation();
new FormValidator(formPlace).enableValidation();

// Submit formulario perfil
formProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = formProfile.querySelector(".popup__input_name").value;
  const newProfession = formProfile.querySelector(".popup__input_about").value;
  userInfo.setUserInfo({ name: newName, profession: newProfession });
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
  popupInstance.open();
});
