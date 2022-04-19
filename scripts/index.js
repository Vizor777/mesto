const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.image-popup');
const editButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const editForm = popupProfile.querySelector('.popup__form');
const addForm = popupPlace.querySelector('.popup__form');
const closePopupProfile = popupProfile.querySelector('.popup__close');
const closePopupPlace = popupPlace.querySelector('.popup__close');
const closePopupImage = imagePopup.querySelector('.popup__close');
const imageName = imagePopup.querySelector('.image-popup__subtitle');
const imageValue = imagePopup.querySelector('.image-popup__img');
const inputName = editForm.querySelector('.popup__input_type_name');
const inputPosition = editForm.querySelector('.popup__input_type_position');
const placeName = addForm.querySelector('.popup__input_type_location');
const placeLink = addForm.querySelector('.popup__input_type_url');
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

function renderCards(arrayCards) {
  arrayCards.forEach(item => {
    cardContainer.append(createCard(item.name, item.link));
  });
}

function createCard(name, link) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const dellCardButton = cardItem.querySelector('.card__button-dell');
  const imageCard = cardItem.querySelector('.card__image');
  imageCard.src = link;
  imageCard.alt = name;
  cardItem.querySelector('.card__title').textContent = name;
  imageCard.addEventListener('click', () => {
    openCardPopup(imageCard.alt, imageCard.src)
  });
  cardItem.querySelector('.card__button-like').addEventListener('click', likeButton);
  dellCardButton.addEventListener('click', function () {
    const card = dellCardButton.closest(".places__item");
    card.remove();
  });
  return cardItem;
}

function setPlaceData() {
  cardContainer.prepend(createCard(placeName.value, placeLink.value));
}

function openCardPopup(placeName, placeImage) {
  imageName.textContent = placeName;
  imageValue.src = placeImage;
  imageValue.alt = placeName;
  openPopup(imagePopup);
  setEventEscClose();
}

function resetFormData(form) {
  form.reset();
}

function likeButton(evt) {
  evt.target.classList.toggle('card__button-like_active');
}

function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
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
  resetFormData(editForm);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  setPlaceData();
  closePopup(popupPlace);
  resetFormData(addForm);
}

function invalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonForm (inputList, buttonElement) {
  if (invalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_type_inactive');
  } else {
    buttonElement.classList.remove('popup__submit_type_inactive');
  }
};

function validateForm(popup) {
  const formList = Array.from(popup.querySelectorAll('.popup__form'));
  formList.forEach(function(formItem) {
    const inputList = Array.from(formItem.querySelectorAll('.popup__input'));
    inputList.forEach(function(inputElement) {
      const errorElement = formItem.querySelector(`.${inputElement.id}-error`);
      if (!inputElement.validity.valid) {
        inputElement.classList.add('popup__input_type_error');
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add('popup__input-error_active');
      } else {
        inputElement.classList.remove('popup__input_type_error');
        errorElement.textContent = ' ';
        errorElement.classList.remove('popup__input-error_active');
      }
    });
    const buttonSubmit = formItem.querySelector('.popup__submit');
    toggleButtonForm(inputList, buttonSubmit);
  });
}

function hasEscEvent(evt) {
  if (evt.keyCode == 27) {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
      removeEventEscClose();
  }
}

function setEventEscClose() {
  document.querySelector('.container').addEventListener('keydown', hasEscEvent);
}

function removeEventEscClose() {
  document.querySelector('.container').removeEventListener('keydown', hasEscEvent);
}

imagePopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('image-popup')) {
    closePopup(imagePopup);
    removeEventEscClose();
  }
});
popupProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_type_profile')) {
    closePopup(popupProfile);
    removeEventEscClose();
  }
});
popupPlace.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_type_add-card')) {
    closePopup(popupPlace);
    removeEventEscClose();
  }
});

closePopupImage.addEventListener('click', () => {
  closePopup(imagePopup);
  removeEventEscClose();
});
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  setEventEscClose();
  loadProfileData();
  validateForm(popupProfile);
});
addPlaceButton.addEventListener('click', () => {
  openPopup(popupPlace);
  setEventEscClose();
  toggleButtonForm(Array.from(popupPlace.querySelectorAll('.popup__input')), popupPlace.querySelector('.popup__submit'));
});
closePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
  removeEventEscClose();
});
closePopupPlace.addEventListener('click', () => {
  closePopup(popupPlace);
  removeEventEscClose();
});
editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handlePlaceFormSubmit);

