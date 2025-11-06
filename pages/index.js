import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

import {
  initialCards,
  popImage,
  popTxt,
  popImg,
  formProfile,
  formPlace,
  buttonEdit,
  buttonAdd,
} from "../utils/utils.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
});

formProfile.style.display = "none";
formPlace.style.display = "none";
popImg.style.display = "none";

const popupImageInstance = new PopupWithImage(".popup", popImage, popTxt);
popupImageInstance.setEventListeners();

const handleCardClick = ({ name, link }) => {
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "block";
  popupImageInstance.open({ name, link });
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, handleCardClick);
      const cardElement = card.getElement();
      cardSection.addItem(cardElement);
    },
  },
  ".place"
);

cardSection.renderItems();

const profilePopup = new PopupWithForm(
  ".popup",
  "#form-profile",
  (inputValues) => {
    const newName = inputValues.name ?? inputValues["popup__input_name"] ?? "";
    const newProfession =
      inputValues.about ??
      inputValues.profession ??
      inputValues["popup__input_about"] ??
      "";

    if (newName !== "") {
      userInfo.setUserInfo({ name: newName, profession: newProfession });
    }
    profilePopup.close();
  }
);

const placePopup = new PopupWithForm(".popup", "#form-place", (inputValues) => {
  const name = inputValues.name ?? inputValues["popup__input_name"] ?? "";
  const link =
    inputValues.link ??
    inputValues.about ??
    inputValues["popup__input_about"] ??
    "";

  if (name && link) {
    const card = new Card({ name, link }, handleCardClick);
    const cardElement = card.getElement();
    cardSection.addItem(cardElement);
  }
  placePopup.close();
});

profilePopup.setEventListeners();
placePopup.setEventListeners();

const openPopup = (formType) => {
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "none";

  if (formType === "profile") {
    const { name, profession } = userInfo.getUserInfo();
    formProfile.querySelector(".popup__input_name").value = name;
    formProfile.querySelector(".popup__input_about").value = profession;

    formProfile.style.display = "block";
    profilePopup.open();
  } else if (formType === "place") {
    formPlace.reset();
    formPlace.style.display = "block";
    placePopup.open();
  } else if (formType === "image") {
    popImg.style.display = "block";
    popupImageInstance.open();
  }
};

buttonEdit.addEventListener("click", () => openPopup("profile"));
buttonAdd.addEventListener("click", () => openPopup("place"));

new FormValidator(formProfile).enableValidation();
new FormValidator(formPlace).enableValidation();
