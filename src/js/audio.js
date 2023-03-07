import { playList } from './playList.js';
const audio = new Audio();
const play = document.querySelector('.play');
const playListContainer = document.querySelector('.play-list');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
let isPlay = false;
let playNum = 0;
let playItem;
let currentTimeSong = 0;

function setPlayItem() {
  playItem = playListContainer.querySelectorAll('.play-item')[playNum];
  playItem.classList.add('item-active');
}

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = currentTimeSong;
  audio.play();
  isPlay = true;
  setPlayItem();
}

function pauseAudio() {
  audio.pause();
  isPlay = false;
  currentTimeSong = audio.currentTime;
}

play.addEventListener('click', (evt) => {
  evt.target.classList.toggle('pause');
  isPlay ? pauseAudio() : playAudio();
});

playNextBtn.addEventListener('click', () => {
  setPlayItem();
  if (audio.paused) {
    play.classList.add('pause');
  }
  if (playItem.classList.contains('item-active')) {
    playItem.classList.remove('item-active');
  }
  playNum === playList.length - 1 ? playNum = 0 : playNum ++;
  currentTimeSong = 0;
  playAudio();
});

playPrevBtn.addEventListener('click', () => {
  setPlayItem();
  if (audio.paused) {
    play.classList.add('pause');
  }
  if (playItem.classList.contains('item-active')) {
    playItem.classList.remove('item-active');
  }
  playNum === 0 ? playNum = playList.length - 1 : playNum --;
  currentTimeSong = 0;
  playAudio();
});

audio.onended = () => {
  playItem.classList.remove('item-active');
  playNum ++;
  playAudio();
};

playList.forEach((el) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li);
});
