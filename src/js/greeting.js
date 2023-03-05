const GREETING_CONTAINER = document.querySelector('.greeting');

const NAME = document.querySelector('.name');

const TIME_OF_DAY = ['night', 'morning', 'afternoon', 'evening', ];

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  return TIME_OF_DAY[Math.floor(hours / 6)];
}

function setGreetings() {
  GREETING_CONTAINER.textContent = `Good ${getTimeOfDay()},`;
}

function setLocalStorage() {
  localStorage.setItem('name', NAME.value);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    NAME.value = localStorage.getItem('name');
  }
}

export {setGreetings, getLocalStorage, setLocalStorage, getTimeOfDay};
