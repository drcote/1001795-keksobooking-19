'use strict';

var KEY_ENTER = 'Enter';

/* размеры метки объявления */
var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;
var PIN_ARROW = 19;

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

var HOUSING_RU = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

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
var markPinAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
/* шаблон с инфорацией объявления */
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
/* класс куда будует добаляеться фрагмент с метками */
var markAdMap = document.querySelector('.map__pins');

var positionCard = document.querySelector('.map').querySelector('.map__filters-container');
/* кнопка создания  нового объявления*/
var mainPinButton = document.querySelector('.map__pin--main');
/* форма объявления */
var adForm = document.querySelector('.ad-form');
/* адрес формы */
var formAdress = document.querySelector('#address');
/* координаты метки объявления */
var pinMainRect = mainPinButton.getBoundingClientRect();
/* поля формы объявления */
var formFieldset = document.querySelectorAll('.ad-form__element');
/* поле выбора кол-ва комнат */
var formRoomNumber = document.querySelector('#room_number');
/* поле выбора кол-ва гостей */
var formCapacity = document.querySelector('#capacity');

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
var generateAds = function () {
  var ads = [];

  for (var i = 0; i < COUNT_AD; i++) {
    var x = getRandomInt(100, 500); // TODO: случайное число основанное на определении размера блока, в котором перетаскивается метка.
    var y = getRandomInt(130, 630);

    ads[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Заголовок предложения',
        'address': x + ',' + y,
        'price': getRandomInt(10000, 50000),
        'type': HOUSING[getRandomInt(0, HOUSING.length)],
        'rooms': getRandomInt(1, 3),
        'guests': getRandomInt(1, 3),
        'checkin': WORK_TIME[getRandomInt(0, WORK_TIME.length)],
        'checkout': WORK_TIME[getRandomInt(0, WORK_TIME.length)],
        'features': generateArray(FEATURES_ITEMS),
        'description': 'описание',
        'photos': generateArray(URL_PHOTOS)
      },
      'location': {
        'x': x,
        'y': y
      }
    };
  }

  return ads;
};
/* Функция делает клон метки объявления */
var createPinAd = function (ad) {
  /* Клон метки объявления */
  var adPinElement = markPinAdTemplate.cloneNode(true);

  /* Блок описывает метку объявления */
  adPinElement.style = 'left:' + (ad.location.x + 25) + 'px; top:' + (ad.location.y + 70) + 'px;';
  adPinElement.querySelector('img').src = ad.author.avatar;
  adPinElement.querySelector('img').alt = ad.offer.title;

  return adPinElement;
};

/* Функция делает клон объявления*/
var createAd = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);

  var guestText = ad.offer.guests === 1 ? ' гость' : ' гостей';
  var roomsText = ad.offer.rooms === 1 ? ' комната для ' : ' комнаты для ';
  var popupFeature = cardElement.querySelectorAll('.popup__feature');
  var popupPhotos = cardElement.querySelector('.popup__photos');

  popupFeature.forEach(function (feature) {
    feature.style = 'display: none';
  });

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = HOUSING_RU[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms
    + roomsText + ad.offer.guests + guestText;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin
    + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  ad.offer.features.forEach(function (feature) {
    cardElement.querySelector('.popup__feature--' + feature).style = 'display: inline-block';
  });

  popupPhotos.innerHTML = '';
  ad.offer.photos.forEach(function (photo) {
    var photoElement = '<img src="' + photo + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    popupPhotos.insertAdjacentHTML('afterbegin', photoElement);
  });

  return cardElement;
};

/* Функия активирующая поля */
var activateForm = function () {
  adForm.classList.remove('ad-form--disabled');
  positionCard.before(createAd(ads[0]));
  formFieldset.forEach(function (item) {
    item.disabled = false;
  });
};

/* Функция отключающая все поля */
var deactivateForm = function () {
  adForm.classList.add('ad-form--disabled');
  formFieldset.forEach(function (item) {
    item.disabled = true;
  });
};

var fragment = document.createDocumentFragment();
var ads = generateAds();

ads.forEach(function (item) {
  fragment.appendChild(createPinAd(item));
});

/* Переключение карты в активное состояние */
var activePage = function () {
  document.querySelector('.map').classList.remove('map--faded');
  activateForm();
  formAdress.value = coordinatePinMainActive;
  markAdMap.append(fragment);
};

/* расчет координат в неактивном состоянии */
var coordinatePinMainInactive = Math.floor((pinMainRect.x + (PIN_WIDTH / 2))) +
  ',' + Math.floor((pinMainRect.y + (PIN_HEIGHT / 2)));

/* расчет координат в активном состоянии */
var coordinatePinMainActive = Math.floor((pinMainRect.x + (PIN_WIDTH / 2))) +
  ',' + Math.floor((pinMainRect.y + (PIN_HEIGHT + PIN_ARROW)));

/* поиск элемента в списке кол-ва мест */
var elementCapacity = function (index) {
  return formCapacity.querySelector('option[value="' + index + '"]');
};

/* функция изменения кол-ва комнат */
var onChangeRoomNumber = function () {
  var currentRoomNumber = formRoomNumber.value;
  var optionsCapacity = formCapacity.querySelectorAll('option');

  optionsCapacity.forEach(function (item) {
    item.disabled = true;
  });

  optionsCapacity[0].disabled = false;

  switch (currentRoomNumber) {
    case 'any':
      optionsCapacity.forEach(function (item) {
        item.disabled = false;
      });
      break;
    case '1':
    case '2':
    case '3':
      for (var i = 1; i <= +currentRoomNumber; i++) {
        elementCapacity(i).disabled = false;
      }
      break;
    case '100':
      elementCapacity(0).disabled = false;
      break;

    default:

  }
};

/* Вывод карточки оъявления */

mainPinButton.addEventListener('click', function () {
  activePage();
});
mainPinButton.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    activePage();
  }
});

formRoomNumber.addEventListener('change', onChangeRoomNumber);

deactivateForm();

/* работа с формой */
/* заполенение поля адрес когда метка не активна */
formAdress.value = coordinatePinMainInactive;


