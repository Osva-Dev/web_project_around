let popup = document.querySelector(".popup");
let buttonEdit = document.querySelector(".profile__button_edit");
let buttonAdd = document.querySelector(".profile__button_add");
let buttonClose = document.querySelector(".popup__button_close");
let form = document.querySelector(".popup__container");
let title = document.querySelector(".popup__subtitle");
let name = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__profession");
let inputName = document.querySelector(".popup__input_name");
let inputAbout = document.querySelector(".popup__input_about");
let place = document.querySelector(".place");

const popimg = document.querySelector(".popup__images");
// Variable para saber qué modo está activo
let currentMode = "";

// ---------- Abrir popup en modo "Editar Perfil" ----------
function openEdit() {
  currentMode = "edit";
  title.textContent = "Editar Perfil";
  inputName.placeholder = "Nombre";
  inputAbout.placeholder = "Acerca de mi";
  inputName.value = name.textContent;
  inputAbout.value = profession.textContent;
  form.style.display = ""; // aseguramos que se muestre el form
  popimg.style.display = "none"; // ocultamos popup imagen
  popup.classList.add("popup_opened");
}

// ---------- Abrir popup en modo "Agregar Lugar" ----------
function openAdd() {
  currentMode = "add";
  title.textContent = "Nuevo Lugar";
  inputName.placeholder = "Nombre del Lugar";
  inputAbout.placeholder = "URL de la imagen";
  inputName.value = "";
  inputAbout.value = "";
  form.style.display = ""; // mostramos form
  popimg.style.display = "none"; // ocultamos popup imagen
  popup.classList.add("popup_opened");
}

// ---------- Cerrar popup ----------
function closePopup() {
  form.style.display = "";
  popimg.style.display = "";
  popup.classList.remove("popup_opened");
}

// ---------- Crear una tarjeta ----------
function addNewCard(cardName, cardLink) {
  const card = document.createElement("div");
  card.innerHTML = `
    <div class="place__card">
      <img class="place__delete" src="./images/icons/trash.svg">
      <img class="place__image" src="${cardLink}" alt="${cardName}">
      <div class="place__content">
        <h2 class="place__title">${cardName}</h2>
        <img
          class="place__like place__like_active"
          src="./images/icons/heart.svg"
          alt="Like"
        />
      </div>
    </div>
  `;

  // Like
  let placeLike = card.querySelector(".place__like");
  placeLike.addEventListener("click", () => {
    if (placeLike.src.includes("heart.svg")) {
      placeLike.src = "./images/icons/heart-complete.svg";
    } else {
      placeLike.src = "./images/icons/heart.svg";
    }
  });

  // Delete
  const placeDelete = card.querySelector(".place__delete");
  placeDelete.addEventListener("click", () => {
    card.remove();
  });

  // Abrir popup imagen
  const placeImage = card.querySelector(".place__image");
  placeImage.addEventListener("click", () => {
    imagePopup(cardName, cardLink);
  });

  place.prepend(card);
}

// ---------- Manejo del formulario ----------
function handleSubmit(e) {
  e.preventDefault();

  if (currentMode === "edit") {
    name.textContent = inputName.value;
    profession.textContent = inputAbout.value;
  } else if (currentMode === "add") {
    const cardName = inputName.value;
    const cardLink = inputAbout.value;

    if (cardName && cardLink) {
      addNewCard(cardName, cardLink);
    }
  }

  closePopup();
}

// ---------- Event listeners ----------
buttonEdit.addEventListener("click", openEdit);
buttonAdd.addEventListener("click", openAdd);
buttonClose.addEventListener("click", closePopup);
form.addEventListener("submit", handleSubmit);

// ---------- Cartas iniciales ----------
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

initialCards.forEach((element) => {
  addNewCard(element.name, element.link);
});

// ---------- Popup Imagen ----------
function imagePopup(name, link) {
  const popimag = popimg.querySelector(".popup__image");
  const poptxt = popimg.querySelector(".popup__paragraph");
  popimag.src = link;
  popimag.alt = name;
  poptxt.textContent = name;
  form.style.display = "none"; // ocultamos form
  popimg.style.display = ""; // mostramos imagen
  popup.classList.add("popup_opened");
}
