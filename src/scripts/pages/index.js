import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupAcceptDell from '../components/PopupAcceptDell.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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
    popupAvatarUpdate.submitButton.textContent = 'Сохранение...';
    api.setNewAvatar(inputsData)
      .then((result) => {
        userData.setAvatar(result.avatar);
        popupAvatarUpdate.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupAvatarUpdate.submitButton.textContent = 'Сохранить');
  }
});
popupAvatarUpdate.setEventListeners();



api.getInitialCards()
  .then((result) => {

    renderCards = new Section({
      items: result, renderer: (item) => {
        renderCards.addItem(createCard(item, item.owner._id === '1a57df309214a17ed27eb93c' ?
          'places__my-item' : 'places__item', item._id, item.owner._id, handlePutLike, handleDellike));
      }
    }, '.places__list');
  })
  .then(() => {renderCards.renderItems()});

function setInputValues(data, popupForm) {
  popupForm.userName.value = data.nameSelector;
  popupForm.userPosition.value = data.infoSelector;
}

function createCard(data, template, idCard, idOwner, handlePutLike, handleDellike) {
  const cardElement = new Card(data, template, idCard, idOwner, handleCardClick, handleDellClick, handlePutLike, handleDellike).generateCard();
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
    popupProfileForm.submitButton.textContent = 'Сохранение...';
    api.setUserInfo(userData)
      .then(() => {
        popupProfileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {popupProfileForm.submitButton.textContent = 'Сохранение';});
  }
});
popupProfileForm.setEventListeners();

const popupCardFrom = new PopupWithForm({
  popupSelector: '.popup_type_add-card', callback: (formData) => {
    popupCardFrom.submitButton.textContent = 'Сохранение...';
    api.setCardInfo(formData)
      .then(result => {
        renderCards.addItem(createCard(result, 'places__my-item', result._id, result.owner._id, handlePutLike, handleDellike));
        popupCardFrom.close();
      })
      .catch(err => { console.log(err)})
      .finally(() => {popupCardFrom.submitButton.textContent = 'Создать';});

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

const popupAccept = popupAcceptDell.getFormElement();

function handleDellClick(callback, cardId) {
  popupAcceptDell.open();
  popupAccept.addEventListener('submit', () => {
    popupAccept.querySelector('.popup__submit').textContent = 'Удаление...';
    api.delCard(cardId)
      .then(() => callback())
      .then(() => {popupAcceptDell.close()})
      .catch(err => { console.log(err)})
      .finally(() => {popupAccept.querySelector('.popup__submit').textContent = 'Да';});
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


api.getUserInfo()
  .then((result) => {
    userData.setAvatar(result.avatar);
    userData.setUserInfo({ data: result });
  })
  .catch(err => { console.log(err)});

