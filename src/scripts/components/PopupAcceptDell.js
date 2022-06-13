import Popup from "./Popup.js";

export default class PopupAcceptDell extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
  }

  getFormElement() {
    return this._formElement;
  }

  setSubmithandler(data) {
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._data();
    });
  }

}
