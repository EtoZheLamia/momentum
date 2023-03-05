
import { getWeather } from './api.js';

const weatherContainer = document.querySelector('.weather');
const weatherIcon = weatherContainer.querySelector('.weather-icon');
const temperature = weatherContainer.querySelector('.temperature');
const weatherDescription = weatherContainer.querySelector('.weather-description');
const humidity = weatherContainer.querySelector('.humidity');
const wind = weatherContainer.querySelector('.wind');
const city = weatherContainer.querySelector('.city');
city.value = 'Москва';
const weatherError = weatherContainer.querySelector('.weather-error');

function setWeather(data) {
  weatherIcon.className = 'weather-icon owf owf-4x';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.innerHTML = `<span>Влажность ${data.main.humidity} %</span>`;
  wind.innerHTML = `<span>Ветер: ${Math.round(data.wind.speed)} м/с</span>`;
  weatherError.innerHTML = ' ';
}

function showAlertLoad() {
  weatherError.innerHTML = `<span>Город не найден.
  Проверьте введенные данные или попробуйте еще раз</span>`;
  temperature.textContent = ' ';
  weatherDescription.textContent = ' ';
  humidity.innerHTML = ' ';
  wind.innerHTML = ' ';
}

city.addEventListener('change', (evt) => {
  city.value = evt.target.value;
  getWeather(city.value, setWeather, showAlertLoad);
});

function setLocalStorage() {
  localStorage.setItem('city', city.value);
}

function getLocalStorage() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  getWeather(city.value, setWeather, showAlertLoad);
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);



