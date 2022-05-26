export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _setEventEscClose() {
    document.addEventListener('keydown', this._handleEscClose);
  }
  _removeEventEscClose() {
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
  open() {
    this._popup.classList.add('popup_opened');
    this._setEventEscClose();
  }
  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventEscClose();
  }
}
