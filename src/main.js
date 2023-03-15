import './css/style.css';
import './css/owfont-regular.css';

import './js/time.js';
import './js/audio.js';
import './js/todo.js';

import {state} from './js/popup.js';
import { getQuotes, getWeather  } from './js/api.js';
import {setQuote, errorLoad} from './js/quote.js';
import { setWeather, showAlertLoad, cityValue } from './js/weather.js';
import { changeLanguage } from './js/translation.js';
import {setSourcePicture} from './js/image-slider.js';
import { blocksHandler } from './js/handler-blocks';

window.addEventListener('load', () => {
  changeLanguage(state.currentLanguage);
  setSourcePicture(state.sourcePicture);
  blocksHandler(state.blocks);
  getQuotes(state.currentLanguage, setQuote, errorLoad);
  getWeather(state.currentLanguage, cityValue, setWeather, showAlertLoad);
});
