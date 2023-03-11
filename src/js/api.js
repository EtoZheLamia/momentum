function getWeather(lang, city, onSuccess, onFail) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=3d33c09828dbe5b19caeb3d0b3bc829f&units=metric`;
  fetch (url)
    .then((response) => response.json())
    .then((data)=> onSuccess(data))
    .catch(() => {
      onFail();
    });
}

function getQuotes(lang, onSuccess, onFail) {
  const quotes = `https://raw.githubusercontent.com/EtoZheLamia/momentum_assets/main/data_${lang}.json`;
  fetch(quotes)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
}

export {getWeather, getQuotes};
