import { Card } from "./Card.js";

const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.image-popup');
const profileButton = document.querySelector('.profile__edit-button');
const placeButton = document.querySelector('.profile__add-button');
const profileForm = popupProfile.querySelector('.popup__form');
const placeForm = popupPlace.querySelector('.popup__form');
const profileCloseButton = popupProfile.querySelector('.popup__close');
const placeCloseButton = popupPlace.querySelector('.popup__close');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const imageName = imagePopup.querySelector('.image-popup__subtitle');
const imageValue = imagePopup.querySelector('.image-popup__img');
const inputName = profileForm.querySelector('.popup__input_type_name');
const inputPosition = profileForm.querySelector('.popup__input_type_position');
const placeName = placeForm.querySelector('.popup__input_type_location');
const placeLink = placeForm.querySelector('.popup__input_type_url');
const nameUser = document.querySelector('.profile__name');
const positionUser = document.querySelector('.profile__position');
const cardTemplate = document.querySelector('#places__item').content;
const cardContainer = document.querySelector('.places__list');
const initialCards = [{
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

// function renderCards(arrayCards) {
//   arrayCards.forEach(item => {
//     cardContainer.append(createCard(item.name, item.link));
//   });
// }

function renderCards(arrayCards) {
  arrayCards.forEach(item => {
    cardContainer.append(new Card(item, 'places__item', () => {openPopup(imagePopup)}).generateCard());
  });
}

// function createCard(name, link) {
//   const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
//   const cardDellButton = cardItem.querySelector('.card__button-dell');
//   const imageCard = cardItem.querySelector('.card__image');
//   imageCard.src = link;
//   imageCard.alt = name;
//   cardItem.querySelector('.card__title').textContent = name;

//   imageCard.addEventListener('click', () => {
//     openCardPopup(imageCard.alt, imageCard.src)
//   });

//   cardItem.querySelector('.card__button-like').addEventListener('click', likeButton);

//   cardDellButton.addEventListener('click', function () {
//     const card = cardDellButton.closest(".places__item");
//     card.remove();
//   });

//   return cardItem;
// }

function setPlaceData() {
  // cardContainer.prepend(createCard(placeName.value, placeLink.value));
  cardContainer.prepend(new Card({name: placeName.value, link: placeLink.value}, 'places__item', () => {openPopup(imagePopup)}).generateCard());
}

// function openCardPopup(placeName, placeImage) {
//   imageName.textContent = placeName;
//   imageValue.src = placeImage;
//   imageValue.alt = placeName;
//   openPopup(imagePopup);
// }

function resetFormData(form) {
  form.reset();
}

// function likeButton(evt) {
//   evt.target.classList.toggle('card__button-like_active');
// }

function openPopup(item) {
  item.classList.add('popup_opened');
  setEventEscClose();
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  removeEventEscClose();
}

function loadProfileData() {
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
}

function setProfileData() {
  nameUser.textContent = inputName.value;
  positionUser.textContent = inputPosition.value;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  setProfileData();
  closePopup(popupProfile);
  resetFormData(profileForm);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  setPlaceData();
  closePopup(popupPlace);
  resetFormData(placeForm);
}

function invalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function hasEscEvent(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function setEventEscClose() {
  document.addEventListener('keydown', hasEscEvent);
}

function removeEventEscClose() {
  document.removeEventListener('keydown', hasEscEvent);
}

imagePopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(imagePopup);
  }
});
popupProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupProfile);
  }
});
popupPlace.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupPlace);
  }
});

imageCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});

profileButton.addEventListener('click', () => {
  const formElement = popupProfile.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, 'popup__input_type_error', 'popup__input-error_active');
  });
  openPopup(popupProfile);
  loadProfileData();
});

placeButton.addEventListener('click', () => {
  const buttonSubmit = popupPlace.querySelector('.popup__submit');
  const formElement = popupPlace.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  openPopup(popupPlace);
  toggleButtonState(buttonSubmit, inputList, 'popup__submit_type_inactive');
});

profileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

placeCloseButton.addEventListener('click', () => {
  closePopup(popupPlace);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

placeForm.addEventListener('submit', handlePlaceFormSubmit);


