import { currentLanguage } from './popup.js';
import {setGreetings} from './greeting.js';

const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');
const dateOptions = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};

function showDate(lang) {
  const language = lang === 'en' ? 'en-US' : 'ru-RU';
  const date = new Date();
  const currentDate = date.toLocaleDateString(`${language}`, dateOptions);
  DATE.textContent = currentDate[0].toUpperCase() + currentDate.slice(1);
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  TIME.textContent = currentTime;
  showDate(currentLanguage);
  setGreetings(currentLanguage);
  setTimeout(showTime, 1000);
}

showTime();
