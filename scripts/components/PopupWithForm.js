import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, callback}) {
    super(popupSelector);
    this._callback = callback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._userName = this._formElement.querySelector('.popup__input_type_name');
    this._userPosition = this._formElement.querySelector('.popup__input_type_position');
  }
  _resetFormData(form) {
    form.reset();
  }
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
      this._resetFormData(this._formElement);
    });
  }
  close() {
    super.close();

  }
  loadProfileData({userName, userPosition}) {
    this._userName.value = userName.textContent;
    this._userPosition.value = userPosition.textContent;
  }
}
