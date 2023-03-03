const GREETING = document.querySelector('.greeting');
const TIMES_OF_DAY = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'];
const NAME = document.querySelector('.name');

function getTimeOfDay(time) {
  GREETING.textContent = `${TIMES_OF_DAY[time]},`;
}

function setLocalStorage() {
  localStorage.setItem('name', NAME.value);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    NAME.value = localStorage.getItem('name');
  }
}

export {getTimeOfDay, getLocalStorage, setLocalStorage};
