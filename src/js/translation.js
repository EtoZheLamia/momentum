const dictionaryTranslation = {
  'placeholder' : {
    'en': '[Enter your name]',
    'ru' : '[Введите имя]'
  },
  'settings' : {
    'en': 'Settings',
    'ru' : 'Настройки'
  },
  'language' : {
    'en': 'Language:',
    'ru' : 'Язык:'
  },
  'imageSource' : {
    'en': 'Background image source',
    'ru' : 'Источник фонового изображения'
  },
  'tags' : {
    'en': 'Tags:',
    'ru' : 'Теги:'
  },
  'animals' : {
    'en': 'Animals',
    'ru' : 'Животные'
  },
  'cars' : {
    'en': 'Cars',
    'ru' : 'Автомобили'
  },
  'flowers' : {
    'en': 'Flowers',
    'ru' : 'Цветы'
  },
  'cloud' : {
    'en': 'Clouds',
    'ru' : 'Облака'
  },
  'seaside' : {
    'en': 'Beaches',
    'ru' : 'Пляжи'
  },
  'nature' : {
    'en': 'Nature',
    'ru' : 'Природа'
  },
  'city' : {
    'en': 'City',
    'ru' : 'Города'
  },
  'sunrise' : {
    'en': 'Sunrise',
    'ru' : 'Восход'
  },
  'pugs' : {
    'en': 'Pugs',
    'ru' : 'Мопсы'
  },
  'blocks' : {
    'en': 'Blocks on the screen',
    'ru' : 'Блоки на экране'
  },
  'time' : {
    'en': 'Time',
    'ru' : 'Время'
  },
  'quote' : {
    'en': 'Quote',
    'ru' : 'Цитата'
  },
  'date' : {
    'en': 'Date',
    'ru' : 'Дата'
  },
  'greeting' : {
    'en': 'Greeting',
    'ru' : 'Приветствие'
  },
  'weather' : {
    'en': 'Weather',
    'ru' : 'Погода'
  },
  'player' : {
    'en': 'Audioplayer',
    'ru' : 'Аудиоплеер'
  },
  'todo' : {
    'en': 'To-do list',
    'ru' : 'Список дел'
  }
};

function changeLanguage(lang) {
  document.querySelector('.name').placeholder = dictionaryTranslation.placeholder[lang];
  const popupContainer = document.querySelector('.popup-container');
  popupContainer.querySelector('.popup-title').textContent = dictionaryTranslation.settings[lang];
  popupContainer.querySelectorAll('.popup__subtitle').forEach((el) => {
    el.textContent = dictionaryTranslation[el.getAttribute('id')][lang];
  });
  popupContainer.querySelectorAll('.switcher__controls--tags').forEach((el) => {
    el.textContent = dictionaryTranslation[el.getAttribute('for')][lang];
  });
}

export {changeLanguage};
