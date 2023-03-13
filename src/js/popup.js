const settingButton = document.querySelector('.btn-settings');
const popupContainer = document.querySelector('.popup-container');
const popupButtonClose = popupContainer.querySelector('.popup-button');


settingButton.addEventListener('click', ()=> {
  popupContainer.classList.toggle('popup-container--hide');
});

popupButtonClose.addEventListener('click', ()=> {
  popupContainer.classList.toggle('popup-container--hide');
});
