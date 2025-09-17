let popup = document.querySelector(".popup");
let buttonClose = document.querySelector(".popup__button_close");
let form = document.querySelector(".popup__container");
let title = document.querySelector(".popup__subtitle");
let name = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__profession");
let inputName = document.querySelector(".popup__input_name");
let inputAbout = document.querySelector(".popup__input_about");
let buttonEdit = document.querySelector(".profile__button_edit");
let buttonAdd = document.querySelector(".profile__button_add");
let place = document.querySelector(".place");
const popImg = document.querySelector(".popup__images");
const popimag = popImg.querySelector(".popup__image");
const poptxt = popImg.querySelector(".popup__paragraph");
let currentMode = "";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/places/Valle_de_Yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "./images/places/Lago_Louise.png",
  },
  {
    name: "Montañas Calvas",
    link: "./images/places/Montañas_Calvas.png",
  },
  {
    name: "Latemar",
    link: "./images/places/Latemar.png",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "./images/places/Vanois__National.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/places/Lago_di_Braes.png",
  },
];

function openEdit() {
  currentMode = "edit";
  title.textContent = "Editar Perfil";
  inputName.placeholder = "Nombre";
  inputAbout.placeholder = "Acerca de mi";
  inputName.value = name.textContent;
  inputAbout.value = profession.textContent;
  form.style.display = "";
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
  form.style.display = "";
  popImg.style.display = "none";
  popup.classList.add("popup_opened");
}

function closePopup() {
  form.style.display = "";
  popImg.style.display = "";
  popup.classList.remove("popup_opened");
}

function addNewCard(cardName, cardLink) {
  const card = document.createElement("div");
  card.innerHTML = `
    <div class="place__card">
      <img class="place__delete" src="./images/icons/trash.svg">
      <img class="place__image" src="${cardLink}" alt="${cardName}">
      <div class="place__content">
        <h2 class="place__title">${cardName}</h2>
        <img class="place__like place__like_active" src="./images/icons/heart.svg" alt="Like"/>
      </div>
    </div>
  `;

  let placeLike = card.querySelector(".place__like");
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

function handleSubmit(e) {
  e.preventDefault();
  if (currentMode === "edit") {
    name.textContent = inputName.value;
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

initialCards.forEach((element) => addNewCard(element.name, element.link));

function imagePopup(name, link) {
  popimag.src = link;
  popimag.alt = name;
  poptxt.textContent = name;
  form.style.display = "none";
  popImg.style.display = "";
  popup.classList.add("popup_opened");
}
