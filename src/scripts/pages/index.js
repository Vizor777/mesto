import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileButton,
  placeButton, nameUser, positionUser,
  settingsValidation, initialCards
} from "../utils/constants.js";
import '../../pages/index.css';

function setInputValues(data, popupForm) {
  popupForm.userName.value = data.nameSelector;
  popupForm.userPosition.value = data.infoSelector;
}

function createCard(data) {
  const cardElement = new Card(data, 'places__item', handleCardClick).generateCard();
  return cardElement;
}

const userData = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__position' });
const popupImage = new PopupWithImage('.image-popup');


const renderCards = new Section({
  items: initialCards, renderer: (item) => {
    renderCards.addItem(createCard(item));
  }
}, '.places__list');

popupImage.setEventListeners();

const popupProfileForm = new PopupWithForm({
  popupSelector: '.popup_type_profile', callback: (formData) => {
    userData.setUserInfo({ data: formData });
    popupProfileForm.close();
  }
});
popupProfileForm.setEventListeners();



const popupCardFrom = new PopupWithForm({
  popupSelector: '.popup_type_add-card', callback: (formData) => {
    renderCards.addItem(createCard(formData));
    popupCardFrom.close();
  }
});
popupCardFrom.setEventListeners();

renderCards.renderItems();

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

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

profileButton.addEventListener('click', () => {
  setInputValues(userData.getUserInfo(), popupProfileForm);
  formValidators['edit-profile'].resetValidation();
  popupProfileForm.open();
});

placeButton.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupCardFrom.open();
});
