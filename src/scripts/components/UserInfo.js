export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }
  getUserInfo() {
    this._formValues = {
      nameSelector: this._name.textContent,
      infoSelector: this._info.textContent
    };

    return this._formValues;
  }
  setUserInfo({data}) {
    this._name.textContent = data['profile-name'];
    this._info.textContent = data['profile-position'];
  }
}
