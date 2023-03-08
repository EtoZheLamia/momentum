import { playList } from './playList.js';
const audio = new Audio();
const playerContainer = document.querySelector('.player');
const play = playerContainer.querySelector('.play');
const playListContainer = playerContainer.querySelector('.play-list');
const playNextBtn = playerContainer.querySelector('.play-next');
const playPrevBtn = playerContainer.querySelector('.play-prev');
let isPlay = false;
let playNum = 0;
let currentTimeSong = 0;

const songTitle = playerContainer.querySelector('.song-title');
songTitle.textContent = playList[playNum].title;

playList.forEach((el,i) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  li.dataset.index = i;
  playListContainer.append(li);
});
const playItems = playListContainer.querySelectorAll('.play-item');
let playItem;

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = currentTimeSong;
  audio.play();
  isPlay = true;
  playItem = playItems[playNum];
  playItem.classList.add('item-active');
  songTitle.textContent = playList[playNum].title;
}

function pauseAudio() {
  audio.pause();
  playItem.classList.remove('item-active');
  isPlay = false;
  currentTimeSong = audio.currentTime;
}

function playNext() {
  playItems[playNum].classList.remove('item-active');
  playNum === playList.length - 1 ? playNum = 0 : playNum++;
  currentTimeSong = 0;
  playAudio();
}

function playPrev() {
  playItems[playNum].classList.remove('item-active');
  playNum === 0 ? playNum = playList.length - 1 : playNum --;
  currentTimeSong = 0;
  playAudio();
}

playNextBtn.addEventListener('click', playNext);

playPrevBtn.addEventListener('click', playPrev);

audio.onended = () => {
  playNext();
};

playListContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('item-active')){
    evt.target.classList.remove('item-active');
    play.classList.remove('pause');
    pauseAudio();
  } else {
    playItems.forEach(el => el.classList.remove('item-active'));
    play.classList.add('pause');
    playNum = evt.target.getAttribute('data-index');
    currentTimeSong = 0;
    playAudio();
  }
});

play.addEventListener('click', (evt) => {
  evt.target.classList.toggle('pause');
  isPlay ? pauseAudio() : playAudio();
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

const volumeSlider = playerContainer.querySelector('.volume-slider');
volumeSlider.addEventListener('click', (evt) => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = evt.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  playerContainer.querySelector('.volume-percentage').style.width = `${newVolume * 100  }%`;
});

volume.addEventListener('click', () => {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volume.classList.add('volume-mute');
  } else {
    volume.classList.remove('volume-mute');
  }
});
