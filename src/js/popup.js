import { setWeather, showAlertLoad } from './weather.js';
import { getWeather, getQuotes } from './api.js';
import {setQuote, errorLoad} from './quote.js';
import {changeLanguage} from './translation.js';
import { setSourcePicture} from './image-slider.js';
import {blocksHandler} from './handler-blocks.js';

const state = {
  currentLanguage: 'ru',
  sourcePicture: 'github',
  blocks: ['todo', 'greeting-container', 'time', 'quote-container', 'weather', 'player', 'date'],
  tags: ['animals', 'cars', 'flowers', 'cloud', 'seaside', 'nature', 'city', 'sunrise', 'pugs']
};

function setCheckboxes(data, checkboxes) {
  data.forEach((el) => {
    for (let i = 0; i < checkboxes.length; i++) {
      if (el === checkboxes[i].getAttribute('id')) {
        checkboxes[i].checked = true;
      }
    }
  });
}

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

const languageSwitcher = document.querySelector('.language-switcher');
let currentCity;
languageSwitcher.addEventListener('change', (evt)=>{
  state.currentLanguage = evt.target.id;
  changeLanguage(state.currentLanguage);
  currentCity = document.querySelector('.city').value;
  getWeather(state.currentLanguage, currentCity, setWeather, showAlertLoad);
  getQuotes(state.currentLanguage, setQuote, errorLoad);
});

const imageSwitcher = popupContainer.querySelector('.image-switcher');
imageSwitcher.addEventListener('change', (evt)=> {
  state.sourcePicture = evt.target.getAttribute('id');
  // eslint-disable-next-line no-unused-expressions
  state.sourcePicture === 'github'
    ?  imageTags.style.display = 'none'
    :  imageTags.style.display = 'grid';
  setSourcePicture(state.sourcePicture);
  popupContainer.querySelector('.popup__error').innerHTML = '';
});

function errorLoadPicture() {
  state.sourcePicture = 'github';
  // eslint-disable-next-line no-unused-expressions
  state.sourcePicture === 'github'
    ?  imageTags.style.display = 'none'
    :  imageTags.style.display = 'grid';
  document.querySelector(`#${state.sourcePicture}`).checked = true;
  popupContainer.querySelector('.popup__error').innerHTML = `Не удалось загрузить изображение. Переключаемся на ${state.sourcePicture}`;
  setSourcePicture(state.sourcePicture);
}

imageTags.addEventListener('change', (evt)=> {
  const currentIndex = state.tags.indexOf(evt.target.getAttribute('id'));
  if (evt.target.checked) {
    state.tags.push(evt.target.getAttribute('id'));
  } else {
    state.tags.splice(currentIndex, 1);
  }
});

const blocksContainer = popupContainer.querySelector('.popup__blocks');

blocksContainer.addEventListener('change', (evt)=> {
  const currentIndex = state.blocks.indexOf(evt.target.getAttribute('id'));
  if (evt.target.checked) {
    state.blocks.push(evt.target.getAttribute('id'));
  } else {
    state.blocks.splice(currentIndex, 1);
  }
  blocksHandler(state.blocks);
});

function setLocalStorage() {
  localStorage.setItem('language', state.currentLanguage);
  localStorage.setItem('sourcePicture', state.sourcePicture);
  localStorage.setItem('tags',JSON.stringify(state.tags));
  localStorage.setItem('blocks',JSON.stringify(state.blocks));
}

function getLocalStorage() {
  if(localStorage.getItem('blocks')) {
    state.blocks = JSON.parse(localStorage.getItem('blocks'));
  }
  if(localStorage.getItem('tags')) {
    state.tags = JSON.parse(localStorage.getItem('tags'));
  }
  if(localStorage.getItem('language')) {
    state.currentLanguage = localStorage.getItem('language');
  }
  if(localStorage.getItem('sourcePicture')) {
    state.sourcePicture = localStorage.getItem('sourcePicture');
  }
}
const blocksCheckboxes = document.querySelectorAll('.switcher__input');
const tagsCheckboxes = document.querySelectorAll('.switcher__input');

window.addEventListener('load', () =>{
  getLocalStorage();
  document.querySelector(`#${state.currentLanguage}`).checked = true;
  document.querySelector(`#${state.sourcePicture}`).checked = true;
  if (state.sourcePicture === 'github') {
    imageTags.style.display = 'none';
  }else {
    imageTags.style.display = 'grid';
  }
  setCheckboxes(state.blocks, blocksCheckboxes);
  setCheckboxes(state.tags, tagsCheckboxes);
});
window.addEventListener('beforeunload', setLocalStorage);

export {errorLoadPicture, state};
