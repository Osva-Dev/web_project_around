import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js"; // ajusta la ruta si hace falta

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

// Estado inicial: ocultar todo dentro del popup (evita ver formularios al cargar)
formProfile.style.display = "none";
formPlace.style.display = "none";
popImg.style.display = "none";

// Instancia PopupWithImage (para ver imágenes ampliadas)
const popupImageInstance = new PopupWithImage(".popup", popImage, popTxt);
popupImageInstance.setEventListeners();

// Instancia PopupWithForm para el formulario de perfil
// Instancia PopupWithForm para el formulario de perfil
const profilePopup = new PopupWithForm(
  ".popup",
  "#form-profile", // selector del formulario dentro del popup
  (inputValues) => {
    // Aceptamos ambos posibles keys: name + about  (o name + profession si usas ese name)
    const newName = inputValues.name ?? inputValues["popup__input_name"] ?? "";
    // el input del "about" puede llamarse 'about' o 'profession' o 'popup__input_about'
    const newProfession =
      inputValues.about ??
      inputValues.profession ??
      inputValues["popup__input_about"] ??
      "";

    // Solo setear si hay datos (evita sobreescribir con undefined)
    if (newName !== "") {
      userInfo.setUserInfo({ name: newName, profession: newProfession });
    }

    profilePopup.close();
  }
);

// Instancia PopupWithForm para el formulario de añadir lugar
const placePopup = new PopupWithForm(".popup", "#form-place", (inputValues) => {
  // Aceptar tanto 'link' como 'about' para URL
  const name = inputValues.name ?? inputValues["popup__input_name"] ?? "";
  const link =
    inputValues.link ??
    inputValues.about ??
    inputValues["popup__input_about"] ??
    "";

  if (name && link) {
    const card = new Card({ name, link });
    placeSection.prepend(card.getElement());
  }
  placePopup.close();
});

// Añadir event listeners (submit...) para las instancias con formularios
profilePopup.setEventListeners();
placePopup.setEventListeners();

// Crear y añadir las cards iniciales
initialCards.forEach((data) => {
  const card = new Card(data);
  placeSection.prepend(card.getElement());
});

// Función para abrir el popup según tipo (perfil o lugar)
// ahora llamamos a open() en la instancia correspondiente
const openPopup = (formType) => {
  // ocultar todo primero (evita solapamientos)
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "none";

  if (formType === "profile") {
    // rellenar inputs con la información actual usando UserInfo
    const { name, profession } = userInfo.getUserInfo();
    formProfile.querySelector(".popup__input_name").value = name;
    formProfile.querySelector(".popup__input_about").value = profession;

    // mostrar solo el form de perfil y abrir
    formProfile.style.display = "block";
    profilePopup.open();
  } else if (formType === "place") {
    formPlace.reset();
    formPlace.style.display = "block";
    placePopup.open();
  } else if (formType === "image") {
    // mostrar solo la vista de imagen
    popImg.style.display = "block";
    popupImageInstance.open();
  }
};

// Botones para abrir popups
buttonEdit.addEventListener("click", () => openPopup("profile"));
buttonAdd.addEventListener("click", () => openPopup("place"));

// Validación de formularios
new FormValidator(formProfile).enableValidation();
new FormValidator(formPlace).enableValidation();

// Ya NO necesitamos los listeners directos de submit en index.js porque
// PopupWithForm.setEventListeners() se encarga de añadir el submit handler.

// Mostrar imagen al hacer clic en una card
placeSection.addEventListener("card:imageClick", (e) => {
  // Ocultar formularios y mostrar solo la imagen
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "block";

  // Llama al método open() de PopupWithImage con los datos
  popupImageInstance.open({
    name: e.detail.name,
    link: e.detail.link,
  });
});
