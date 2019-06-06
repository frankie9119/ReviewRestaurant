"use strict";

//_______ globals
let restaurants = [];
let allMarkers = [];
let map;


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



//__________________________________________BEGIN Sort Restaurants by rating

function sortRestByRating(restaurantsArraySort) {
  let restaurants = [...restaurantsArraySort];

  let restaurantsSort = restaurants.sort((a, b) => {
    return a.rating - b.rating
  });
  return restaurantsSort
}


//__________________________________________END


//__________________________________________BEGIN get ready to get specific rating from user



function getSpecificRating(restaurantsArraySpecific, ratingValue) {

  let restaurantsResultList = restaurantsArraySpecific.filter((val) => {
    return val.rating === ratingValue
  })
  //console.log(restaurantsResultList)
  return restaurantsResultList
}


//__________________________________________END


//__________________________________________BEGIN Display surrounding Place List in right pannel


function displaySurroundingPlaceList(restaurantsArray) {
  $("#restaurantsList").empty();
  let restaurantsList = $("#restaurantsList");
  for (let i = 0; i < restaurantsArray.length; i++) {
    restaurantsList.append("<li>" + restaurantsArray[i].name + ' ' + restaurantsArray[i].rating + ' ' + buildRatingStarDisplayValue(restaurantsArray[i].rating) + "</li>")
  }
}


//__________________________________________END


//___________________________________________BEGIN display reviewList


// ================ Fran code ===================
function displayReviewList(displayReview) {
  $("#review").empty();
  let reviewDisplayList = $("#review");

  for (let i = 0; i < displayReview.length; i++) {
    console.log(displayReview[i])
    reviewDisplayList.append("<li>" + displayReview[i].text + "</li>")
  }
}


//__________________________________________END



/* ===========================================================================
  
    THE FOLLOWING CODE IS WORKING WITH THE RESTAURANTS FROM GOOGLE API

=========================================================================== */





//__________________________________________BEGIN create surrounding place markers


function createSurroundingPlaceMarkers(map, restaurantsArray) {

  // ==============  Fran code  =========================================
  for (let i = 0; i < restaurantsArray.length; i++) {

    let marker = new google.maps.Marker({
      map: map,
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      position: restaurantsArray[i].position,
      name: restaurantsArray[i].name,
      rating: restaurantsArray[i].rating,
      placeId: restaurantsArray[i].placeId,
      id: restaurantsArray[i].id
    });

    allMarkers.push(marker);
    // DISPLAY INFO
    clickOnMarkerInfo(marker, map)

  }
}

//__________________________________________END 



//___________________________________________BEGIN get review from google
// ================ Fran code ===================
function getReviewFromGoogle(marker, restaurants, map) {

  let serviceNew = new google.maps.places.PlacesService(map);

  serviceNew.getDetails({
    placeId: marker.placeId
  }, function(restaurants, status) {

    if (status === google.maps.places.PlacesServiceStatus.OK) {

      let displayReview = restaurants.reviews;

      displayReviewList(displayReview);
    }
  });
}
//__________________________________________END


//___________________________________________BEGIN click on markers info!


// ================ Fran code ===================
function clickOnMarkerInfo(marker, map) {

  marker.addListener('click', function() {

    $("#title").html(marker.name);
    $("#rating-small").html(buildRatingStarDisplayValue(marker.rating));
    $("#review").html(marker.placeId);
    alert(marker.placeId)
    getReviewFromGoogle(marker, restaurants, map)

    // Modal
    $("#myModal").modal();
    //getReviewFromGoogle(marker);

    // ======== STREET VIEW ============
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view'), {
        position: marker.position,

      });

  })
}


//___________________________________________END



/* ===========================================================================
  
    THE FOLLOWING CODE IS WORKING WITH THE NEW RESTAURANTS ADDED

=========================================================================== */


//___________________________________________BEGIN right click add restaurant


// ================ Fran code ===================
function addRestaurant(map) {
  // This event listener calls addMarker() when the map is clicked.
  map.addListener('rightclick', function(e) {
    document.getElementById("form-add-restaurant").style.display = "block";
    createNewDataStructureForNewRestaurants(e, map);
  });
}


//___________________________________________END


//_________________________________________BEGIN add marker for new restaurant to the map.

function createNewDataStructureForNewRestaurants(data, map) {

  //default name for new restaurant is "A"

  restaurants.push({
    name: 'A',
    position: data.latLng,
    lat: data.latLng.lat(),
    lng: data.latLng.lng(),
    userName: '',
    userReview: '',
    placeId: 0,
  })

  console.log(restaurants)

  newRestaurantContent(data, map)

}
//______________________________________________END


//______________________________________________BEGIN new restaurant content

/****************************************************************************
             Getting data from user - DOM manipulation *****
**************************************************************************** */

function newRestaurantContent(data, map) {

  //loop through restaurants global
  for (let i = 0; i < restaurants.length; i++) {

    let newRestaurantContent = restaurants[i]


    //display form
    document.getElementById("form-add-restaurant").style.display = "block";

    $('#add-restaurant').on('click', function() {
      let newName = document.getElementById('res-name').value
      let ratingNewRestaurant = document.getElementById('ratingNewRestaurant').value



      let ratingNumberNewRestaurant = parseInt(ratingNewRestaurant);// <---------- HERE !



      let userName = document.getElementById('user-name').value;
      let userReview = document.getElementById('user-review').value;

      createNewPlaceMarker(data, map, newRestaurantContent, ratingNumberNewRestaurant);

      //when you create a new restaurant the default name is "A"
      //if the default name is A change it with new user input
      if (newRestaurantContent.name === 'A') {
        newRestaurantContent.name = newName;
        newRestaurantContent.rating = ratingNumberNewRestaurant;

        newRestaurantContent.userName = userName;
        newRestaurantContent.userReview = userReview;

        //display on right pannel list
        displaySurroundingPlaceList(sortRestByRating(restaurants));
      }
      //hide form
      document.getElementById("form-add-restaurant").style.display = "none";

    });
  }
};


//______________________________________________END



//_________________________________________BEGIN create new restaurant marker

function createNewPlaceMarker(data, map, newRestaurantContent, ratingNumberNewRestaurant) {

  alert(ratingNumberNewRestaurant) // <----------- HERE !

  let newMarker = new google.maps.Marker({
    position: data.latLng,
    map: map,
    lat: data.latLng.lat(), //more readable
    lng: data.latLng.lng(), //more readable
    rating: ratingNumberNewRestaurant,
  });
  allMarkers.push(newMarker);
  clickOnNewMarkerInfo(newMarker, map, newRestaurantContent)

}

//___________________________________________END



//___________________________________________BEGIN display New Restaurant Content

// ================ Fran code ===================
function clickOnNewMarkerInfo(newMarker, map, newRestaurantContent) {
  newMarker.addListener('click', function() {
    $("#title").html(newRestaurantContent.name);
    $("#rating-small").html(buildRatingStarDisplayValue(newRestaurantContent.rating));
    $("review").html(newRestaurantContent.userReview);
    // Modal
    $("#myModal").modal();
    // ======== STREET VIEW ============
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view'), {
        position: newMarker.position,

      });
  });
}


//___________________________________________END






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
          rating: Math.round(results[i].rating),
          placeId: results[i].place_id,
          id: results[i].id
        }

        restaurants.push(allRestaurant)
      }

      console.log(restaurants)


      // ==============  Fran code  =========================================
      createSurroundingPlaceMarkers(map, restaurants); 

      displaySurroundingPlaceList(sortRestByRating(restaurants));

    });
}

//___________________________________________END 

/* =========================================================================
           HERE I AM GETTING USER DATA FROM SELECT (right pannel)
=============================================================================*/

//__________________________________________BEGIN get user rating choice and display


$('#rating-control').on('change', function(e) {
  let ratingFromUser = this.value

  if (e.target.value === "all") {
    displaySurroundingPlaceList(sortRestByRating(restaurants));
    setMapOnAll(null);
    showMarkers();
  } else {

    let ratingNumberFromUser = parseInt(ratingFromUser);

    let specificRating = getSpecificRating(restaurants, ratingNumberFromUser);
    console.log(restaurants)

    displaySurroundingPlaceList(specificRating);
    setMapOnAll(null);
    setMapOnSome(ratingNumberFromUser);
  }
});

//__________________________________________END




/* ==============================================================
           HERE I AM SETTING THE MARKERS ON MAP
==============================================================*/
function setMapOnAll(map) {
  for (var i = 0; i < allMarkers.length; i++) {

    allMarkers[i].setMap(map);
  }
}

function showMarkers() {
  setMapOnAll(map);
}

function setMapOnSome(ratingNumberFromUser) {
  //setMapOnAll(null);
  for (var i = 0; i < allMarkers.length; i++) {
    if (allMarkers[i].rating === ratingNumberFromUser) {
      allMarkers[i].setMap(map);
    }
  }
}
/* ==============================================================
      end - HERE I AM SETTING THE MARKERS ON MAP  -  end
==============================================================*/




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
  map = createMap();

  let infoWindow = createPopUpInfoWindow();
  getUserGeoLocation(map, infoWindow);
  addRestaurant(map);


  //setMapOnAll(map);





}



//_________________________________________  END MAIN application
