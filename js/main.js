'use strict';

/* Количество объявлений */
var COUNT_AD = 8;

/* Время работы */
var WORK_TIME = ['12:00', '13:00', '14:00'];

/* Массиа типа строения */
var HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

/* Массив опций */
var FEATURES_ITEMS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

/* Массив адресов фотографий */
var URL_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

/* класс шаблона метки объяления */
var markAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
/* класс куда будует добаляеться фрагмент с метками */
var markAdMap = document.querySelector('.map__pins');

/* Функция генерации случайных чисел где min входит, а max не входит */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/* Функция генерирует случайный массив */
var generateArray = function (arr) {
  var maxArrIndex = getRandomInt(1, arr.length);

  if (maxArrIndex === 0) {
    maxArrIndex = 1;
  }

  return arr.slice(0, maxArrIndex);
};

/* Функция создает случайных объявлений */
var generateAd = function () {
  var ad = [];

  for (var i = 0; i < COUNT_AD; i++) {
    ad[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Заголовок предложения',
        'address': '600, 350',
        'price': getRandomInt(200, 5000),
        'type': HOUSING[getRandomInt(0, HOUSING.length)],
        'rooms': getRandomInt(1, 6),
        'guests': getRandomInt(1, 5),
        'checkin': WORK_TIME[getRandomInt(0, WORK_TIME.length)],
        'checkout': WORK_TIME[getRandomInt(0, WORK_TIME.length)],
        'features': generateArray(FEATURES_ITEMS),
        'description': 'описание',
        'photos': generateArray(URL_PHOTOS)
      },
      'location': {
        'x': getRandomInt(100, 500), // TODO: случайное число основанное на определении размера блока, в котором перетаскивается метка.
        'y': getRandomInt(130, 630)
      }
    };
  }

  return ad;
};
/* Функция делает клон метки объявления */
var renderAd = function (ad) {
  var adElement = markAdTemplate.cloneNode(true);

  adElement.style = 'left:' + (ad.location.x - 20) + 'px; top:' + (ad.location.y - 40) + 'px;';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.title;

  return adElement;
};

/* Переключение карты в активное состояние */
document.querySelector('.map').classList.remove('map--faded');

var fragment = document.createDocumentFragment();
var ads = generateAd();

for (var i = 0; i < COUNT_AD; i++) {
  fragment.appendChild(renderAd(ads[i]));
}

markAdMap.append(fragment);

