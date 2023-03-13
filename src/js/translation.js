import { getWeather } from './api.js';
import { setWeather, showAlertLoad } from './weather.js';
import { getQuotes } from './api.js';
import {setQuote, errorLoad} from './quote.js';

const dictionaryTranslation = {
  'placeholder' : {
    'en': '[Enter your name]',
    'ru' : '[Введите имя]'
  },
  'settings' : {
    'en': 'Settings',
    'ru' : 'Настройки'
  },
  'language' : {
    'en': 'Language:',
    'ru' : 'Язык:'
  },
  'imageSource' : {
    'en': 'Background image source',
    'ru' : 'Источник фонового изображения'
  },
  'tags' : {
    'en': 'Tags:',
    'ru' : 'Теги:'
  },
  'animals' : {
    'en': 'Animals',
    'ru' : 'Животные'
  },
  'cars' : {
    'en': 'Cars',
    'ru' : 'Автомобили'
  },
  'flowers' : {
    'en': 'Flowers',
    'ru' : 'Цветы'
  },
  'cloud' : {
    'en': 'Clouds',
    'ru' : 'Облака'
  },
  'seaside' : {
    'en': 'Beaches',
    'ru' : 'Пляжи'
  },
  'nature' : {
    'en': 'Nature',
    'ru' : 'Природа'
  },
  'city' : {
    'en': 'City',
    'ru' : 'Города'
  },
  'sunrise' : {
    'en': 'Sunrise',
    'ru' : 'Восход'
  },
  'pug' : {
    'en': 'Pug',
    'ru' : 'Восход'
  },
  'blocks' : {
    'en': 'Blocks on the screen',
    'ru' : 'Блоки на экране'
  },
  'time' : {
    'en': 'Time',
    'ru' : 'Время'
  },
  'quote' : {
    'en': 'Quote',
    'ru' : 'Цитата'
  },
  'date' : {
    'en': 'Date',
    'ru' : 'Дата'
  },
  'greeting' : {
    'en': 'Greeting',
    'ru' : 'Приветствие'
  },
  'weather' : {
    'en': 'Weather',
    'ru' : 'Погода'
  },
  'player' : {
    'en': 'Audioplayer',
    'ru' : 'Аудиоплеер'
  },
  'todo' : {
    'en': 'To-do list',
    'ru' : 'Список дел'
  }
};

const languageSwitcher = document.querySelector('.language-switcher');
let currentLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : 'ru';
const currentSwitcher = languageSwitcher.querySelector(`#${currentLanguage}`);
currentSwitcher.checked = true;
let currentCity;

languageSwitcher.addEventListener('change', (evt)=>{
  currentLanguage = evt.target.id;
  currentCity = document.querySelector('.city').value;
  changeLanguage(currentLanguage);
  getWeather(currentLanguage, currentCity, setWeather, showAlertLoad);
  getQuotes(currentLanguage, setQuote, errorLoad);
});

function changeLanguage(lang) {
  document.querySelector('.name').placeholder = dictionaryTranslation.placeholder[lang];
  const popupContainer = document.querySelector('.popup-container');
  popupContainer.querySelector('.popup-title').textContent = dictionaryTranslation.settings[lang];
  popupContainer.querySelectorAll('.popup__subtitle').forEach((el) => {
    el.textContent = dictionaryTranslation[el.getAttribute('id')][lang];
  });
  popupContainer.querySelectorAll('.switcher__controls--tags').forEach((el) => {
    el.textContent = dictionaryTranslation[el.getAttribute('for')][lang];
  });
}

function setLocalStorage() {
  localStorage.setItem('language', currentLanguage);
}

function getLocalStorage() {
  if (localStorage.getItem('language')) {
    currentLanguage = localStorage.getItem('language');
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);


export {currentLanguage, changeLanguage};
