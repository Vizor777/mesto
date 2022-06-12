export default class Card {
  constructor(data, template, idCard, idOwner, callbackImg, callbackAccept, callPutLike, callDellike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.hasOwnProperty('likes') ? data.likes.length : 0;
    this._likesList = data.likes;
    this._template = template;
    this._idCard = idCard;
    this._idOwner = idOwner;
    this._callbackImg = callbackImg;
    this._callbackAccept = callbackAccept;
    this._callPutLike = callPutLike;
    this._callDellike = callDellike;
  }

  _checkLikeCard() {
    this._likesList.forEach(item => {
      if (item._id === '1a57df309214a17ed27eb93c') {
        this._element.querySelector('.card__button-like').classList.add('card__button-like_active');
      }
    });
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
    if (this._idOwner === '1a57df309214a17ed27eb93c') {
      this._cardDellButton = this._element.querySelector('.card__button-dell');
      this._cardDellButton.addEventListener('click', () => {
        this._callbackAccept(this._handleDellCard.bind(this), this._idCard);
      });
    }
    this._cardLikeButton = this._element.querySelector('.card__button-like');
    this._cardImage.addEventListener('click', () => {
      this._callbackImg(this._name, this._link);
    });
    this._cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });
  }

  _handleLikeCard(evt) {
    if (evt.target.classList.contains('card__button-like_active')) {
      this._callDellike(this._idCard, this._element.querySelector('.card__counter-like'));
    } else {
      this._callPutLike(this._idCard, this._element.querySelector('.card__counter-like'));

    }
    evt.target.classList.toggle('card__button-like_active');
  }

  _handleDellCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._element.querySelector('.card__counter-like').textContent = this._likes;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    this._checkLikeCard();

    return this._element;
  }
}





