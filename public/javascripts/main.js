function initMap() {
  var  map, mapOptions, mapStyles, ouMarker, styledMap;
  mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "hue": "#005eff"
        }, {
          "visibility": "on"
        }, {
          "lightness": 18
        }
      ]
    }
  ];

  styledMap = new google.maps.StyledMapType(mapStyles, {
    name: 'OxfordHack Map'
  });

  mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(51.7531763, -1.267081),
    mapTypeControl: false,
    scrollwheel: false,
    navigationControl: false,
    streetViewControl: false,
    disableDefaultUI: true
  };

  map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  ouMarker = new google.maps.Marker({
    position: new google.maps.LatLng(51.753250, -1.268364),
    map: map,
    title: "OxfordHack at University of Oxford"
  });

  return google.maps.event.addListener(ouMarker, 'click', function() {
    return window.open("https://www.google.co.uk/maps/place/Sa%C3%AFd+Business+School/@51.7531829,-1.267478,17z/data=!4m2!3m1!1s0x4876c6d19df140c7:0xbbcbc03b129c4eab", "_blank");
  });
}
