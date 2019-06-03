"use strict";
let restaurants = [];
let markers = [];

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
    restaurantsList.append("<li>" + restaurantsArray[i].name + ' ' + restaurantsArray[i].rating +' ' + buildRatingStarDisplayValue(restaurantsArray[i].rating) +"</li>")
  }
}


//__________________________________________END
//__________________________________________BEGIN create surrounding place markers


function createSurroundingPlaceMarkers(map,restaurantsArray) { 
//console.log(restaurantsArray)
  // ==============  Fran code  =========================================
  for (let i = 0; i < restaurantsArray.length; i++) {

//if (restaurantsArray[i].getMap() != null) restaurantsArray[i].setMap(null);

    let marker = new google.maps.Marker({
      map: map,
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      position: restaurantsArray[i].position,
      name: restaurantsArray[i].name,
      rating: restaurantsArray[i].rating,
      placeId: restaurantsArray[i].placeId,
      id: restaurantsArray[i].id
      //review: restaurantsArray[i].review,
    });
    // add click on marker info modal()
    clickOnMarkerInfo(marker)
    markers.push(marker)
    //console.log(marker.review)

  }
}

//__________________________________________END 


//__________________________________________BEGIN get user rating choice and display


$('#rating-control').on('change', function(e) {
let ratingFromUser = this.value

if(e.target.value === "all"){
   //alert("Weeeeeee")
   displaySurroundingPlaceList(sortRestByRating(restaurants));
}else{


  let ratingNumberFromUser = parseInt(ratingFromUser);


  // *****************************************************************************************
  //                   WORKING ON ALSO UPDATE THE MAP WHEN SORT BY RATING 
  // *****************************************************************************************

  let specificRating = getSpecificRating(restaurants,ratingNumberFromUser);
  console.log(restaurants)
  //console.log(specificRating)
  displaySurroundingPlaceList(specificRating);

  }
});


//__________________________________________END

function getReviewFromGoogle(marker) {
let serviceNew = new google.maps.places.PlacesService(map);

  serviceNew.getDetails({
    placeId: marker.placeId
  }, function(restaurants, status) {

    if (status === google.maps.places.PlacesServiceStatus.OK) {

      for(let i = 0; i <= restaurants.reviews.length; i++) {

        
        let displayReview = restaurants.reviews[i]
        
        console.log(displayReview);
        let reviewDisplayList = $("#review");

        reviewDisplayList.append("<li>" + displayReview.text +"</li>")




      }
    }
  });
}



//___________________________________________BEGIN click on markers info
// ================ Fran code ===================
function clickOnMarkerInfo(marker) {

  marker.addListener('click', function() {
    //alert(marker.name)
    //alert(marker.rating)
    $("#title").html(marker.name);
    $("#rating-small").html(buildRatingStarDisplayValue(marker.rating));
    //$("#review").html(marker.placeId);
    getReviewFromGoogle(marker, restaurants)
    
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
//___________________________________________BEGIN display New Restaurant Content
// ================ Fran code ===================
function displayNewRestaurantContent(newMarker, newRestaurantContent) {
  $("#title").html(newRestaurantContent.name);
  $("#rating-small").html(buildRatingStarDisplayValue(newRestaurantContent.rating))

  // Modal
  $("#myModal").modal();
        // ======== STREET VIEW ============
      var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('street-view'), {
      position: newMarker.position,

    });
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
  markers.push(newMarker)
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
            let ratingNewRestaurant = document.getElementById('ratingNewRestaurant').value
            let ratingNumberNewRestaurant = parseInt(ratingNewRestaurant)
            //when you create a new restaurant the default name is "A"
            //if the default name is A change it with new user input
            if (newRestaurantContent.name === 'A') {
              newRestaurantContent.name = newName;
              newRestaurantContent.rating = ratingNumberNewRestaurant;
              displaySurroundingPlaceList(sortRestByRating(restaurants));
            }
            //hide form
            document.getElementById("form-add-restaurant").style.display = "none";
          })
        } else { // If the newRestaurantContent.userCreated is NOT true 
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
          rating: Math.round(results[i].rating),
          placeId: results[i].place_id,
          id: results[i].id
        }

        restaurants.push(allRestaurant)
      }

      console.log(restaurants)


      // ==============  Fran code  =========================================
      createSurroundingPlaceMarkers(map, restaurants); // WOrk (this might not be the proper place to invoke this function.....you must decide for yourself. It looks about right ....kinda :)
      //createSurroundingPlaceList();
      //let sortedRestaurants = sortRestByRating(restaurants);
      //displaySurroundingPlaceList(sortRestByRating(restaurants));
      displaySurroundingPlaceList(sortRestByRating(restaurants));

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
