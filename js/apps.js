let restaurants = [{
    "name": "Young Founder Arms",
    "address": "52 Hopton St, London SE1 9JH, UK",
          coords:{lat:51.5089556,lng:-0.106661},
          content:'<h1>Young Founder Arms</h1>',
    "ratings": [{
        "stars": 4,
        "comment": "Great! But not many veggie options."
      },
      {
        "stars": 5,
        "comment": "My favorite restaurant!"
      }
    ]
  },
  {
    "name": "Wagamama Bankside",
    "address": "20 Sumner St, London SE1 9JZ, UK",
          coords:{lat:51.504387,lng:-0.1001269},
          content:'<h1>Wagamama Bankside</h1>',
    "ratings": [{
        "stars": 5,
        "comment": "Tiny pizzeria next to Sacre Coeur!"
      },
      {
        "stars": 3,
        "comment": "Meh, it was fine."
      }
    ]
  }
]









function getUserGeoLocation(){

  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            };
          })
      }

}









function createMap(mapCenter){  // mapCenter is users geolocation data got via @getUserGeoLocation()
  return map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter, // Set location
    zoom: 13
  });
}












function initMap() {
  // Create the map.
 
  
  let map = createMap(getUserGeoLocation()); 

  console.log(map)

  // Create the places service.
  var service = new google.maps.places.PlacesService(map);


   let userLocation = getUserGeoLocation();
  // Perform a nearby search.
  service.nearbySearch({
      location: userLocation,
      radius: 500,
      type: ['restaurant']
    },
    function(results, status, pagination) {
      if (status !== 'OK') return;
      console.log(results)
      createMarkers(results);
 
    });
}




//________________________________________BEGIN create markers for type on line 31 "restaurant"

function createMarkers(places) {

  console.log(places)
  // var bounds = new google.maps.LatLngBounds();
  // var placesList = document.getElementById('places');

  // for (var i = 0, place; place = places[i]; i++) {
  //   var image = {
  //     url: place.icon,
  //     size: new google.maps.Size(71, 71),
  //     origin: new google.maps.Point(0, 0),
  //     anchor: new google.maps.Point(17, 34),
  //     scaledSize: new google.maps.Size(25, 25)
  //   };

  //   var marker = new google.maps.Marker({
  //     map: map,
  //     icon: image,
  //     title: place.name,
  //     position: place.geometry.location
  //   });

  //   var li = document.createElement('li');
  //   li.textContent = place.name;
  //   placesList.appendChild(li);

  //   bounds.extend(place.geometry.location);
  // }
  // map.fitBounds(bounds);
}


//________________________________________END create markers for type on line 26 "restaurant"


























/*var map;

function handleSearchResults(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {
            var marker = new google.maps.Marker({
                //typo: it must be location not Location
                position: results[i].geometry.location,
                map: map,
                icon: results[i].icon
            });
        }
    }

}

function performSearch() {

    var request = {
        bounds: map.getBounds(),
        name: "McDonald's"
    };

    var service = new google.maps.places.PlacesService(map);
    //use only the name of the function as callback-argument
    service.nearbySearch(request, handleSearchResults);

}

function initialize(location) {
    var myLatlng = new google.maps.LatLng(location.coords.latitude, 
                                          location.coords.longitude);

    var mapOptions = {
        center: myLatlng,
        zoom: 9
    };
    //removed the var-keyword(otherwise map is not global accessible)
    map = new google.maps.Map(document.getElementById("map"), 
                              mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "My place"
    });
    //again: use only the name of the function as callback-argument
    service = new google.maps.event.addListenerOnce(map, 
                                                    'bounds_changed', 
                                                     performSearch);
}



$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(initialize);
});
//google.maps.event.addDomListener(window, 'load', initialize);
*/
/*





      	        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {

              var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude     
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              map.setCenter(pos);


    })
  }

  infoWindow = new google.maps.InfoWindow({ map: map });



      	  let service = new google.maps.places.PlacesService(map);

      	  







            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }


        */