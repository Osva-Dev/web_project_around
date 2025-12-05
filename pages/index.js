//                  IMPORTS
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";

import {
  popImage,
  popTxt,
  popImg,
  formProfile,
  formPlace,
  buttonEdit,
  buttonAdd,
} from "../utils/utils.js";

import Api from "../api/api.js";

//VARIABLES GLOBALES
let lastCardToDelete = null;

//POPUP DELETE
const deletePopup = new Popup("#popup-delete");
deletePopup.setEventListeners();

const handleDeleteClick = (cardElement, cardId) => {
  lastCardToDelete = { element: cardElement, id: cardId };
  deletePopup.open();
};

//API INSTANCE
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "1faf26f8-cbf3-4474-9595-b2e123d917f2",
  },
});

//USER INFO
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
});

formProfile.style.display = "none";
formPlace.style.display = "none";
popImg.style.display = "none";

//POPUP IMAGEN
const popupImageInstance = new PopupWithImage(".popup", popImage, popTxt);
popupImageInstance.setEventListeners();

const handleCardClick = ({ name, link }) => {
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "block";
  popupImageInstance.open({ name, link });
};

//LIKE HANDLER
const handleLikeClick = (cardId, isLiked) => {
  return api.toggleLike(cardId, isLiked);
};

//SECTION (RENDER TARJETAS)
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        handleCardClick,
        handleLikeClick,
        handleDeleteClick
      );

      const cardElement = card.getElement();
      cardSection.addItem(cardElement);
    },
  },
  ".place"
);

//POPUP EDITAR PERFIL
const profilePopup = new PopupWithForm(
  ".popup",
  "#form-profile",
  (inputValues) => {
    const newName = inputValues.name ?? inputValues["popup__input_name"] ?? "";
    const newAbout =
      inputValues.about ??
      inputValues.profession ??
      inputValues["popup__input_about"] ??
      "";

    const submitBtn = formProfile.querySelector('button[type="submit"]');

    const setLoading = (isLoading) => {
      if (!submitBtn) return;
      if (isLoading) {
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = "Guardando...";
        submitBtn.disabled = true;
      } else {
        submitBtn.textContent = submitBtn.dataset.originalText || "Guardar";
        submitBtn.disabled = false;
      }
    };

    if (!newName || !newAbout) {
      alert("Rellena nombre y descripción.");
      return;
    }

    setLoading(true);

    api
      .setUserInfo({ name: newName, about: newAbout })
      .then((updatedUser) => {
        userInfo.setUserInfo({
          name: updatedUser.name,
          profession: updatedUser.about,
        });
        profilePopup.close();
      })
      .catch((err) => {
        console.error("Error al guardar perfil:", err);
        alert("No se pudo guardar el perfil.");
      })
      .finally(() => {
        setLoading(false);
      });
  }
);

//POPUP CREAR TARJETA
const placePopup = new PopupWithForm(".popup", "#form-place", (inputValues) => {
  const name = inputValues.name ?? inputValues["popup__input_name"] ?? "";
  const link =
    inputValues.link ??
    inputValues.about ??
    inputValues["popup__input_about"] ??
    "";

  const submitBtn = formPlace.querySelector('button[type="submit"]');

  const setLoading = (isLoading) => {
    if (!submitBtn) return;
    if (isLoading) {
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = "Creando...";
      submitBtn.disabled = true;
    } else {
      submitBtn.textContent = submitBtn.dataset.originalText || "Crear";
      submitBtn.disabled = false;
    }
  };

  if (!name || !link) {
    alert("Rellena nombre y enlace de la imagen.");
    return;
  }

  setLoading(true);

  api
    .createCard({ name, link })
    .then((createdCard) => {
      const card = new Card(
        createdCard,
        handleCardClick,
        handleLikeClick,
        handleDeleteClick
      );

      const cardElement = card.getElement();
      cardSection.addItem(cardElement);

      placePopup.close();
      formPlace.reset();
    })
    .catch((err) => {
      console.error("Error creando la card:", err);
      alert("No se pudo crear la card.");
    })
    .finally(() => {
      setLoading(false);
    });
});

profilePopup.setEventListeners();
placePopup.setEventListeners();

//FUNCIÓN PARA ABRIR POPUPS
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
  }
};

buttonEdit.addEventListener("click", () => openPopup("profile"));
buttonAdd.addEventListener("click", () => openPopup("place"));

new FormValidator(formProfile).enableValidation();
new FormValidator(formPlace).enableValidation();

//CARGA PERFIL INICIAL
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      profession: userData.about,
    });

    const nameInput = formProfile.querySelector(".popup__input_name");
    const aboutInput = formProfile.querySelector(".popup__input_about");

    if (nameInput) nameInput.value = userData.name || "";
    if (aboutInput) aboutInput.value = userData.about || "";
  })
  .catch((err) => {
    console.error("Error al cargar perfil:", err);
  });

//CARGA TARJETAS INICIALES
api
  .getCards()
  .then((cards) => {
    if (!Array.isArray(cards)) {
      throw new Error("Respuesta inesperada: se esperaba un array");
    }

    cards.reverse().forEach((cardData) => {
      const card = new Card(
        cardData,
        handleCardClick,
        handleLikeClick,
        handleDeleteClick
      );

      const cardElement = card.getElement();
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.error("Error cargando tarjetas:", err);
  });

//CONFIRMAR ELIMINACIÓN
deletePopup.setEventListeners();

const deleteConfirmBtn = document.querySelector(
  "#popup-delete .popup__button--delete"
);

deleteConfirmBtn.addEventListener("click", () => {
  if (!lastCardToDelete) return;

  const { element, id } = lastCardToDelete;

  api
    .deleteCard(id)
    .then(() => {
      element.remove();
      lastCardToDelete = null;
      deletePopup.close();
    })
    .catch((err) => {
      console.error("Error eliminando la tarjeta:", err);
      alert("No se pudo eliminar la tarjeta.");
    });
});
