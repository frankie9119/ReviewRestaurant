"use strict";
let restaurants = [];
//_________________________________________BEGIN createMap


function createMap() {
  return new google.maps.Map(document.getElementById('map'), {

    zoom: 17
  });
}


//__________________________________________END 


//________________________________________BEGIN create stars rating
function buildRatingStarDisplayValue(numbVal) { // @ creates a string of "stars" using google maps api
  let ratingHTML = ""
  if (numbVal) {
    for (let i = 0; i < 5; i++) {
      if (numbVal < (i + 0.5)) {
        ratingHTML += '&#10025;';
      } else {
        ratingHTML += '&#10029;';
      }
    }
  }
  return ratingHTML
}
//________________________________________END



//__________________________________________BEGIN create surrounding place markers

function createSurroundingPlaceMarkers(map) { // WORK   <---------------

  // ==============  Fran code  =========================================
  for (let i = 0; i < restaurants.length; i++) {

    let marker = new google.maps.Marker({
      map: map,
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      position: restaurants[i].position,
      name: restaurants[i].name,
    });
    // add click on marker info modal()
    clickOnMarkerInfo(marker)

  }
}

//__________________________________________END 



//__________________________________________BEGIN create surrounding place LIST
// ================ Fran code ===================
function createSurroundingPlaceList() {

  let restaurantsList = $("#restaurantsList");
  for (let i = 0; i < restaurants.length; i++) {
    restaurantsList.append("<li>" + restaurants[i].name + ' ' + buildRatingStarDisplayValue(restaurants[i].rating) + "</li>")
  }
}

//__________________________________________END 

//___________________________________________BEGIN click on markers info
// ================ Fran code ===================
function clickOnMarkerInfo(marker) {

  marker.addListener('click', function() {
    alert(marker.name)
    $("#title").html(marker.name);
    // Modal
    $("#myModal").modal();
  })
}
//___________________________________________END
//___________________________________________BEGIN display New Restaurant Content
// ================ Fran code ===================
function displayNewRestaurantContent(newMarker, newRestaurantContent) {
  $("#title").html(newRestaurantContent.name);
  // Modal
  $("#myModal").modal();
}
//___________________________________________END


//___________________________________________BEGIN right click add restaurant
// ================ Fran code ===================
function addRestaurant(map) {
  // This event listener calls addMarker() when the map is clicked.
  map.addListener('rightclick', function(e) {
    addMarker(e, map);
  });
}
//___________________________________________END


//_________________________________________BEGIN add marker for new restaurant to the map.

function addMarker(data, map) {
  // Add the marker at the clicked location, and add the next-available label

  restaurants.push({
    //default name for new restaurant is "A"
    name: "A",
    position: data.latLng,
    lat: data.latLng.lat(),
    lng: data.latLng.lng(),
    userCreated: true,
  })

  console.log(restaurants)

  var newMarker = new google.maps.Marker({
    position: data.latLng,
    map: map,
    lat: data.latLng.lat(),//more readable
    lng: data.latLng.lng(),//more readable 
  });
  newRestaurantContent(newMarker)
}


//___________________________________________END

//______________________________________________BEGIN new restaurant content
// =============== Fran code ====================================

/****************************************************************************
             Getting data from user - DOM manipulation *****
**************************************************************************** */

function newRestaurantContent(newMarker) {
  //loop through restaurants global
  for (let i = 0; i < restaurants.length; i++) {
    //looking for restaurant with same position of marker
    if (restaurants[i].position === newMarker.position) {
      let newRestaurantContent = restaurants[i]

      //when click new marker DisplayForm - set newName
      newMarker.addListener('click', function() {
        //check if it is a new restaurant
        if (newRestaurantContent.userCreated === true) {
          //display form
          document.getElementById("form-add-restaurant").style.display = "block";

          $('#add-restaurant').on('click', function() {
            let newName = document.getElementById('res-name').value
            //when you create a new restaurant the default name is "A"
            //if the default name is A change it with new user input
            if (newRestaurantContent.name === 'A') {
              newRestaurantContent.name = newName
            }
            //hide form
            document.getElementById("form-add-restaurant").style.display = "none";
          })
        } else {
          displayNewRestaurantContent(newMarker, newRestaurantContent)
        }

        newRestaurantContent.userCreated = false;

      }) // END when click new marker DisplayForm - set newName
    }
  }
}

/*-----------------------------------------------------------------------------------*/

//______________________________________________END


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

      for (let i = 0; i < results.length; i++) {
        // storing all the results restaurants in an array. I am structuring the data
        let allRestaurant = [];
        allRestaurant = {
          name: results[i].name,
          position: results[i].geometry.location,
          rating: results[i].rating,
        }
        restaurants.push(allRestaurant)
      }

      console.log(restaurants)


      // ==============  Fran code  =========================================
      createSurroundingPlaceMarkers(map); // WOrk (this might not be the proper place to invoke this function.....you must decide for yourself. It looks about right ....kinda :)
      createSurroundingPlaceList();

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
      infoWindow.setContent('You are here!');
      infoWindow.open(map);

      map.setCenter(pos);
      markerMyPosition(pos, map); // Blue marker myPosition
      getSurroundingPlaces(map, pos) // restaurants nearBy

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}


//____________________________________________END

//_____________________________________________BEGIN create blue marker MyPosition
// ==============  Fran code  =========================================
function markerMyPosition(pos, map) {
  return new google.maps.Marker({
    map: map,
    position: pos,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'blue',
      fillOpacity: 0.4,
      scale: 15,
      strokeColor: 'blue',
      strokeWeight: 1,
      zIndex: 1
    },
    draggable: true
  });
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

  let infoWindow = createPopUpInfoWindow();
  getUserGeoLocation(map, infoWindow);
  addRestaurant(map);





}



//_________________________________________  END MAIN application
