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

const renderCards = new Section({
  items: initialCards, renderer: (item) => {
    const cardElement = new Card(item, 'places__item', handleCardClick).generateCard();
    renderCards.addItem(cardElement);
  }
}, '.places__list');

const PopupImage = new PopupWithImage('.image-popup');
PopupImage.setEventListeners();

const popupProfileForm = new PopupWithForm({
  popupSelector: '.popup_type_profile', callback: (formData) => {
    const userData = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__position' });
    userData.setUserInfo({ data: formData });
    popupProfileForm.close();
  }
});
popupProfileForm.setEventListeners();

const popupCardFrom = new PopupWithForm({
  popupSelector: '.popup_type_add-card', callback: (formData) => {
    const cardElement = new Card(formData, 'places__item', handleCardClick).generateCard();
    renderCards.addItem(cardElement);
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
  PopupImage.open(name, link);
}

profileButton.addEventListener('click', () => {
  popupProfileForm.loadProfileData({ userName: nameUser, userPosition: positionUser });
  formValidators['edit-profile'].resetValidation();
  popupProfileForm.open();
});

placeButton.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupCardFrom.open();
});
