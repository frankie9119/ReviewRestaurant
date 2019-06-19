"use strict";

//_______ globals
let map;
let restaurants = [];
let allMarkers = [];
let placeIdOfMarkerClicked;




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
    return restaurantsResultList
}


//__________________________________________END


//__________________________________________BEGIN Display surrounding Place List in right pannel


function displaySurroundingPlaceList(restaurantsArray) {
    let restaurantsList = $(".restaurantsList");
    let restaurantsListCollapse = $(".restaurantsListCollapse");
    restaurantsList.empty();
    restaurantsListCollapse.empty();


    for (let i = 0; i < restaurantsArray.length; i++) {
        restaurantsList.append("<li>" + restaurantsArray[i].name + ' ' + ' ' + restaurantsArray[i].rating + buildRatingStarDisplayValue(restaurantsArray[i].rating) + "</li>");
        restaurantsListCollapse.append("<li>" + restaurantsArray[i].name + ' ' + ' ' + buildRatingStarDisplayValue(restaurantsArray[i].rating) + "</li>");
    }
}


//__________________________________________END


//___________________________________________BEGIN display reviewList





/* ===========================================================================
  
    THE FOLLOWING CODE IS WORKING WITH THE RESTAURANTS FROM GOOGLE API
=========================================================================== */





//__________________________________________BEGIN create surrounding place markers


function createSurroundingPlaceMarkers(map, restaurantsArray) {

    for (let i = 0; i < restaurantsArray.length; i++) {

        let restArray = restaurantsArray[i]
        let marker = new google.maps.Marker({
            map: map,
            icon: 'restaurant.png',
            position: restaurantsArray[i].position,
            name: restaurantsArray[i].name,
            rating: restaurantsArray[i].rating,
            placeId: restaurantsArray[i].placeId,
            id: restaurantsArray[i].id
        });

        allMarkers.push(marker);

        // DISPLAY INFO
        clickOnMarkerInfo(marker, map);
    }
}

//__________________________________________END 

//___________________________________________BEGIN click on markers info!


function clickOnMarkerInfo(marker, map) {

    marker.addListener('click', function() {

        placeIdOfMarkerClicked = marker.placeId;
        getReviewFromGoogle(marker, restaurants, map)

        // Modal
        $("#myModal").modal();

        // ======== STREET VIEW ============
        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('street-view'), {
                position: marker.position,

            });


    });
}


//___________________________________________END



//___________________________________________BEGIN get review from google

function getReviewFromGoogle(marker, restaurants, map) {

    let serviceNew = new google.maps.places.PlacesService(map);

    serviceNew.getDetails({
        placeId: marker.placeId
    }, function(restaurants, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {

            let displayReview = restaurants.reviews;

            displayReviewList(displayReview);
        };
    });
}
//__________________________________________END


//___________________________________________BEGIN display review list in the modal()
function displayReviewList(displayReview) {

    for (let i = 0; i < displayReview.length; i++) {

        for (let i = 0; i < restaurants.length; i++) {
            if (restaurants[i].reviewsFromGoogle === true) {
                //if (marker.position === restaurants[i].position) {
                if (restaurants[i].placeId === placeIdOfMarkerClicked) {

                    // NOW I HAVE TO PUSH RATINGSTEST INTO RESTAURANTS[I] ONLY IF restaurants[i].reviewsFromGoogle === true
                    restaurants[i].review = displayReview
                    restaurants[i].reviewsFromGoogle = false;
                }
            }
        }
    }
    displayReviewListDOM();
}

//__________________________________________END


//___________________________________________BEGIN display review list in the modal() DOM 

function displayReviewListDOM() {
    $("#review").empty();
    let reviewDisplayList = $("#review");
    for (let i = 0; i < restaurants.length; i++) {

        //if (marker.position === restaurants[i].position) {
        if (restaurants[i].placeId === placeIdOfMarkerClicked) {

            for (let j = 0; j < restaurants[i].review.length; j++) {

                let reviewToDisplay = restaurants[i].review[j];
                console.log(restaurants[i])

                $("#title").html(restaurants[i].name);
                $("#rating-stars").html(buildRatingStarDisplayValue(restaurants[i].rating));

                reviewDisplayList.append("<li>" + '<b>Author:</b> ' + reviewToDisplay.author_name + '<br>' + '<b>Review:</b> ' + reviewToDisplay.text + '<br>' + '<b>Rating:</b> ' + buildRatingStarDisplayValue(reviewToDisplay.rating) + "</li>");
                /*
                              HERE I AM TRYING TO SUM ALL THE RESTAURANTS.REVIEW.RATING VALUE & DIVIDE THE LENGTH TO GET THE MEDIAN VAL
                                restaurants[i].rating = reviewToDisplay.rating.reduce((a, b) => a + b, 0);
                                displaySurroundingPlaceList(sortRestByRating(restaurants));
                */
            }
        }
    }
}

//__________________________________________END




/* =================================================================================
  
              begin       ADD A REVIEW                     
==================================================================================== */
$('#btn-add-review').on('click', function() {
    $("#div-add-new-review").show();
})


$('#btn-add-new-review').on('click', function() {

    let ratingReviewNumber = $('#new-rating').val();
    //let ratingReviewNumber = parseInt(ratingReview);
    let userNameReview = $('#new-user-name').val();
    let newReview = $('#new-user-review').val();

    for (let i = 0; i < restaurants.length; i++) {
//console.log(restaurants[i].review)
        console.log(Array.isArray(restaurants[i].review))

        if (restaurants[i].placeId === placeIdOfMarkerClicked) {

            restaurants[i].review.push({
                author_name: userNameReview,
                text: newReview,
                rating: ratingReviewNumber,
            })
        }
    }
    //console.log(restaurants);
    $("#div-add-new-review").hide();
    $(this).closest('form').find("input[type=text], textarea").val("");
});


/* =================================================================================
  
               end--->      ADD A REVIEW     <---end
==================================================================================== */



/* =====================================================================================
  
   end---- THE FOLLOWING CODE IS WORKING WITH THE RESTAURANTS FROM GOOGLE API ---- end
========================================================================================= */






/* ===========================================================================
  
    THE FOLLOWING CODE IS WORKING WITH THE NEW RESTAURANTS ADDED
=========================================================================== */


//___________________________________________BEGIN right click add restaurant
let counter = 0;
function addRestaurant(map) {

    map.addListener('rightclick', function(e) {
        //$("#info-content-new-restaurant").show();
        counter = counter + 1
        createNewDataStructureForNewRestaurants(e, map);
    });
}


//___________________________________________END


//_________________________________________BEGIN add marker for new restaurant to the map.

function createNewDataStructureForNewRestaurants(data, map) {
  createNewPlaceMarker(data,map)
//console.log(data.latLng)
    //default name for new restaurant is "A"
    
    restaurants.push({

        name: '',
        position: data.latLng,
        lat: data.latLng.lat(),
        lng: data.latLng.lng(),
        userCreated: true,
        rating: '',
        newPlaceId: true,
        placeId: '',
        id: restaurants.length,
        number: counter,
        review: [{
            text: '',
            author_name: '',
        }, ]
    });

    
    
}

//______________________________________________END

//_________________________________________BEGIN create new restaurant marker

function createNewPlaceMarker(data, map) {
//console.log(data.latLng)

    let newMarker = new google.maps.Marker({

        position: data.latLng,
        //name: newRestaurantContent.name,
        map: map,
        //rating: newRestaurantContent.rating,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5,
            strokeWeight: 2,
            strokeColor: "#B40404"
        },
        animation: google.maps.Animation.DROP,
        number: counter,
        new: true,
        //placeId: newRestaurantContent.placeId,

    });

    allMarkers.push(newMarker);

    clickOnNewMarkerInfo(data,map,newMarker)
}

//___________________________________________END
//___________________________________________BEGIN display New Restaurant Content

// ================ Fran code ===================
function clickOnNewMarkerInfo(data,map,newMarker) {
    newMarker.addListener('click', function() {

console.log(newMarker.new)
  if(newMarker.new === true){
        $("#myModalX").modal();
    newRestaurantContent(data, map, newMarker);
  }else{
    alert('not new')
  }



//$("#modalTest").modal();

//alert(newMarker.number)

/*
        placeIdOfMarkerClicked = newMarker.placeId;

        displayReviewListDOM();

        // Modal
        $("#myModal").modal();
        // ======== STREET VIEW ============
        let panoramaN = new google.maps.StreetViewPanorama(
            document.getElementById('street-view'), {
                position: newMarker.position,

            });
*/
    });
}


//___________________________________________END

//______________________________________________BEGIN new restaurant content

/****************************************************************************
             Getting data from user - DOM manipulation *****
**************************************************************************** */

function newRestaurantContent(data, map, newMarker) {
    let restaurantIndex = 0;
    //loop through restaurants global
    
    for (let i = 0; i < restaurants.length; i++) {

        let newRestaurantContent = restaurants[i];

        //display form add restaurant
        //$("#form-add-restaurant").show();

        $('#add-restaurant').on('click', function() {
          //for(let j = 0; j < newMarker.length; j++){
            //console.log(newMarker[j])
            if(newRestaurantContent.number === newMarker.number) {
          
          
            restaurantIndex = restaurantIndex + 1; // in this way every restaurant added has a different number

            let newName = $('#res-name').val();
            let ratingNewRestaurant = $('#ratingNewRestaurant').val();
            let ratingNumberNewRestaurant = parseInt(ratingNewRestaurant);
            let author_name = $('#user-name').val();
            let text = $('#user-review').val();


           
              console.log(newMarker.number)
              console.log(newRestaurantContent.number)
              console.log(newRestaurantContent)

                newRestaurantContent.name = newName;
                newRestaurantContent.rating = ratingNumberNewRestaurant;
                newRestaurantContent.placeId = restaurantIndex;

                newRestaurantContent.review.push({
                    author_name: author_name,
                    text: text,
                    rating: ratingNumberNewRestaurant,
                })

                newMarker.new = false,

                displaySurroundingPlaceList(sortRestByRating(restaurants));
                createNewPlaceMarker(map, data, newRestaurantContent);
            }
          //}

            //hide form add restaurant
            $("#info-content-new-restaurant").hide();
            //$(this).closest('form').find("input[type=text], textarea").val("");
        });

    };

};


//______________________________________________END



















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
                    reviewsFromGoogle: true,
                }

                restaurants.push(allRestaurant)
            }


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







}



//_________________________________________  END MAIN application