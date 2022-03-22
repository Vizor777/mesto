let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let editForm = popup.querySelector('.popup__form');
let closeFormButton = popup.querySelector('.popup__close');
let inputName = editForm.querySelector('.popup__input_type_name');
let inputPosition = editForm.querySelector('.popup__input_type_position');
let nameUser = document.querySelector('.profile__name');
let positionUser = document.querySelector('.profile__position');





function openPopup() {
  popup.classList.add('popup_opened');
  loadData();
}
function closePopup() {
  popup.classList.remove('popup_opened');
}
function loadData() {
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
}
function writeData() {
  nameUser.textContent = inputName.value;
  positionUser.textContent = inputPosition.value;
}
function submitHandler (evt) {
  evt.preventDefault();
  writeData();
  closePopup();
}


editButton.addEventListener('click', openPopup);
closeFormButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', submitHandler);
