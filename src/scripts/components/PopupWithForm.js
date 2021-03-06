import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, callback}) {
    super(popupSelector);
    this._callback = callback;
    this._formElement = this._popup.querySelector('.popup__form');
    this.submitButton = this._popup.querySelector('.popup__submit');
    this.userName = this._formElement.querySelector('.popup__input_type_name');
    this.userPosition = this._formElement.querySelector('.popup__input_type_position');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }
  _resetFormData(form) {
    form.reset();
  }
  _getInputValues() {
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
    });
  }
  close() {
    super.close();
    this._resetFormData(this._formElement);
  }

}
