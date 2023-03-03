import {getRandomPositiveInteger} from './util.js';

const bgImage = document.querySelector('body');
let bgNum = getRandomPositiveInteger(1, 20);
const nextImage = document.querySelector('.slide-next');
const prevImage = document.querySelector('.slide-prev');

nextImage.addEventListener('click', getSlideNext);
prevImage.addEventListener('click', getSlidePrev);

function setBg() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;
  switch (Math.floor(hours / 6)) {
    case 0:
      timeOfDay = 'night';
      break;
    case 1:
      timeOfDay = 'morning';
      break;
    case 2:
      timeOfDay = 'afternoon';
      break;
    case 3:
      timeOfDay = 'evening';
      break;
  }
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/EtoZheLamia/momentum_assets/main/${timeOfDay}/${String(bgNum).padStart(2, '0')}.webp`;
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
  setBg();
}

function getSlideNext() {
  if (bgNum < 20) {
    bgNum++;
  } else {
    bgNum = 1;
  }
  setBg();
}

setBg();

