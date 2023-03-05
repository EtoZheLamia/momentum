import {setGreetings} from './greeting.js';

const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');
const dateOptions = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};

function showDate() {
  const date = new Date();
  const currentDate = date.toLocaleDateString('en-US', dateOptions);
  DATE.textContent = currentDate[0].toUpperCase() + currentDate.slice(1);
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  TIME.textContent = currentTime;
  showDate();
  setGreetings();
  setTimeout(showTime, 1000);
}

showTime();
