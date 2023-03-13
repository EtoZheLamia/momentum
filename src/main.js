import './css/style.css';
import './css/owfont-regular.css';

import './js/time.js';
import './js/image-slider.js';
import './js/audio.js';
import './js/popup.js';

import { currentLanguage } from './js/translation.js';
import { getQuotes, getWeather  } from './js/api.js';
import {setQuote, errorLoad} from './js/quote.js';
import { setWeather, showAlertLoad, cityValue } from './js/weather.js';

import { changeLanguage } from './js/translation.js';

// import { getImageUnsplash } from './js/api-image.js';
// import { setBg } from './js/image-slider.js';

window.addEventListener('load', () => {
  changeLanguage(currentLanguage);
  getQuotes(currentLanguage, setQuote, errorLoad);
  getWeather(currentLanguage, cityValue, setWeather, showAlertLoad);
});
// getImageUnsplash('pug', setBg );
