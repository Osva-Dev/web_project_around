import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";

import {
  initialCards,
  popImage,
  popTxt,
  popImg,
  formProfile,
  formPlace,
  buttonEdit,
  buttonAdd,
  placeSection,
} from "../utils/utils.js";
// Instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
});

// Instancia Popup (para formularios)
const popupInstance = new Popup(".popup");
popupInstance.setEventListeners();

// Instancia PopupWithImage (para ver imágenes ampliadas)
const popupImageInstance = new PopupWithImage(".popup", popImage, popTxt);
popupImageInstance.setEventListeners();

// Crear y añadir las cards iniciales
initialCards.forEach((data) => {
  const card = new Card(data);
  placeSection.prepend(card.getElement());
});

// Función para abrir el popup según tipo (perfil o lugar)
const openPopup = (formType) => {
  popImg.style.display = "none";

  if (formType === "profile") {
    formProfile.style.display = "block";
    formPlace.style.display = "none";

    // Rellenar inputs con la información actual del usuario
    const { name, profession } = userInfo.getUserInfo();
    formProfile.querySelector(".popup__input_name").value = name;
    formProfile.querySelector(".popup__input_about").value = profession;
  } else if (formType === "place") {
    formPlace.style.display = "block";
    formProfile.style.display = "none";
    formPlace.reset();
  }

  popupInstance.open();
};

// Función para cerrar el popup
const closePopup = () => {
  popupInstance.close();
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "none";
};

// Botones para abrir popups
buttonEdit.addEventListener("click", () => openPopup("profile"));
buttonAdd.addEventListener("click", () => openPopup("place"));

// Validación de formularios
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

// Mostrar imagen al hacer clic en una card
placeSection.addEventListener("card:imageClick", (e) => {
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "block";

  // Llama al método open() de PopupWithImage
  popupImageInstance.open({
    name: e.detail.name,
    link: e.detail.link,
  });
});
