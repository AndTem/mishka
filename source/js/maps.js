ymaps.ready(initMaps);

function initMaps(){
  var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7
  });

  myMap.geoObjects.add(new ymaps.Placemark([55.76, 37.64]));
}
