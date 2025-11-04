export const popup = document.querySelector(".popup");
export const buttonClose = popup.querySelector(".popup__button_close");
export const popImg = popup.querySelector(".popup__images");
export const popImage = popImg.querySelector(".popup__image");
export const popTxt = popImg.querySelector(".popup__paragraph");

export const formProfile = document.getElementById("form-profile");
export const formPlace = document.getElementById("form-place");

export const nameEl = document.querySelector(".profile__name");
export const profession = document.querySelector(".profile__profession");
export const buttonEdit = document.querySelector(".profile__button_edit");
export const buttonAdd = document.querySelector(".profile__button_add");

export const initialCards = [
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
