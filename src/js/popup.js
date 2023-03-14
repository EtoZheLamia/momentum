import { setWeather, showAlertLoad } from './weather.js';
import { getWeather, getQuotes } from './api.js';
import {setQuote, errorLoad} from './quote.js';
import {changeLanguage} from './translation.js';
import { setSourcePicture} from './image-slider.js';

const settingButton = document.querySelector('.btn-settings');
const popupContainer = document.querySelector('.popup-container');
const popupButtonClose = popupContainer.querySelector('.popup-button');
const imageTags = popupContainer.querySelector('.image-tags');

settingButton.addEventListener('click', ()=> {
  popupContainer.classList.toggle('popup-container--hide');
});

popupButtonClose.addEventListener('click', ()=> {
  popupContainer.classList.toggle('popup-container--hide');
});

// Смена изображения
const imageSwitcher = popupContainer.querySelector('.image-switcher');
let sourcePicture = localStorage.getItem('sourcePicture') ? localStorage.getItem('sourcePicture') : 'github';
const currentImageSwitcher = imageSwitcher.querySelector(`#${sourcePicture}`);
currentImageSwitcher.checked = true;

if (sourcePicture === 'github') {
  imageTags.style.display = 'none';
}else {
  imageTags.style.display = 'grid';
}

imageSwitcher.addEventListener('change', (evt)=> {
  sourcePicture = evt.target.getAttribute('id');
  // eslint-disable-next-line no-unused-expressions
  sourcePicture === 'github'
    ?  imageTags.style.display = 'none'
    :  imageTags.style.display = 'grid';
  setSourcePicture(sourcePicture);
  popupContainer.querySelector('.popup__error').innerHTML = '';
});

function errorLoadPicture() {
  sourcePicture = 'github';
  // eslint-disable-next-line no-unused-expressions
  sourcePicture === 'github'
    ?  imageTags.style.display = 'none'
    :  imageTags.style.display = 'grid';
  currentImageSwitcher.checked = true;
  popupContainer.querySelector('.popup__error').innerHTML = `Не удалось загрузить изображение. Переключаемся на ${sourcePicture}`;
  setSourcePicture(sourcePicture);
}

// Собираем теги
const checkboxes = imageTags.querySelectorAll('.switcher__input');
let tags = localStorage.getItem('tags') ? JSON.parse(localStorage.getItem('tags')) : ' ';

tags.forEach((el) => {
  for (let i = 0; i < checkboxes.length; i++) {
    if (el === checkboxes[i].getAttribute('id')) {
      checkboxes[i].checked = true;
    }
  }
});

imageTags.addEventListener('change', ()=> {
  tags = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      tags.push(checkboxes[i].getAttribute('id'));
    }
  }
});

// Смена языка
const languageSwitcher = document.querySelector('.language-switcher');
let currentLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : 'ru';
const currentSwitcher = languageSwitcher.querySelector(`#${currentLanguage}`);
currentSwitcher.checked = true;
let currentCity;

languageSwitcher.addEventListener('change', (evt)=>{
  currentLanguage = evt.target.id;
  changeLanguage(currentLanguage);
  currentCity = document.querySelector('.city').value;
  getWeather(currentLanguage, currentCity, setWeather, showAlertLoad);
  getQuotes(currentLanguage, setQuote, errorLoad);
});

// LocalStorage
function setLocalStorage() {
  localStorage.setItem('language', currentLanguage);
  localStorage.setItem('sourcePicture', sourcePicture);
  localStorage.setItem('tags',JSON.stringify(tags));
}

window.addEventListener('beforeunload', setLocalStorage);

export {currentLanguage, sourcePicture, tags, errorLoadPicture};
