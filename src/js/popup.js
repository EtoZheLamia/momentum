const settingButton = document.querySelector('.btn-settings');
const popupContainer = document.querySelector('.popup-container');
const popupButtonClose = popupContainer.querySelector('.popup-button');


settingButton.addEventListener('click', ()=> {
  popupContainer.style.display = 'block';
});

popupButtonClose.addEventListener('click', ()=> {
  popupContainer.style.display = 'none';
});
