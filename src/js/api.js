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

function getImageUnsplash(tag, onSuccess, onFail) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=D0agvkPteErA5n-spDG9B97Etgar2O9m5p6SKx_TtG0`;
  fetch (url)
    .then((response) => response.json())
    .then((data)=> onSuccess(data))
    .catch(() => {
      onFail();
    });
}

function getImageFlickr(tag, onSuccess) {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a998f1dd3db5b97035f32cc8ed2b9553&in_gallery=true&content_type=1&tags=${tag}&extras=url_l&per_page=100&format=json&nojsoncallback=1`;
  fetch (url)
    .then((response) => response.json())
    .then((data)=> onSuccess(data));
}

export {getWeather, getQuotes, getImageUnsplash, getImageFlickr};
