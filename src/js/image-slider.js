import {getRandomPositiveInteger} from './util.js';
import {getTimeOfDay} from './greeting.js';
import { getImageUnsplash, getImageFlickr } from './api.js';
import {errorLoadPicture, state} from './popup.js';

const TIME_OF_DAY = ['night', 'morning', 'afternoon', 'evening', ];

const bgImage = document.querySelector('body');
let bgNum = getRandomPositiveInteger(1, 20);
const nextImage = document.querySelector('.slide-next');
const prevImage = document.querySelector('.slide-prev');


nextImage.addEventListener('click', ()=>{
  if (state.sourcePicture === 'github') {
    getSlideNext();
  } else {
    setSourcePicture(state.sourcePicture);
  }
});

prevImage.addEventListener('click', () => {
  if (state.sourcePicture === 'github') {
    getSlidePrev();
  } else {
    setSourcePicture(state.sourcePicture);
  }
});


function setSourcePicture(source) {
  if (source === 'unsplash') {
    getImageUnsplash(state.tags[getRandomPositiveInteger(0, state.tags)], setBgUnsplash, errorLoadPicture);
  }
  if (source === 'flickr') {
    getImageFlickr(state.tags.toString(), setBgFlickr, errorLoadPicture);
  }
  if (source === 'github') {
    setBgGithub();
  }
}


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
  img.src = data.photos.photo[getRandomPositiveInteger(0, data.photos.photo.length)].url_l;
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


export {setSourcePicture};
