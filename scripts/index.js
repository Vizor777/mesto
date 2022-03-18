let editButton = document.querySelector('.profile__edit-button');
let editForm = document.querySelector('.popup');
let closeFormButton = editForm.querySelector('.popup__close');
let inputs = editForm.querySelectorAll('.popup__input');
let nameUser = document.querySelector('.profile__name');
let positionUser = document.querySelector('.profile__position');

editButton.addEventListener('click', function () {
  editForm.classList.add('popup_opened');
  loadData();

});
closeFormButton.addEventListener('click', function () {
  editForm.classList.remove('popup_opened');
})
editForm.addEventListener('submit', formSubmitHandler);


function loadData() {
  inputs[0].value = nameUser.textContent;
  inputs[1].value = positionUser.textContent;
}
function writeData() {
  nameUser.textContent = inputs[0].value;
  positionUser.textContent = inputs[1].value;
}
function formSubmitHandler (evt) {
  evt.preventDefault();
  writeData();
  editForm.classList.remove('popup_opened');
}
