var map, infoWindow, resultRestaurantsLoop, service, place;

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
  return displayRestaurantsList
}// ============ END DISPLAY RESTAURANT SORT BY LIST function =======================================

// _____________--------- when click on map PlaceMarker --------___________________________________
      function placeMarkerAndPanTo(latLng, map) {
        var newMarker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        map.panTo(latLng);

        // Modal
        $("#modal-add-rest").modal();
                       
          }

      //_________ end - when click on map PlaceMarker_________________

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

      //__________________________BEGUIN markers Restaurants

      function createMarkers(places) {
        var bounds = new google.maps.LatLngBounds();
        var place;
        // LOOP through markers
        for (var i = 0; i < places.length; i++) {

          place = places[i]
          //________________ BEGUIN place markers on map
          let markers = new google.maps.Marker({
            map: map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            title: place.name,
            rate: place.rating,
            position: place.geometry.location

          }); // _______________ END place markers on map

          markerRate = markers.rate
          markerTitle = markers.title
          markerReview = markers.review

          delMarker.push(markers)

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
      } //=========================== END FUNCTION createMarkers(places) ======================================

      // ------_______ click on map to PlaceMarker ________----------
        map.addListener('click', function(e) {
          placeMarkerAndPanTo(e.latLng, map);
        });// end click on map to PlaceMarker

//_________ modal submit new restaurant
document.getElementById("form-add-restaurant").addEventListener("submit", function (e) {
                

                let name = document.getElementById('res-name');
                let address = document.getElementById('res-address');                                
                let rating = document.getElementById('res-rating');


                let newPlace = {
                    name: name.value,
                    vicinity: address.value,
                    rating: rating.value,
                    position: position,

                };
                /*-----------------------------------------------------------------------------------
                Pushes to array 
                -------------------------------------------------------------------------------------*/
                newRestaurant.push(newPlace);

                //search();
                
            });






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
      }

      
      // ============_________ END Clear Results and Markers _____________=============

      // ============ BEGUIN SEARCH FUNCTION ******************* ===================================== ___________________----------------_________________ // @!#!$!@*(%^!(*&!@*&#^))
      function search() {
        var getNextPage = null;
        service = new google.maps.places.PlacesService(map);

/* TEST id places ===== not working =====
function searchResult(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    // show first result on map and request for details
    var placex = results[0];


    service.getDetails({placeId: placex.place_id}, function(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        //let rating = document.querySelector('#rating');
        let reviewEl = document.querySelector('.modal-body');
        
        //rating.innerHTML = place.rating;
        
        for (let review of place.reviews){
          let li = document.createElement('li');
          li.innerHTML = `<div>Author: ${review.author_name}</div>
                          <em>${review.text}</em>
                          <div>Rating: ${review.rating} star(s)</div>`;
          reviewEl.appendChild(li);
        }
      }
    });
  }
}
     */   
        

        // Perform a nearby search.
        service.nearbySearch({
            location: currentLocation,
            //alert(currentLocation);
            radius: "5000",
            type: ['restaurant']
          },

          function(results, status, pagination) {
            if (status !== 'OK') return;

            if (all) {
              //markers - beach flags
              createMarkers(results);


            }
            //this console.log is super helpfull
            console.log(results);

            let userRating = $('#form-control');

            //___________________________BEGIN Loop_____________

            for (let i = 0; i < results.length; i += 1) {

              placeRed = results[i]

              resultRestaurantsLoop = results[i]

              // ============ ____________ BEGUIN resultMarker ___________ ==============

              // this function displays the red flags ( sort by rating section )

              function resultMarker() {
                // creating red markers from selected rating SORTING BY 
                let redMarker = new google.maps.Marker({
                  position: geoRestaurantSelected,
                  map: map,
                  title: placeRed.name,
                  rate: placeRed.rating,
                });

                markerRestaurantSelected.push(redMarker)

                redMarker.addListener('click', function() {

                  $("#title").html(redMarker.title);
                  $("#rating-small").html(buildRatingStarDisplayValue(redMarker.rate));
                  //$("#review").html(markers.title);
                  // Modal
                  $("#myModal").modal();

                  //======= street View ========
                  var panorama2 = new google.maps.StreetViewPanorama(
                    document.getElementById('street-view'), {
                      position: redMarker.position,

                    });
                })
              } // ====== _________ END Function resultMarker _________ =========


              if (all) {

                if (results[i].rating >= 0) {
                  console.log('all')
                  displayRestaurantsList()
                }
              } else if (one) {
                if (results[i].rating >= 1 && results[i].rating < 2) {
                  displayRestaurantsList()
                  geoRestaurantSelected = (results[i].geometry.location)
                  resultMarker()
                }
              } else if (two) {
                if (results[i].rating >= 2 && results[i].rating < 3) {
                  displayRestaurantsList()
                  geoRestaurantSelected = (results[i].geometry.location)
                  resultMarker()
                }
              } else if (three === true) {

                if (results[i].rating >= 3 && results[i].rating < 4) {
                  displayRestaurantsList()
                  geoRestaurantSelected = (results[i].geometry.location)
                  resultMarker()
                }
              } else if (four === true) {

                if (results[i].rating >= 4 && results[i].rating < 5) {
                  displayRestaurantsList()
                  geoRestaurantSelected = (results[i].geometry.location)
                  resultMarker()
                }
              } else if (five) {

                if (results[i].rating >= 5) {
                  console.log('three')
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
