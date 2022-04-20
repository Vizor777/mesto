const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (buttonElement, inputList, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSubmit = formElement.querySelector(submitButtonSelector);
  toggleButtonState(buttonSubmit, inputList, inactiveButtonClass);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(buttonSubmit, inputList, inactiveButtonClass);
    });
    inputElement.addEventListener('keydown', (evt) => {
      if (buttonSubmit.classList.contains('popup__submit_type_inactive') && evt.keyCode == 13) {
        evt.preventDefault();
      }
    });
  });
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

function validateForm(popup) {
  const formList = Array.from(popup.querySelectorAll('.popup__form'));
  formList.forEach(function (formItem) {
    const inputList = Array.from(formItem.querySelectorAll('.popup__input'));
    inputList.forEach(function (inputElement) {
      const errorElement = formItem.querySelector(`.${inputElement.id}-error`);
      if (!inputElement.validity.valid) {
        inputElement.classList.add('popup__input_type_error');
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add('popup__input-error_active');
      } else {
        inputElement.classList.remove('popup__input_type_error');
        errorElement.textContent = ' ';
        errorElement.classList.remove('popup__input-error_active');
      }
    });
    const buttonSubmit = formItem.querySelector('.popup__submit');
    toggleButtonState(buttonSubmit, inputList, 'popup__submit_type_inactive');
  });
}
