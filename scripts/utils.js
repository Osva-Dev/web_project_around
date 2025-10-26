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

let currentForm = null;

// Abrir popup según formulario
export const openPopup = (formType) => {
  popImg.style.display = "none";
  if (formType === "profile") {
    formProfile.style.display = "block";
    formPlace.style.display = "none";
    currentForm = formProfile;
    // Llenar valores actuales
    formProfile.querySelector(".popup__input_name").value = nameEl.textContent;
    formProfile.querySelector(".popup__input_about").value =
      profession.textContent;
  } else if (formType === "place") {
    formPlace.style.display = "block";
    formProfile.style.display = "none";
    currentForm = formPlace;
    formPlace.reset();
  }
  popup.classList.add("popup_opened");
};

// Cerrar popup
export const closePopup = () => {
  popup.classList.remove("popup_opened");
  formProfile.style.display = "none";
  formPlace.style.display = "none";
  popImg.style.display = "none";
  currentForm = null;
};

export const initializePopupEvents = () => {
  buttonEdit.addEventListener("click", () => openPopup("profile"));
  buttonAdd.addEventListener("click", () => openPopup("place"));
  buttonClose.addEventListener("click", closePopup);

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("popup_opened")) {
      closePopup();
    }
  });

  // Cerrar haciendo click fuera del popup
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
};

export const getCurrentForm = () => currentForm;
