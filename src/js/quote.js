function getQuotes(onSuccess) {
  const quotes = 'https://raw.githubusercontent.com/EtoZheLamia/momentum_assets/main/data.json';
  fetch(quotes)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });

}
getQuotes();
