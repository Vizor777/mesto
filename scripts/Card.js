import { imageName, imageValue } from "./index.js";

export class Card {
  constructor(data, template, callback) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._callback = callback;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._template}`)
      .content
      .querySelector(`.${this._template}`)
      .cloneNode(true);

      return cardElement;
  }

  _setEventListeners() {
    const cardDellButton = this._element.querySelector('.card__button-dell');
    const cardLikeButton = this._element.querySelector('.card__button-like');
    const imageCard = this._element.querySelector('.card__image');
    imageCard.addEventListener('click', () => {
      this._handleImageOpen();
      this._callback();
    });
    cardDellButton.addEventListener('click', () => {
      this._handleDellCard();
    });
    cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });
  }

  _handleImageOpen() {
    imageName.textContent = this._name;
    imageValue.src = this._link;
    imageValue.alt = this._name;
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__button-like_active');
  }

  _handleDellCard() {
    this._element.remove();
  }


  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

}





