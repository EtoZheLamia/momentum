import { getRandomPositiveInteger } from './util.js';

const quoteContainer = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');
let quotes;

function setQuote(data) {
  quotes = data;
  const quote = quotes[getRandomPositiveInteger(0,quotes.length-1)];
  quoteContainer.textContent = quote.text;
  author.textContent = quote.author;
}

function errorLoad() {
  quoteButton.style.display = 'none';
  quoteContainer.textContent = 'Не удалось загрузить цитату. Перезагрузите страницу или попробуйте позже.';
}

quoteButton.addEventListener('click', ()=>{
  setQuote(quotes);
});

export {setQuote, errorLoad};

