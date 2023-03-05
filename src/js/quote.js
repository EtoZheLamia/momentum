import { getQuotes } from './api.js';
import { getRandomPositiveInteger } from './util.js';

const quoteContainer = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');

function setQuote(data) {
  const quote = data[getRandomPositiveInteger(0,data.length-1)];
  quoteContainer.textContent = quote.text;
  author.textContent = quote.author;
}

function errorLoad() {
  quoteButton.style.display = 'none';
  quoteContainer.textContent = 'Не удалось загрузить цитату. Перезагрузите страницу или попробуйте позже.';
}

getQuotes(setQuote,errorLoad);

quoteButton.addEventListener('click', ()=>{
  getQuotes(setQuote,errorLoad);
});


