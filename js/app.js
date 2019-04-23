// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


var map, infoWindow;
//________________________________________BEGIN create markers for type on line 31 "restaurant"

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
 
  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}


//________________________________________END create markers for type on line 26 "restaurant"

function initMap() {
  // Create the map.
  var currentLocation = {
    lat:51.5089022,
    lng: -0.0990328
  }; 
// Get initial map location
  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation, // Set location
    zoom: 17
  });


  //________________________BEGUIN try HTML5 geolocation

  infoWindow = new google.maps.InfoWindow;

          if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

currentLocation = pos;

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

//________________________________________ Create the places service.
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;



  // Perform a nearby search.
  service.nearbySearch({
      location: currentLocation,

      //alert(currentLocation);
      radius: 500,
      type: ['restaurant']
    },
    function(results, status, pagination) {
      if (status !== 'OK') return;

      createMarkers(results);
      console.log(results);

let closeRestaurants = $("#closeRestaurants");

for (let i = 0; i < results.length; i += 1) {
  closeRestaurants.append("<li>" + results[i].name + results[i].rating +"</li>")
}





});



//____________________________________________ END


          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      

  //________________________ END try HTML5 geolocation


//___________________________________ BEGUIN Loop through Restaurants array


// __________________________________________-END




  

}



//___________________ FUNCTION ERROR GEOLOCATION

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }





