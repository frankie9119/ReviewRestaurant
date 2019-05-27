"use strict";

let restaurants = [];
//_________________________________________BEGIN createMap


function createMap() {
  return new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 17
  });
}


//__________________________________________END 










//__________________________________________BEGIN create surrounding place markers

function createSurroundingPlaceMarkers(map) { // WORK   <---------------

  // ==============  Fran code  =========================================
  for (let i = 0; i < restaurants.length; i++) {

    let marker = new google.maps.Marker({
      map: map,
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      position: restaurants[i].position


    });
  }

}





//__________________________________________END 







//__________________________________________BEGIN getSurroundingPlaces


function getSurroundingPlaces(map, userGeoLocation) {
  let service = new google.maps.places.PlacesService(map);

  service.nearbySearch({
      location: userGeoLocation,
      radius: 500,
      type: ['restaurant']
    },
    function(results, status, pagination) {
      if (status !== 'OK') return;

      console.log(results)

      for (let i = 0; i<results.length; i++){
        //alert(results[i].geometry.location)
        let allRestaurant = [];
        allRestaurant = {
            name: results[i].name,
            position: results[i].geometry.location,
        }
        restaurants.push(allRestaurant)
      }

        console.log(restaurants)


      // ==============  Fran code  =========================================
      createSurroundingPlaceMarkers(map); // WOrk (this might not be the proper place to invoke this function.....you must decide for yourself. It looks about right ....kinda :)


    });


}

//___________________________________________END 






//___________________________________________BEGIN getUserGeolocation data


function getUserGeoLocation(map, infoWindow) {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
      getSurroundingPlaces(map, pos)

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}


//____________________________________________END

//____________________________________________BEGIN create pop up user geo location indicator


function createPopUpInfoWindow() {
  return new google.maps.InfoWindow;
}





//____________________________________________END 






//___________________________________________BEGIN MAIN application

function initMap() {
  let map = createMap();

  let infoWindow = createPopUpInfoWindow()
  getUserGeoLocation(map, infoWindow)




}



//_________________________________________  END MAIN application
