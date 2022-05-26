export default class Card {
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
    this._cardDellButton = this._element.querySelector('.card__button-dell');
    this._cardLikeButton = this._element.querySelector('.card__button-like');
    this._cardImage.addEventListener('click', () => {
      this._callback(this._name, this._link);
    });
    this._cardDellButton.addEventListener('click', () => {
      this._handleDellCard();
    });
    this._cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__button-like_active');
  }

  _handleDellCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}





