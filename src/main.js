import './css/style.css';
import './css/owfont-regular.css';


import './js/time.js';
import './js/image-slider.js';
import './js/weather.js';

import {getLocalStorage, setLocalStorage} from './js/greeting';
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
