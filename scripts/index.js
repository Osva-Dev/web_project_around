const popup = document.querySelector(".popup");
const buttonClose = document.querySelector(".popup__button_close");
const form = document.querySelector(".popup__container");
const title = document.querySelector(".popup__subtitle");
const nameEl = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const inputName = document.querySelector(".popup__input_name");
const inputAbout = document.querySelector(".popup__input_about");
const buttonEdit = document.querySelector(".profile__button_edit");
const buttonAdd = document.querySelector(".profile__button_add");
const place = document.querySelector(".place");
const popImg = document.querySelector(".popup__images");
const popImage = popImg.querySelector(".popup__image");
const popTxt = popImg.querySelector(".popup__paragraph");

let currentMode = "";

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

function openEdit() {
  currentMode = "edit";
  title.textContent = "Editar Perfil";
  inputName.placeholder = "Nombre";
  inputAbout.placeholder = "Acerca de mi";
  inputName.value = nameEl.textContent;
  inputAbout.value = profession.textContent;
  form.style.display = "block";
  popImg.style.display = "none";
  popup.classList.add("popup_opened");
}

function openAdd() {
  currentMode = "add";
  title.textContent = "Nuevo Lugar";
  inputName.placeholder = "Nombre del Lugar";
  inputAbout.placeholder = "URL de la imagen";
  inputName.value = "";
  inputAbout.value = "";
  form.style.display = "block";
  popImg.style.display = "none";
  popup.classList.add("popup_opened");
}

function closePopup() {
  form.style.display = "block";
  popImg.style.display = "none";
  popup.classList.remove("popup_opened");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popup.classList.contains("popup_opened")) {
    closePopup();
  }
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopup();
  }
});

function addNewCard(cardName, cardLink) {
  const card = document.createElement("div");
  card.classList.add("place__card");
  card.innerHTML = `
    <img class="place__delete" src="./images/icons/trash.svg" alt="Eliminar">
    <img class="place__image" src="${cardLink}" alt="${cardName}">
    <div class="place__content">
      <h2 class="place__title">${cardName}</h2>
      <img class="place__like place__like_active" src="./images/icons/heart.svg" alt="Like">
    </div>
  `;

  const placeLike = card.querySelector(".place__like");
  placeLike.addEventListener("click", () => {
    if (placeLike.src.includes("heart.svg")) {
      placeLike.src = "./images/icons/heart-complete.svg";
    } else {
      placeLike.src = "./images/icons/heart.svg";
    }
  });

  const placeDelete = card.querySelector(".place__delete");
  placeDelete.addEventListener("click", () => card.remove());

  const placeImage = card.querySelector(".place__image");
  placeImage.addEventListener("click", () => imagePopup(cardName, cardLink));

  place.prepend(card);
}

function imagePopup(name, link) {
  popImage.src = link;
  popImage.alt = name;
  popTxt.textContent = name;
  form.style.display = "none";
  popImg.style.display = "block";
  popup.classList.add("popup_opened");
}

function handleSubmit(e) {
  e.preventDefault();
  if (currentMode === "edit") {
    nameEl.textContent = inputName.value;
    profession.textContent = inputAbout.value;
  } else if (currentMode === "add") {
    const cardName = inputName.value;
    const cardLink = inputAbout.value;
    if (cardName && cardLink) addNewCard(cardName, cardLink);
  }
  closePopup();
}

buttonEdit.addEventListener("click", openEdit);
buttonAdd.addEventListener("click", openAdd);
buttonClose.addEventListener("click", closePopup);
form.addEventListener("submit", handleSubmit);

initialCards.forEach((el) => addNewCard(el.name, el.link));
