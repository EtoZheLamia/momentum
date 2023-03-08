import { playList } from './playList.js';
const audio = new Audio();
const playerContainer = document.querySelector('.player');
const play = playerContainer.querySelector('.play');
const playListContainer = playerContainer.querySelector('.play-list');
const playNextBtn = playerContainer.querySelector('.play-next');
const playPrevBtn = playerContainer.querySelector('.play-prev');
let isPlay = false;
let playNum = 0;
let playItem;
let currentTimeSong = 0;
let currentVolume

const songTitle = playerContainer.querySelector('.song-title');
songTitle.textContent = playList[playNum].title;

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
  songTitle.textContent = playList[playNum].title;
  currentVolume = audio.volume
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

function playNext() {
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
}

function playPrev() {
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
}

playNextBtn.addEventListener('click', playNext);

playPrevBtn.addEventListener('click', playPrev);

audio.onended = () => {
  playItem.classList.remove('item-active');
  playNext();
};

playList.forEach((el) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li);
});

function updateProgressValue() {
  const progressBar = playerContainer.querySelector('.progress');
  progressBar.style.width = `${audio.currentTime / audio.duration * 100  }%`;
  playerContainer.querySelector('.current-time').textContent = (formatTime(Math.floor(audio.currentTime)));
  document.querySelector('.duration-time').textContent = playList[playNum].duration;
}

setInterval(updateProgressValue, 500);

function formatTime(seconds) {
  const min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){
    sec  = `0${sec}`;
  }
  return `${min}:${sec}`;
}

const timeline = playerContainer.querySelector('.timeline');
timeline.addEventListener('click', (evt) => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = evt.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
});

const volume = playerContainer.querySelector('.volume');

volume.addEventListener('click', (evt) => {
  evt.target.classList.toggle('volume-mute');
  audio.volume > 0 ? audio.volume = 0 : audio.volume = currentVolume


})
