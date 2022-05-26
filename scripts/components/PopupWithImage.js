import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageName = this._popup.querySelector('.image-popup__subtitle');
    this._imageValue = this._popup.querySelector('.image-popup__img');
  }

  open(name, link) {
    this._imageName.textContent = name;
    this._imageValue.src = link;
    this._imageValue.alt = name;
    super.open();
  }
}
