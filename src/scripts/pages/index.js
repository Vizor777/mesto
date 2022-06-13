import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupAcceptDell from '../components/PopupAcceptDell.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import renderLoading from "../utils/utils.js";
import {
  profileButton,
  placeButton,
  settingsValidation,
  popupAvatar
} from "../utils/constants.js";
import '../../pages/index.css';
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '4ad5bdb7-c92a-4884-b28c-caff0975525e',
    'Content-Type': 'application/json'
  }
});

let renderCards;
const userData = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__position', avatarSelector: '.profile__avatar' });
const popupImage = new PopupWithImage('.image-popup');
const popupAcceptDell = new PopupAcceptDell('.popup_type_accept-dell');
const popupAvatarUpdate = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar', callback: (inputsData) => {
    renderLoading(true, popupAvatarUpdate.submitButton);
    api.setNewAvatar(inputsData)
      .then((result) => {
        userData.setAvatar(result.avatar);
        popupAvatarUpdate.close();
      })
      .catch(err => console.log(err))
      .finally(() => renderLoading(false, popupAvatarUpdate.submitButton));
  }
});
popupAvatarUpdate.setEventListeners();
const popupAccept = popupAcceptDell.getFormElement();
const popupSubmit = popupAccept.querySelector('.popup__submit');

api.getPromisesData()
  .then(([dataUser, cardsData]) => {
    userData.setAvatar(dataUser.avatar);
    userData.setUserInfo({ data: dataUser });
    userData.setUserId(dataUser._id);
    renderCards = new Section({
      items: cardsData, renderer: (item) => {
        renderCards.addItemAppEnd(createCard(item, item.owner._id === dataUser._id ?
          'places__my-item' : 'places__item', item._id, item.owner._id, handlePutLike, handleDellike, dataUser._id));
      }
    }, '.places__list');
  })
  .then(() => { renderCards.renderItems() })
  .catch(err => { console.log(err) });

function setInputValues(data, popupForm) {
  popupForm.userName.value = data.nameSelector;
  popupForm.userPosition.value = data.infoSelector;
}

function createCard(data, template, idCard, idOwner, handlePutLike, handleDellike, userId) {
  const cardElement = new Card(data, template, idCard, idOwner, handleCardClick, handleDellClick, handlePutLike, handleDellike, userId).generateCard();
  return cardElement;
}

function handlePutLike(cardId, likes) {
  api.setlike(cardId)
    .then(res => {
      likes.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDellike(cardId, likes) {
  api.dellike(cardId)
    .then(res => {
      likes.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

popupImage.setEventListeners();
popupAcceptDell.setEventListeners();

const popupProfileForm = new PopupWithForm({
  popupSelector: '.popup_type_profile', callback: (formData) => {
    userData.setUserInfo({ data: formData });
    renderLoading(true, popupProfileForm.submitButton);
    api.setUserInfo(userData)
      .then(() => {
        popupProfileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { renderLoading(false, popupProfileForm.submitButton) });
  }
});
popupProfileForm.setEventListeners();

const popupCardFrom = new PopupWithForm({
  popupSelector: '.popup_type_add-card', callback: (formData) => {
    renderLoading(true, popupCardFrom.submitButton);
    api.setCardInfo(formData)
      .then(result => {
        renderCards.addItem(createCard(result, 'places__my-item', result._id, result.owner._id, handlePutLike, handleDellike, result.owner._id));
        popupCardFrom.close();
      })
      .catch(err => { console.log(err) })
      .finally(() => { renderLoading(false, popupCardFrom.submitButton) });

  }
});
popupCardFrom.setEventListeners();

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



function handleDellClick(callback, cardId) {
  popupAcceptDell.open();
  popupAcceptDell.setSubmithandler(() => {
    renderLoading(true, popupSubmit);
    api.delCard(cardId)
      .then(() => callback())
      .then(() => { popupAcceptDell.close() })
      .catch(err => { console.log(err) })
      .finally(() => { renderLoading(false, popupSubmit) });
  });
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

popupAvatar.addEventListener('click', function () {
  formValidators['update-avatar'].resetValidation();
  popupAvatarUpdate.open();
});

