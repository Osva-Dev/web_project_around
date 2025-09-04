let buttonEdit = document.querySelector(".profile__button_edit");
let popup = document.querySelector(".popup");
let buttonClose = document.querySelector(".popup__button_close");
let form = document.querySelector(".popup__container");
let name = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__profession");
let inputName = document.querySelector(".popup__input_name");
let inputAbout = document.querySelector(".popup__input_about");

function openEdit() {
  inputName.value = name.textContent;
  inputAbout.value = profession.textContent;
  popup.classList.toggle("popup_opened");
}

buttonEdit.addEventListener("click", openEdit);
buttonClose.addEventListener("click", openEdit);

function saveChange(e) {
  e.preventDefault();
  name.textContent = inputName.value;
  profession.textContent = inputAbout.value;
  openEdit();
}

form.addEventListener("submit", saveChange);
