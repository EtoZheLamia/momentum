import { getWeather } from './api.js';
import { setWeather, showAlertLoad } from './weather.js';
import { getQuotes } from './api.js';
import {setQuote, errorLoad} from './quote.js';

const placeholderTranslation ={
  'en': '[Enter your name]',
  'ru' : '[Введите имя]'
};

const languageSwitcher = document.querySelector('.language-switcher');
let currentLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : 'ru';
const currentSwitcher = languageSwitcher.querySelector(`#${currentLanguage}`);
currentSwitcher.checked = true;
let currentCity;
const name = document.querySelector('.name');
const popupTitle = document.querySelector('.popup-title');

languageSwitcher.addEventListener('change', (evt)=>{
  currentLanguage = evt.target.id;
  currentCity = document.querySelector('.city').value;
  name.placeholder = placeholderTranslation[currentLanguage];
  popupTitle.textContent = currentLanguage === 'en' ? 'Settings' : 'Настройки';
  getWeather(currentLanguage, currentCity, setWeather, showAlertLoad);
  getQuotes(currentLanguage, setQuote, errorLoad);
});


function setLocalStorage() {
  localStorage.setItem('language', currentLanguage);
  localStorage.setItem('namePlaceholder', name.placeholder);
  localStorage.setItem('popupTitle', popupTitle.textContent);
}

function getLocalStorage() {
  if (localStorage.getItem('popupTitle')) {
    popupTitle.textContent = localStorage.getItem('popupTitle');
  }
  if (localStorage.getItem('language')) {
    currentLanguage = localStorage.getItem('language');
  }
  if (localStorage.getItem('namePlaceholder')) {
    name.placeholder = localStorage.getItem('namePlaceholder');
  } else {
    name.placeholder = placeholderTranslation[currentLanguage];
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);


export {currentLanguage};
