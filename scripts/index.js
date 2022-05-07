import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.image-popup');
const imageName = imagePopup.querySelector('.image-popup__subtitle');
const imageValue = imagePopup.querySelector('.image-popup__img');
const profileButton = document.querySelector('.profile__edit-button');
const placeButton = document.querySelector('.profile__add-button');
const profileForm = popupProfile.querySelector('.popup__form');
const placeForm = popupPlace.querySelector('.popup__form');
const inputName = profileForm.querySelector('.popup__input_type_name');
const inputPosition = profileForm.querySelector('.popup__input_type_position');
const placeName = placeForm.querySelector('.popup__input_type_location');
const placeLink = placeForm.querySelector('.popup__input_type_url');
const nameUser = document.querySelector('.profile__name');
const positionUser = document.querySelector('.profile__position');
const cardContainer = document.querySelector('.places__list');
const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
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

const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settingsValidation);

function createCard(data, template, callback) {
  const cardElement = new Card(data, template, callback).generateCard();
  return cardElement
}

function renderCards(arrayCards) {
  arrayCards.forEach(item => {
    cardContainer.append(createCard(item, 'places__item', handleCardClick));
  });
}

function setPlaceData() {
  cardContainer.prepend(createCard({name: placeName.value, link: placeLink.value}, 'places__item', handleCardClick));
}

function resetFormData(form) {
  form.reset();
}

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

function handleCardClick(name, link) {
  imageName.textContent = name;
  imageValue.src = link;
  imageValue.alt = name;
  openPopup(imagePopup);
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

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

profileButton.addEventListener('click', () => {
  loadProfileData();
  formValidators['edit-profile'].resetValidation();
  openPopup(popupProfile);
});

placeButton.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  openPopup(popupPlace);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);





