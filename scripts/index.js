let popupProfile = document.querySelector('.popup_type_profile');
let popupPlace = document.querySelector('.popup_type_add-card');

let editButton = document.querySelector('.profile__edit-button');
let addPlaceButton = document.querySelector('.profile__add-button');

let editForm = popupProfile.querySelector('.popup__form');
let addForm = popupPlace.querySelector('.popup__form');

let closePopupProfile = popupProfile.querySelector('.popup__close');
let closePopupPlace = popupPlace.querySelector('.popup__close');

let inputName = editForm.querySelector('.popup__input_type_name');
let inputPosition = editForm.querySelector('.popup__input_type_position');

let placeName = addForm.querySelector('.popup__input_type_location');
let placeLink = addForm.querySelector('.popup__input_type_url');

let nameUser = document.querySelector('.profile__name');
let positionUser = document.querySelector('.profile__position');

let cardTemplate = document.querySelector('#places__item').content;
let cardContainer = document.querySelector('.places__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

renderCards(initialCards);

function renderCards(arrayCards) {
  arrayCards.forEach(item => {
    let cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardItem.querySelector('.card__image').src = item.link;
    cardItem.querySelector('.card__title').textContent = item.name;
    cardContainer.append(cardItem);
  });
}


function openPopup() {
  popupProfile.classList.add('popup_opened');
  loadData();
}
function closePopup() {
  popupProfile.classList.remove('popup_opened');
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
closePopupProfile.addEventListener('click', closePopup);
editForm.addEventListener('submit', submitHandler);
