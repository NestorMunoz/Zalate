"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {

  var zalate = { lat: 20.395417, lng: -103.135747 };

  google.maps.event.addDomListener(window, "load", function () {
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: zalate
    });

    var zalate_marker = new google.maps.Marker({
      map: map,
      position: zalate,
      title: "El Zalate",
      //animation: google.maps.Animation.BOUNCE,
      visible: true
    });

    UserLocation.get(function (coords) {
      var origin = new google.maps.LatLng(coords.lat, coords.lng);
      var destination = new google.maps.LatLng(zalate.lat, zalate.lng);

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING
      }, function (response, status) {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          var travel = response.rows[0].elements[0];
          var travel_duration = travel.duration.text;
          var travel_distance = travel.distance.text;

          document.querySelector("#map-info").innerHTML = "Est\xE1s a " + travel_distance + " y llegarias en " + travel_duration + " al mejor lugar en Atequiza";
        }
      });
    });
  });
})();

var UserLocation = function () {
  function UserLocation() {
    _classCallCheck(this, UserLocation);
  }

  _createClass(UserLocation, null, [{
    key: "get",
    value: function get(callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (location) {
          callback({
            lat: location.coords.latitude,
            lng: location.coords.longitude
          });
        });
      } else {
        alert("No es posible detectar tu localización con tu navegador y/o dispositivo.");
        return { lat: 0, lng: 0 };
      }
    }
  }]);

  return UserLocation;
}();