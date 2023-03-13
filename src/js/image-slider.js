import {getRandomPositiveInteger} from './util.js';
import {getTimeOfDay} from './greeting.js';
import { getImageUnsplash, getImageFlickr } from './api-image.js';

const TIME_OF_DAY = ['night', 'morning', 'afternoon', 'evening', ];

const bgImage = document.querySelector('body');
let bgNum = getRandomPositiveInteger(1, 20);
const nextImage = document.querySelector('.slide-next');
const prevImage = document.querySelector('.slide-prev');
let soursePicture = 'Flickr';

nextImage.addEventListener('click', ()=>{
  if (soursePicture === 'Unsplash') {
    getImageUnsplash('pug', setBgUnsplash);
  }
  if (soursePicture === 'Github') {
    getSlideNext();
  }
  if (soursePicture === 'Flickr') {
    getImageFlickr('pug', setBgFlickr);
  }
});

prevImage.addEventListener('click', () => {
  if (soursePicture === 'Unsplash') {
    getImageUnsplash('pug', setBgUnsplash);
  }
  if (soursePicture === 'Github') {
    getSlidePrev();
  }
  if (soursePicture === 'Flickr') {
    getImageFlickr('pug', setBgFlickr);
  }
});

// Unsplash
function setBgUnsplash(data) {
  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
}

// Flickr
function setBgFlickr(data) {
  const img = new Image();
  img.src = data.photos.photo[getRandomPositiveInteger(0 ,20)].url_l;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
}

// Github
function setBgGithub() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/EtoZheLamia/momentum_assets/main/${TIME_OF_DAY[getTimeOfDay()]}/${String(bgNum).padStart(2, '0')}.webp`;
  img.onload = () => {
    bgImage.style.backgroundImage = `url(${img.src})`;
  };
}

function getSlidePrev() {
  if (bgNum > 1) {
    bgNum--;
  } else {
    bgNum = 20;
  }
  setBgGithub();
}

function getSlideNext() {
  if (bgNum < 20) {
    bgNum++;
  } else {
    bgNum = 1;
  }
  setBgGithub();
}


//  Unsplash отдает по 1 изображению. На каждый тег по запросу. Хранить в масииве?
//  count	Количество возвращаемых фотографий. (По умолчанию: 1; максимум: 30).Ограничение 50 в час.
// теги только на английском


//  Flickr отдает до 100 изображений. Поддерживает несколько тегов:
//  tags (Необязательно)
//  Список тегов, разделенных запятыми. Будут возвращены фотографии с одним или несколькими из перечисленных тегов. Вы можете исключить результаты, соответствующие термину, добавив перед ним символ - .
//  tag_mode (Необязательно)
//  Либо "любой" для комбинации тегов ИЛИ, либо "все" для комбинации И. По умолчанию используется значение "любой", если оно не указано.
