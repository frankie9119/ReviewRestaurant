"use strict";

//_______ globals
let map;
let restaurants = [];
let allMarkers = [];
let placeIdOfMarkerClicked;
let rightClickPosition;
let restaurantIndex = 0;




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
        restaurantsList.append("<li ><class='restaurantsArray[i].placeId'>" + restaurantsArray[i].name + ' ' + ' ' + restaurantsArray[i].rating + buildRatingStarDisplayValue(restaurantsArray[i].rating) + "</li>");
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
            icon: 'icon.png',
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
    $("#myModalAddReview").modal();
})


$('#btn-add-new-review').on('click', function() {

    let ratingReviewNumber = $('#newRating').val();
    let userNameReview = $('#newUserName').val();
    let newReview = $('#newUserReview').val();



    if (userNameReview == "") {
    alert("Your Name Required");
    return false;
  } else if(ratingReviewNumber=='all') {
    alert("Starts Required");
    return false;
  }else if(newReview=="") {
    alert("Review Required");
    return false;
  }else {

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
  }
    //console.log(restaurants);
    //$("#div-add-new-review").hide();


    $(this).closest('form').find("input[type=text], textarea").val("");
    $(this).closest('form').find("select").val("all");
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

function addRestaurant(map) {

    map.addListener('rightclick', function(e) {
        //myModalX
        $("#myModalTest").modal();
        //$("#info-content-new-restaurant").show();
        rightClickPosition = e.latLng;

    });
}


//___________________________________________END


//_________________________________________BEGIN add add restaurant when click btn called "#add-restaurant".


$('#add-restaurant').on('click', function(e) {
  e.preventDefault();

    restaurantIndex = restaurantIndex + 1; // in this way every restaurant added has a different number

    let newName = $('#resName').val();
    let ratingNewRestaurant = $('#ratingNewRestaurant').val();
    let ratingNumberNewRestaurant = parseInt(ratingNewRestaurant);
    let author_name = $('#userName').val();
    let text = $('#userReview').val();




    if (newName == "") {
    alert("Restaurant Name Required");
    return false;
  } else if(ratingNewRestaurant=='all') {
    alert("Starts Required");
    return false;
  }else if(author_name=="") {
    alert("Your Name Required");
    return false;
  } else if(text=="") {
    alert("Review Required");
    return false;
  } else {
    restaurants.push({

        name: newName,
        position: rightClickPosition,
        userCreated: true,
        rating: ratingNumberNewRestaurant,
        newPlaceId: true,
        placeId: restaurantIndex,
        id: restaurants.length,
        review: [{
            author_name: author_name,
            text: text,
            rating: ratingNumberNewRestaurant,
        }, ]
    });

    displaySurroundingPlaceList(sortRestByRating(restaurants));
    createNewPlaceMarker(map, rightClickPosition, restaurantIndex);
  }








$(this).closest('form').find("input[type=text], textarea").val("");
$(this).closest('form').find("select").val("all");
});


//______________________________________________END

//_________________________________________BEGIN create new restaurant marker

function createNewPlaceMarker(map, rightClickPosition, restaurantIndex) {

    var newMarker = new google.maps.Marker({

        position: rightClickPosition,
        map: map,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5,
            strokeWeight: 2,
            strokeColor: "#B40404"
        },
        animation: google.maps.Animation.DROP,
        placeId: restaurantIndex,

    });

    allMarkers.push(newMarker);

    clickOnNewMarkerInfo(newMarker, map, restaurantIndex)
}

//___________________________________________END

//___________________________________________BEGIN display New Restaurant Content

// ================ Fran code ===================
function clickOnNewMarkerInfo(newMarker, map, restaurantIndex) {
    newMarker.addListener('click', function() {

        placeIdOfMarkerClicked = restaurantIndex;

        displayReviewListDOM();

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