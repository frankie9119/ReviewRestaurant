


/*

=================================================

     !!! THIS FILE IS JUST FOR NOTES !!!

==================================================

*/






















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

function createSurroundingPlaceMarkers(places, map) { // WORK   <---------------

  // ==============  Fran code  =========================================
  for (let i = 0; i < places.length; i++) {

    surroundingPlaces = places[i]

    //console.log(surroundingPlaces)

    let markerSurroundingPlaces = new google.maps.Marker({
      map: map,
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      position: surroundingPlaces.geometry.location

    });

  }

}


//__________________________________________END 

//__________________________________________BEGIN create surrounding place LIST

function createSurroundingPlaceList(places){
    
    let closeRestaurants = $("#closeRestaurants");
    for (let i = 0; i < places.length; i++){
        closeRestaurants.append("<li>" + places[i].name +' '+ buildRatingStarDisplayValue(places[i].rating) +"</li>")

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


      // ==============  Fran code  =========================================
      createSurroundingPlaceMarkers(results, map); // WOrk (this might not be the proper place to invoke this function.....you must decide for yourself. It looks about right ....kinda :)
      createSurroundingPlaceList(results);

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




//HAAAAA

//___________________________________________BEGIN MAIN application

function initMap() {
  let map = createMap();

  let infoWindow = createPopUpInfoWindow()
  getUserGeoLocation(map, infoWindow)




}



//_________________________________________  END MAIN application















var map,
  infoWindow,

  service, place, newPlace, newMarker, infoWindowNew;

let all = true;
let one = false;
let two = false;
let three = false;
let four = false;
let five = false;

let closeRestaurants = $("#closeRestaurants");
let getValue = document.getElementById("rating-control");

let geoRestaurantSelected = {};
let markerRestaurantSelected = [];

let markers = [];
let delMarker = [];
let redMarker = [];
let newRestaurant = [];

let restaurantInfoDiv = document.getElementById('form-add-restaurant');

//__________________________________________BEGIN william code

let userCreatedMarkers = [];
let resultRestaurantsLoop = [];

let form = $('#form-add-restaurant');
let restaurantIsNew = true;
let newRestPlace = [];
let placesResults = [];
let newPlaceX = [];
let plaxRed = [];
let allRestaurants = [];

//__________________________________________END william code




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

console.log(buildRatingStarDisplayValue(3))

// ============= DISPLAY RESTAURANT SORT BY LIST function =============================================

function displayRestaurantsList() {
  let displayRestaurantsList = closeRestaurants.append("<li>" + resultRestaurantsLoop.name + resultRestaurantsLoop.rating + buildRatingStarDisplayValue(resultRestaurantsLoop.rating) + "</li>")
  //let addDisplayRestToList = addNewRestaurantList.append("<li>" + newRestPlace.name + newRestPlace.rating + buildRatingStarDisplayValue(newRestPlace.rating) +"</li>")
  return displayRestaurantsList //, addDisplayRestToList
}


// ============ END DISPLAY RESTAURANT SORT BY LIST function =======================================



// ======================== BEGUIN initMap function =====================================

function initMap() {

  // Create the map.
  var currentLocation = {
    lat: 51.5089022,
    lng: -0.0990328
  };
  // Get initial map location
  let map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation, // Set location
    zoom: 17
  }); // END get initial map location




  //__________________________________________________BEGIN william code

  //----- When click on map console.log lat & lng ---
  map.addListener('click', function(e) {
    console.log(e.latLng.lat())
    console.log(e.latLng.lng())
  });

  //________________________________________________END william code



  function restSort() {
    all = false;
    one = false;
    two = false;
    three = false;
    four = false;
    five = false;
  }

  //________________________BEGUIN HTML5 geolocation

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      //__________________ Place round blue marker MyPosition
      let markerMyPosition = new google.maps.Marker({
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


      currentLocation = pos;

      //__________________________BEGUIN markers Restaurants BEACH FLAG

      function createMarkers(places) {
        var bounds = new google.maps.LatLngBounds();
        var place;
        // LOOP through markers
        for (var i = 0; i < places.length; i++) {

          place = places[i]
          allRestaurants.push(place)
          //console.log(place)
          //________________ BEGUIN place markers on map
          let markers = new google.maps.Marker({
            map: map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            title: place.name,
            rate: place.rating,
            position: place.geometry.location

          }); // _______________ END place markers on map


          delMarker.push(markers)
          //console.log(delMarker)

          //==============FUNCTION MARKER  =================================================
          //(function(marker) {

          markers.addListener('click', function() {

            $("#title").html(markers.title);
            $("#rating-small").html(buildRatingStarDisplayValue(markers.rate));
            //$("#review").html(markers.title);
            // Modal
            $("#myModal").modal();
            //======= street View ========
            var panorama = new google.maps.StreetViewPanorama(
              document.getElementById('street-view'), {
                position: markers.position,

              });
          })
          //}(marker))
          //================END FUNCTION MARKER==================================================================


          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);

        console.log(delMarker)

      } //=========================== END FUNCTION createmarkers(places) ======================================


      /*---------------------------------------------------------------------------------------------------------
                             ADD NEW RESTAURANT CLICK * TO BE FINISHED *
      ---------------------------------------------------------------------------------------------------------*/
      // ------_______ click on map to PlaceMarker ________----------
      map.addListener('rightclick', function(e) {
        placeMarkerAndPanTo(e, map);
        restaurantIsNew = true;
      }); // end click on map to PlaceMarker

      //_________ modal submit new restaurant

      function placeMarkerAndPanTo(data, map) {

        //userCreatedMarkers.push({name:"",position: data.latLng, lat: data.latLng.lat(),lng: data.latLng.lng(), })
        //console.log(userCreatedMarkers)

        // var newMarker = new google.maps.Marker({
        //     position: data.latLng,
        //     map: map
        // });

        //for(let i = 0; i < userCreatedMarkers.length; i+=1){

        var newMarker = new google.maps.Marker({
          position: data.latLng,
          map: map
        });
        markerRestaurantSelected.push(newMarker)
        //}



        /*-----------------------------------------------------------------------------------
            Builds the new Restaurant Content
            -------------------------------------------------------------------------------------*/
        function buildResDetailContent(marker) {
          //alert('restaurantInfoDiv')

          if (restaurantIsNew) {

            $("#modal-add-rest").modal();

          } else {

            $("#titleNewRest").html(newRestPlace.name);
            $("#rating-small-new-rest").html(buildRatingStarDisplayValue(newRestPlace.rating));
            $("#modalNewRest").modal();
          }

        }

        newMarker.addListener('click', function() {
          buildResDetailContent(newMarker)
        })


        document.getElementById("add-restaurant").addEventListener("click", function(e) {

          let name = document.getElementById('res-name');
          let address = document.getElementById('res-address');
          let rating = document.getElementById('res-rating');


          newRestPlace = {
            name: name.value,
            address: address.value,
            rating: rating.value,
            geometry: {
              location: data.latLng
            },
            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
            reviews: '',
          };
          /*-----------------------------------------------------------------------------------
          Reset restaurantIsNew to false - displayRestaurantList
          -------------------------------------------------------------------------------------*/
          newPlaceX.push(newRestPlace);

          restaurantIsNew = false;
          displayRestaurantsList();
          //displayRestaurantsList();

        });

      }
      /*---------------------------------------------------------------------------------------------------------
                         END    ADD NEW RESTAURANT CLICK * TO BE FINISHED *.    END
      ---------------------------------------------------------------------------------------------------------*/



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


      // ============_________ END Clear Results and Markers _____________=============

      // ============ BEGUIN SEARCH FUNCTION ******************* ===================================== ___________________----------------_________________ // @!#!$!@*(%^!(*&!@*&#^))
      function search() {
        var getNextPage = null;
        service = new google.maps.places.PlacesService(map);


        // Perform a nearby search.
        service.nearbySearch({
            location: currentLocation,
            //alert(currentLocation);
            radius: "5000",
            type: ['restaurant']
          },

          function(results, status, pagination) {


            if (status !== 'OK') return;



            //this console.log is super helpfull
            console.log(results);

            placesResults = results

            /* =======================================================================================================
                                SERVICE - GET REVIEWS FROM GOOGLE - PLACE.ID
            ==========================================================================================================*/
            
            let place = results[0];
            console.log(place)

            service.getDetails({
              placeId: place.place_id
            }, function(place, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {

                let reviewEl = document.querySelector('#review-list');

                for (let review of place.reviews) {
                  let li = document.createElement('li');
                  li.innerHTML = `<div>Author: ${review.author_name}</div>
                                            <em>${review.text}</em>`;
                  reviewEl.appendChild(li);
                } //end FOR
              } //END if
            });
            /* =======================================================================================================
                *** END ***         SERVICE - GET REVIEWS FROM GOOGLE - PLACE.placeId.          *** END ***
            ==========================================================================================================*/

            if (all) {

              //markers - beach flags
              //---------------------------------------------------------------------------------------------------------------------------------
              // HERE I THINK I SHOULD CHANGE SOMETHING. I DONT WANT JUST THE FLAG BEACH
              // BUT THE NEW RESTAURANT RED FLAT TOO
              //---------------------------------------------------------------------------------------------------------------------------------

              createMarkers(placesResults);

              //createMarkers(newRestPlace);
              console.log(placesResults);

            }


            let userRating = $('#form-control');

            //___________________________BEGIN Loop_____________
            placesResults.push(newRestPlace);

            for (let i = 0; i < placesResults.length; i += 1) {

              resultRestaurantsLoop = placesResults[i]
              //console.log(resultRestaurantsLoop)

              // ============ ____________ BEGUIN resultMarker ___________ ==============

              // this function displays the red flags ( sort by rating section )
              function resultMarker() {
                // creating red markers from selected rating SORTING BY 
                let redMarker = new google.maps.Marker({
                  position: geoRestaurantSelected,
                  map: map,
                  title: resultRestaurantsLoop.name,
                  rate: resultRestaurantsLoop.rating,
                });

                markerRestaurantSelected.push(redMarker)

                redMarker.addListener('click', function() {

                  $("#title").html(redMarker.title);
                  $("#rating-small").html(buildRatingStarDisplayValue(redMarker.rate));
                  //MODAL
                  $("#myModal").modal();


                  //======= street View ========
                  var panorama2 = new google.maps.StreetViewPanorama(
                    document.getElementById('street-view'), {
                      position: redMarker.position,


                    });
                })
              } // ====== _________ END Function resultMarker _________ =========


              if (all) {

                if (resultRestaurantsLoop.rating >= 0 && resultRestaurantsLoop.rating <= 5) {
                  console.log('all')
                  displayRestaurantsList()
                }
              } else if (one) {
                if (resultRestaurantsLoop.rating >= 1 && resultRestaurantsLoop.rating < 2) {
                  displayRestaurantsList()
                  geoRestaurantSelected = (resultRestaurantsLoop.geometry.location)
                  resultMarker()
                }
              } else if (two) {
                if (resultRestaurantsLoop.rating >= 2 && resultRestaurantsLoop.rating < 3) {
                  displayRestaurantsList()
                  geoRestaurantSelected = (resultRestaurantsLoop.geometry.location)
                  resultMarker()
                }
              } else if (three === true) {

                if (resultRestaurantsLoop.rating >= 3 && resultRestaurantsLoop.rating < 4) {
                  displayRestaurantsList()
                  geoRestaurantSelected = (resultRestaurantsLoop.geometry.location)
                  resultMarker()
                }
              } else if (four === true) {

                if (resultRestaurantsLoop.rating >= 4 && resultRestaurantsLoop.rating < 5) {
                  displayRestaurantsList()
                  geoRestaurantSelected = (resultRestaurantsLoop.geometry.location)
                  resultMarker()
                }
              } else if (five) {

                if (resultRestaurantsLoop.rating > 5) {
                  displayRestaurantsList()

                }
              }
            }
            //_______________END loop ____________

          }); //end nearby search

      } // end function search

      // ____________ BEGUIN Sort by Event Listener (rating option user) _____________________

      // =========== THIS NEEDS TO BE CHANGED ==============
      getValue.addEventListener('change', function() {
        if (getValue.value === 'all') {
          restSort();
          all = true;
          clearResults();
          search();

        } else if (getValue.value === 'one') {
          restSort();
          one = true;
          clearResults();
          search();
        } else if (getValue.value === 'two') {
          restSort();
          two = true;
          clearResults();
          search();
        } else if (getValue.value === 'three') {
          restSort();
          three = true;
          clearResults(); // clear sort by list
          search(); // search again
        } else if (getValue.value === 'four') {
          restSort();
          four = true;
          clearResults();
          search();
        } else if (getValue.value === 'five') {
          restSort();
          five = true;
          clearResults();
          search();
        }

      }); // __________________ END BEGUIN Sort by Event Listener (rating option user) __________________

      // Run function search()
      search()

    });

  } //=============================== END IF (navigator.geolocation) END HTML5 geolocation==============================================


} // ========================== END INIT FUNCTION ==========================================================












//___________________ FUNCTION ERROR GEOLOCATION

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}





































