
var map, infoWindow, resultRestaurantsLoop,markerRate, markerTitle, markerReview;

let all = true;
let one = false;
let two = false;
let three = false;
let four = false;
let five = false;

let closeRestaurants = $("#closeRestaurants");
let getValue = document.getElementById("rating-control");

let geoRestaurantSelected = {}
let markerNew = [];
let markerRestaurantSelected = [];
let markersArray = [];

let markers = [];
let delMarker = [];


//______________________________________________________________________BEGIN helper Functions (William code)



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



//_____________________________________________________________________END helper functions (William code)

function displayRestaurantsList(){
  let displayRestaurantsList = closeRestaurants.append("<li>" + resultRestaurantsLoop.name + resultRestaurantsLoop.rating + buildRatingStarDisplayValue(resultRestaurantsLoop.rating) + "</li>")
  return displayRestaurantsList
}


  function buildStars() {
    /*if (markerRate) {
      let ratingHtml = '';
      for (let i = 0; i < 5; i++) {
        if (markerRate < (i + 0.5)) {
          ratingHtml += '&#10025;';
        } else {
          ratingHtml += '&#10029;';
        }
        //document.getElementById('rating-small').style.display = '';
        document.getElementById('rating-small').innerHTML = ratingHtml;
      }
    } else {
      document.getElementById('rating-small').style.display = 'none';
    }*/

                  //document.getElementById('title').textContent = marker.title;
  
  $("#title").html(markerTitle);
  $("#rating-small").html(buildRatingStarDisplayValue(markerRate));
  $("#review").html(markerTitle);
  // Modal
  $("#myModal").modal();
  }

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
  });// END get initial map location


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
        //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      };

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
        //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      });


      currentLocation = pos;

      //__________________________BEGUIN markers



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
          
          //console.log(marker);
           markerRate = markers.rate
           markerTitle = markers.title
          //alert(marker.title)
           markerReview = markers.review

          delMarker.push(markers)

  //==============FUNCTION MARKER  =================================================
          //(function(marker) {
            markers.addListener('click', function() {
              
              
              buildStars();

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
            


// clear Results
function clearResults() {
    let results = document.getElementById('closeRestaurants');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}


      // Deletes all markers in the array by removing references to them.
            function deleteMarkers() {
                for (let i = 0; i < markers.length; i++) {
                    if (markers[i]) {
                        map: null
                    }
                }
                markers = [];
            }
function deleteMarkersTry() {
  //alert('dmt')
  for (let i = 0; i < delMarker.length; i++) {
    if (delMarker[i].getMap() != null) delMarker[i].setMap(null);
  }
}
function deleteRedM(){
  for (let j = 0; j < markerRestaurantSelected.length; j++){
    //alert('dmt+redmarkers')
    if (markerRestaurantSelected[j].getMap() != null) markerRestaurantSelected[j].setMap(null);
  }
}

// ============ ******************* ===================================== ___________________----------------_________________ // @!#!$!@*(%^!(*&!@*&#^))
function search(){
      var service = new google.maps.places.PlacesService(map);
      var getNextPage = null;

      // Perform a nearby search.
      service.nearbySearch({
          location: currentLocation,

          //alert(currentLocation);
          radius: 5000,
          type: ['restaurant']
        },

        function(results, status, pagination) {
          if (status !== 'OK') return;

          
          //this console.log is super helpfull
          console.log(results);

          
          let userRating = $('#form-control');


         //___________________________BEGIN Loop_____________

          for (let i = 0; i < results.length; i += 1) {


            //console.log(resultRestaurantsLoop)
            resultRestaurantsLoop = results[i]
            //alert(resultRestaurantsLoop)
                  function resultMarker(){
                    //alert('resultMarker')
                          

                          var redMarker = new google.maps.Marker({
                            position: geoRestaurantSelected,
                            map: map,
                            title: markerTitle,
                          });

                          markerRestaurantSelected.push(redMarker)
                 // console.log(geoRestaurantSelected + 'hey hey geo loc here')
                  console.log(markerRestaurantSelected + 'markerRestaurantSelected test')
                  }
            //displayRestaurantsList();
             
             if (all) {
              createMarkers(results);
              if (results[i].rating >= 0){
                console.log('all')
                displayRestaurantsList()
                //closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
              }
             } else if (one) {
                if (results[i].rating >= 1 && results[i].rating < 2){
                  console.log('three')
                  displayRestaurantsList()

                  //closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
                }
             }else if (two) {
                if (results[i].rating >= 2 && results[i].rating < 3){
                  console.log('three')
                  displayRestaurantsList()

                  closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
                }
             }else if (three === true) {

                if (results[i].rating >= 3 && results[i].rating < 4){
                  console.log('three')
                  //clearMarkers()
                  displayRestaurantsList()
                  geoRestaurantSelected = (results[i].geometry.location)
                  
                  resultMarker()



                  //closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
                }
             } else if (four === true) {
              
                if (results[i].rating >= 4 && results[i].rating < 5){
                
                let fourRest = results[i].rating === 4
                console.log(fourRest)
                deleteMarkers()
                displayRestaurantsList()
                geoRestaurantSelected = (results[i].geometry.location)
                resultMarker()

               //closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
              }
            }else if (five) {
              
                if (results[i].rating >= 5){
                  console.log('three')
                  deleteMarkers()
                  displayRestaurantsList()

                  //closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
                }
             }
          }
//_______________END loop ____________

        });//end nearby search




    }// end function search

    // ____________ BEGUIN Sort by Event Listener (rating option user) _____________________
      getValue.addEventListener('change', function () {
                if (getValue.value === 'all') {
                    restSort();
                    all = true;
                    clearResults();
                    deleteMarkersTry()
                    deleteRedM()
                    search();

                } else if (getValue.value === 'one') {
                    restSort();
                    one = true;
                    clearResults();
                                        deleteMarkersTry()
                    deleteRedM()
                    search();
                }
                else if (getValue.value === 'two') {
                    restSort();
                    two = true;
                    clearResults();
                                        deleteMarkersTry()
                    deleteRedM()
                    search();
                }
                else if (getValue.value === 'three') {
                    restSort();
                    three = true;
                    clearResults();

                                        deleteMarkersTry()
                    deleteRedM()
                    //clearMarkers();

                    search();
                }
                else if (getValue.value === 'four') {
                    restSort();
                    four = true;
                    clearResults();
                    //clearMarkers();
                                        deleteMarkersTry()
                    deleteRedM()
                    search();
                }
                else if (getValue.value === 'five') {
                    restSort();
                    five = true;
                    clearResults();
                    //markersArray.push(markerRestaurantSelected);
                    //clearMarkers();
                    //deleteMarkers();
                    deleteMarkersTry()
                    deleteRedM()

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






