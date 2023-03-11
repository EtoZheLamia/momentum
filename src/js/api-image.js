function getImageUnsplash(tag, onSuccess) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=D0agvkPteErA5n-spDG9B97Etgar2O9m5p6SKx_TtG0`;
  fetch (url)
    .then((response) => response.json())
    .then((data)=> onSuccess(data));
}

function getImageFlickr(tag, onSuccess) {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a998f1dd3db5b97035f32cc8ed2b9553&tags=${tag}&extras=url_l&per_page=20&format=json&nojsoncallback=1`;
  fetch (url)
    .then((response) => response.json())
    .then((data)=> onSuccess(data));
}


export {getImageUnsplash, getImageFlickr};
