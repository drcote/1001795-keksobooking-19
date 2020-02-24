'use strict';

/**
 * Модуль создающий данные
 */

(function () {
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

  /* Объект отношения мин цены к типу строения */
  var HOUSING_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var MAX_PRICE = 1000000;

  /* Массив адресов фотографий */
  var URL_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  window.data = {
    COUNT_AD: COUNT_AD,
    WORK_TIME: WORK_TIME,
    HOUSING: HOUSING,
    HOUSING_RU: HOUSING_RU,
    FEATURES_ITEMS: FEATURES_ITEMS,
    HOUSING_PRICE: HOUSING_PRICE,
    MAX_PRICE: MAX_PRICE,
    URL_PHOTOS: URL_PHOTOS
  };
})();
