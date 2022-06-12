export default class UserInfo {
  constructor({nameSelector, infoSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    this._formValues = {
      nameSelector: this._name.textContent,
      infoSelector: this._info.textContent
    };

    return this._formValues;
  }
  setUserInfo({data}) {
    if ({data}) {
      this._name.textContent = data.hasOwnProperty('profile-name') ? data['profile-name'] : data.name;
      this._info.textContent = data.hasOwnProperty('profile-position') ? data['profile-position'] : data.about;
    }
  }
  setAvatar(url) {
    this._avatar.src = url;
  }
}
