"use strict";

//_______ globals
let restaurants = [];
let allMarkers = [];
let map;


//_________________________________________BEGIN createMap


function createMap() {
  return new google.maps.Map(document.getElementById('map'), {

    zoom: 15
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
        
      displayReviewList(displayReview, marker);

      //let displayReview = restaurants.reviews;     
      //displayReviewList(displayReview);

    };
  });
}
//__________________________________________END

// ================ Fran code ===================
function displayReviewList(displayReview, marker) {
  $("#review").empty();
  let reviewDisplayList = $("#review");



  for (let i = 0; i < displayReview.length; i++) {
    //console.log(displayReview[i]);

    let test = [{
  restaurantName: "Bronco",
  position: marker.position,
  ratings: [{
    author_name: '',
    review: displayReview[i].text,
  }, ]

}]


//test.ratings.author_name = displayReview[i].text
//test.ratings.push(displayReview[i].author_name)




    //testing.push(test);
    console.log(test)
    reviewDisplayList.append("<li>" +'<b>Author:</b> ' + displayReview[i].author_name +'<br>' +'<b>Review:</b> '+displayReview[i].text + "</li>")
  }
}


//__________________________________________END

//___________________________________________BEGIN click on markers info!


// ================ Fran code ===================
function clickOnMarkerInfo(marker, map) {

  marker.addListener('click', function() {

    getReviewFromGoogle(marker, restaurants, map)

/*====================================================================================================
                  The idea is this:

                  Because you have to click on a marker in order to add a new review:

                  when click on marker clickOnMarkerInfo() is called;
                  in clickOnMarkerInfo() first run getReviewFromGoogle();
                  store the reviews in the global restaurants;
                  loop through restaurants; 
                  if restaurants.position === marker.position Display name, rating, reviews, etc..

========================================================================================================*/

for(let i = 0; i < restaurants.length; i ++){
  if(restaurants[i].position === marker.position){
    $("#title").html(restaurants[i].name);
    $("#rating-stars").html(buildRatingStarDisplayValue(restaurants[i].rating));
    $("#review").html(restaurants[i].placeId);
  }
}

    

    //alert(marker.placeId)
    

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

/* =====================================================================================
  
   end---- THE FOLLOWING CODE IS WORKING WITH THE RESTAURANTS FROM GOOGLE API ---- end
========================================================================================= */






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

    name: "A",
    position: data.latLng,
    lat: data.latLng.lat(),
    lng: data.latLng.lng(),
    userCreated: true,
    rating: 0,
    newPlaceId: true,
    placeId: restaurants.length,
    id: restaurants.length,
    review: '',
    author_name: '',
  });

  newRestaurantContent(data, map);

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

      let ratingNumberNewRestaurant = parseInt(ratingNewRestaurant);

      let author_name = document.getElementById('user-name').value;

      let review = document.getElementById('user-review').value;


      if (newRestaurantContent.name === 'A') {
        newRestaurantContent.name = newName;
        newRestaurantContent.rating = ratingNumberNewRestaurant;

        newRestaurantContent.author_name = author_name;
        newRestaurantContent.review = review;

        displaySurroundingPlaceList(sortRestByRating(restaurants));
        createNewPlaceMarker(map, data, newRestaurantContent);
      }

      //hide form
      document.getElementById("form-add-restaurant").style.display = "none";
     

    });
  }

};


//______________________________________________END



//_________________________________________BEGIN create new restaurant marker

function createNewPlaceMarker(map, data, newRestaurantContent) {

  var newMarker = new google.maps.Marker({

    position: data.latLng,
    name: newRestaurantContent.name,
    map: map,
    lat: data.latLng.lat(), //more readable
    lng: data.latLng.lng(), //more readable 
    rating: newRestaurantContent.rating,
    icon: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 5,
      strokeWeight: 2,
      strokeColor: "#B40404"
    },
    animation: google.maps.Animation.DROP,
    review: newRestaurantContent.review,
    author_name: newRestaurantContent.author_name,

  });

  allMarkers.push(newMarker);

  clickOnNewMarkerInfo(newMarker, map,newRestaurantContent)
}

//___________________________________________END



//___________________________________________BEGIN display New Restaurant Content

// ================ Fran code ===================
function clickOnNewMarkerInfo(newMarker, map,newRestaurantContent) {
  newMarker.addListener('click', function() {
    $("#title").html(newRestaurantContent.name);
    $("#rating-stars").html(buildRatingStarDisplayValue(newRestaurantContent.rating));

    $("#review").empty();
    $("#review").append("<li>" +'<b>Author:</b> ' + newRestaurantContent.author_name +'<br>' +'<b>Review:</b> '+ newRestaurantContent.review + "</li>");

    // Modal
    $("#myModal").modal();
    // ======== STREET VIEW ============
    let panoramaN = new google.maps.StreetViewPanorama(
      document.getElementById('street-view'), {
        position: newMarker.position,

      });
  });
}


//___________________________________________END







/* =================================================================================
  
                              WORKING ON ADD A REVIEW
==================================================================================== */



$('#btn-add-review').on('click', function() {
  document.getElementById("add-new-review").style.display = "block";
});



//document.getElementById("add-new-review").style.display = "block";

    $('#add-new-review').on('click', function() {
     

      let ratingReview = document.getElementById('new-rating').value
      let ratingReviewNumber = parseInt(ratingReview);
      let userNameReview = document.getElementById('new-user-name').value;
      let newReview = document.getElementById('new-user-review').value;


//document.getElementById("add-new-review").style.display = "none";
    });







/* =================================================================================
  
               end--->      WORKING ON ADD A REVIEW     <---end
==================================================================================== */










/* =================================================================================
  
   end----- THE FOLLOWING CODE IS WORKING WITH THE NEW RESTAURANTS ADDED --- end
==================================================================================== */



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
          id: results[i].id,
          review: '',
          author_name: '',
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