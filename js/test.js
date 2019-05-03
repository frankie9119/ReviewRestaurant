// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">



//var map;

function initMap() {
  // Create the map.
  var pyrmont = {
    lat:51.5089022,
    lng: -0.0990328
  }; // Get initial map location
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont, // Set location
    zoom: 17
  });


//___________________________________ BEGUIN Loop through Restaurants array

      // Loop through markers
      for(var i = 0;i < restaurants.length;i++){
        // Add marker
        addMarker(restaurants[i]);
      }

      // Add Marker Function
      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,
          //icon:props.iconImage
        });
        
      }
    }

// __________________________________________-END

/*


  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  

  // Perform a nearby search.
  service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['restaurant']
    },


    function(results, status, pagination) {
      if (status !== 'OK') return;

      createMarkers(results);
      
    });
}
















//________________________________________BEGIN create markers for type on line 31 "restaurant"

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

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

    var li = document.createElement('li');
    li.textContent = place.name;
    placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}

*/
//________________________________________END create markers for type on line 26 "restaurant"
