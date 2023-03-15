import { getWeather } from './api.js';
import { state } from './popup.js';

const weatherContainer = document.querySelector('.weather');
const weatherIcon = weatherContainer.querySelector('.weather-icon');
const temperature = weatherContainer.querySelector('.temperature');
const weatherDescription = weatherContainer.querySelector('.weather-description');
const humidity = weatherContainer.querySelector('.humidity');
const wind = weatherContainer.querySelector('.wind');
const city = weatherContainer.querySelector('.city');
let cityValue = localStorage.getItem('city') ?  localStorage.getItem('city') : 'Москва';
city.value = cityValue;
const weatherError = weatherContainer.querySelector('.weather-error');

function setWeather(data) {
  weatherIcon.className = 'weather-icon owf owf-4x';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.innerHTML = `<span>${state.currentLanguage === 'ru' ? 'Влажность' : 'Humidity'}: ${data.main.humidity} %</span>`;
  wind.innerHTML = `<span>${state.currentLanguage === 'ru' ? 'Ветер' : 'Wind'}: ${Math.round(data.wind.speed)} м/с</span>`;
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
  cityValue = evt.target.value;
  getWeather(state.currentLanguage, cityValue, setWeather, showAlertLoad);
  localStorage.setItem('city', cityValue);
});

export {setWeather, showAlertLoad, cityValue};
