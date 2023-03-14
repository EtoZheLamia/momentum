import './css/style.css';
import './css/owfont-regular.css';

import './js/time.js';
import './js/audio.js';

import { currentLanguage } from './js/popup.js';
import { getQuotes, getWeather  } from './js/api.js';
import {setQuote, errorLoad} from './js/quote.js';
import { setWeather, showAlertLoad, cityValue } from './js/weather.js';
import { changeLanguage } from './js/translation.js';
import {sourcePicture} from './js/popup.js';
import {setSourcePicture} from './js/image-slider.js';

window.addEventListener('load', () => {
  setSourcePicture(sourcePicture);
  changeLanguage(currentLanguage);
  getQuotes(currentLanguage, setQuote, errorLoad);
  getWeather(currentLanguage, cityValue, setWeather, showAlertLoad);
});

