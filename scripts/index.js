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
  popup.classList.add("popup_opened");
}

// ---------- Cerrar popup ----------
function closePopup() {
  popup.classList.remove("popup_opened");
}

// ---------- Crear una tarjeta ----------
function addNewCard(cardName, cardLink) {
  const card = document.createElement("div");
  card.innerHTML = `
    <div class="place__card">
      <img class="place__image" src="${cardLink}" alt="${cardName}">
      <div class="place__content">
        <h2 class="place__title">${cardName}</h2>
        <img
          class="place__like"
          src="./images/icons/heart.svg"
          alt="Like"
        />
      </div>
    </div>
  `;
  place.prepend(card); // prepend para que la nueva aparezca al inicio
}

// ---------- Manejo del formulario ----------
function handleSubmit(e) {
  e.preventDefault();

  if (currentMode === "edit") {
    // Guardar cambios del perfil
    name.textContent = inputName.value;
    profession.textContent = inputAbout.value;
  } else if (currentMode === "add") {
    // Agregar nueva tarjeta
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

// Renderizar las iniciales
initialCards.forEach((element) => {
  addNewCard(element.name, element.link);
});
