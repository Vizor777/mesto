let popupProfile = document.querySelector('.popup_type_profile');
let popupPlace = document.querySelector('.popup_type_add-card');
let imagePopup = document.querySelector('.image-popup');

let editButton = document.querySelector('.profile__edit-button');
let addPlaceButton = document.querySelector('.profile__add-button');

let editForm = popupProfile.querySelector('.popup__form');
let addForm = popupPlace.querySelector('.popup__form');

let closePopupProfile = popupProfile.querySelector('.popup__close');
let closePopupPlace = popupPlace.querySelector('.popup__close');
let closePopupImage = imagePopup.querySelector('.image-popup__close');

let imageName = imagePopup.querySelector('.image-popup__subtitle');
let imageValue = imagePopup.querySelector('.image-popup__img');

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
    let dellCardButton = cardItem.querySelector('.card__button-dell');
    dellCardButton.addEventListener('click', function () {
      let card = dellCardButton.closest(".places__item");
      card.remove();
    });
    cardItem.querySelector('.card__image').src = item.link;
    cardItem.querySelector('.card__image').alt = item.name;
    cardItem.querySelector('.card__image').addEventListener('click', openCardPopup);
    cardItem.querySelector('.card__title').textContent = item.name;
    cardItem.querySelector('.card__button-like').addEventListener('click', likeButton);
    cardContainer.append(cardItem);
  });
}

function openCardPopup(evt) {
  imageName.textContent = evt.target.alt;
  imageValue.src = evt.target.src;
  openPopup(imagePopup);
}

function likeButton(evt) {
  evt.target.classList.toggle('card__button-like_active');
}

function openPopup(item) {
  item.classList.add('popup_opened');
  loadData();
}
function closePopup(item) {
  item.classList.remove('popup_opened');
}
function loadData() {
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
}
function writeData() {
  nameUser.textContent = inputName.value;
  positionUser.textContent = inputPosition.value;
}
function writeDataPlace() {
  let cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  let dellCardButton = cardItem.querySelector('.card__button-dell');
  dellCardButton.addEventListener('click', function () {
    let card = dellCardButton.closest(".places__item");
    card.remove();
  });
  cardItem.querySelector('.card__image').src = placeLink.value;
  cardItem.querySelector('.card__image').alt = placeName.value;
  cardItem.querySelector('.card__title').textContent = placeName.value;
  cardItem.querySelector('.card__button-like').addEventListener('click', likeButton);
  cardItem.querySelector('.card__image').addEventListener('click', openCardPopup);
  cardContainer.prepend(cardItem);
  placeLink.value = "";
  placeName.value = "";
}
function submitHandler(evt) {
  evt.preventDefault();
  writeData();
  closePopup(popupProfile);
}

function submitHandlerAddCard(evt) {
  evt.preventDefault();
  writeDataPlace();
  closePopup(popupPlace);
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
});
addPlaceButton.addEventListener('click', () => {
  openPopup(popupPlace);
});

closePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
closePopupPlace.addEventListener('click', () => {
  closePopup(popupPlace);
  placeLink.value = "";
  placeName.value = "";
});

editForm.addEventListener('submit', submitHandler);
addForm.addEventListener('submit', submitHandlerAddCard);
