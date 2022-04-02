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
imagePopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('image-popup')) {
    closePopup(imagePopup);
  }
})
closePopupImage.addEventListener('click', () => {
  closePopup(imagePopup);
})
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  loadProfileData();
});
addPlaceButton.addEventListener('click', () => {
  openPopup(popupPlace);
});
closePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
closePopupPlace.addEventListener('click', () => {
  closePopup(popupPlace);
});
editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handlePlaceFormSubmit);
