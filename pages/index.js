import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

import {
  popImage,
  popTxt,
  popImg,
  formProfile,
  formPlace,
  buttonEdit,
  buttonAdd,
} from "../utils/utils.js";

import Api from "../api/api.js"; // <-- nuevo

// ------------------ Instancia API ------------------
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "1faf26f8-cbf3-4474-9595-b2e123d917f2", // cambia si tienes otro token
  },
});

// ------------------ UserInfo ------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
});

// UI inicial (mantienes lo que tenías)
formProfile.style.display = "none";
formPlace.style.display = "none";
popImg.style.display = "none";

// ------------------ Popup Imagen ------------------
const popupImageInstance = new PopupWithImage(".popup", popImage, popTxt);
popupImageInstance.setEventListeners();

const handleCardClick = ({ name, link }) => {
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "block";
  popupImageInstance.open({ name, link });
};

// ------------------ Sección de cards (sin tocar) ------------------
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const card = new Card(cardData, handleCardClick);
      const cardElement = card.getElement();
      cardSection.addItem(cardElement); // prepend por defecto
    },
  },
  ".place"
);

cardSection.renderItems();

// ------------------ POPUPS con formularios ------------------
// PROFILE popup: callback reemplazado para usar API
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
        // Tu UserInfo original espera { name, profession } — adaptamos:
        userInfo.setUserInfo({
          name: updatedUser.name,
          profession: updatedUser.about,
        });
        profilePopup.close();
      })
      .catch((err) => {
        console.error("Error al guardar perfil:", err);
        alert("No se pudo guardar el perfil. Revisa la consola.");
      })
      .finally(() => {
        setLoading(false);
      });
  }
);

// PLACE popup: sin cambios funcionales
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
    cardSection.addItem(cardElement); // aparece al inicio
  }
  placePopup.close();
});

profilePopup.setEventListeners();
placePopup.setEventListeners();

// ------------------ Abrir popups ------------------
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

// ------------------ CARGA INICIAL: traer datos del perfil del servidor ------------------
api
  .getUserInfo()
  .then((userData) => {
    // userData es { name, about, avatar, _id }
    // tu UserInfo actual usa { name, profession } -> adaptamos:
    userInfo.setUserInfo({
      name: userData.name,
      profession: userData.about,
    });

    // rellenar inputs del form para que al abrir se vean los datos actuales
    const nameInput = formProfile.querySelector(".popup__input_name");
    const aboutInput = formProfile.querySelector(".popup__input_about");
    if (nameInput) nameInput.value = userData.name || "";
    if (aboutInput) aboutInput.value = userData.about || "";
  })
  .catch((err) => {
    console.error("Error al cargar perfil inicial:", err);
    // opcional: mostrar mensaje en UI
  });

// ------------------ CARGA DE CARDS DESDE EL SERVIDOR ------------------
api
  .getCards()
  .then((cards) => {
    // Si quieres mostrar las tarjetas más recientes primero:
    // cards = cards.reverse();

    // Asegúrate de que cards sea un array
    if (!Array.isArray(cards)) {
      throw new Error("Respuesta inesperada: se esperaba un array de tarjetas");
    }

    // Iterar y renderizar cada tarjeta
    cards.forEach((cardData) => {
      // cardData debe tener al menos { name, link, _id, ... }
      const card = new Card(cardData, handleCardClick);
      const cardElement = card.getElement();
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.error("Error cargando tarjetas desde la API:", err);
    // opcional: mostrar mensaje al usuario o un fallback (ej. mostrar imagenes locales)
  });
