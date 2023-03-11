const GREETING_CONTAINER = document.querySelector('.greeting');
const NAME = document.querySelector('.name');

const greetingTranslation ={
  'en': ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
  'ru' : ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер']
};


function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  return Math.floor(hours / 6);
}

function setGreetings(language) {
  GREETING_CONTAINER.textContent = `${greetingTranslation[language][getTimeOfDay()]},`;
}

function setLocalStorage() {
  localStorage.setItem('name', NAME.value);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    NAME.value = localStorage.getItem('name');
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

export {setGreetings, getTimeOfDay};
