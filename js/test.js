


/*

=================================================

     !!! THIS FILE IS JUST FOR NOTES !!!

==================================================

*/







      // ==========_______ Clear Results and Markers _______===================
      function clearResults() {
        let results = document.getElementById('closeRestaurants');
        while (results.childNodes[0]) {
          results.removeChild(results.childNodes[0]);
        }
        for (let i = 0; i < delMarker.length; i++) {
          if (delMarker[i].getMap() != null) delMarker[i].setMap(null);
        }
        for (let j = 0; j < markerRestaurantSelected.length; j++) {
          //alert('dmt+redmarkers')
          if (markerRestaurantSelected[j].getMap() != null) markerRestaurantSelected[j].setMap(null);
        }
        placesResults.push(newRestPlace);
      }



let service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
      location: userGeoLocation,
    },
    function(results, status) {
      if (status !== 'OK') return;
      for (let i = 0; i < results.length; i++) {
        let storage = [];
        storage = {
          position: results[i].geometry.location,
          placeId: results[i].id,
        }
      }
    });











function getReviewFromGoogle (marker){

let serviceNew = new google.maps.places.PlacesService(map);

  serviceNew.getDetails({
    placeId: marker.placeId
  }, function(restaurants, status) {

    if (status === google.maps.places.PlacesServiceStatus.OK) {

      for(let i = 0; i <= restaurants.reviews.length; i++) {

        console.log(restaurants.reviews[i]);
      }
    }
  });
}

var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for(var i=0; i <= place.reviews.length; i++) {
        console.log(place.reviews[i]);
      }
    }
  });






















function displaySurroundingPlaceList(restaurantsArray) {
  $("#restaurantsList").empty();
  let restaurantsList = $("#restaurantsList");
  for (let i = 0; i < restaurantsArray.length; i++) {
    restaurantsList.append("<li>" + restaurantsArray[i].name + ' ' + restaurantsArray[i].rating +' ' + buildRatingStarDisplayValue(restaurantsArray[i].rating) +"</li>")
  }
}
























