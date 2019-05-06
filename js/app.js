
var map, infoWindow, marker, resultRestaurantsLoop,markerRate, markerTitle, markerReview;

let all = false;
let one = false;
let two = false;
let three = false;
let four = false;
let five = false;

let closeRestaurants = $("#closeRestaurants");
let getValue = document.getElementById("rating-control");

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
                if (markerRate) {
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
                }
                              //document.getElementById('title').textContent = marker.title;
              $("#title").html(markerTitle);
              $("#review").html(markerReview);

              // Modal
              $("#myModal").modal();
              }


              function panoramaStreetView (){

              }

/*
function getValueSort(){
  alert(getValue)
  if (getValue.value === 'one'){
    alert('one')
  }
} getValueSort()

getValue.on('change', function(){

  if (getValue.val() === 'one'){
    sort();
    one = true;
    createMarkers();
  }
})

function sort(){

    one = false;
    two = false;
    four = false;
    three = false;
    five = false;
    all = false;
}*/

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
  });

function restSort() {
    all = false;
    one = false;
    two = false;
    three = false;
    four = false;
    five = false;
}

  //________________________BEGUIN try HTML5 geolocation



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


          let marker = new google.maps.Marker({
            map: map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            title: place.name,
            rate: place.rating,
            //review: place.reviews.rating,
            position: place.geometry.location

            //r: place.rating,
          });
          marker.rate = markerRate
          marker.title = markerTitle
          marker.review = markerReview
          
          // __________________ Click marker restaurant and display name of restaurant

  //==============FUNCTION MARKER  ======================
          //(function(marker) {
            marker.addListener('click', function() {

              buildStars()

              var panorama = new google.maps.StreetViewPanorama(
              document.getElementById('street-view'), {
              position: marker.position,
                });
            })
          //}(marker))
          //__________________END Click Marker

  //================END FUNCTION MARKER==================================================================


          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
      }




      //=========================== END FUNCTION createMarkers(places) ======================================
            //reset results 

            function clearResults() {
                let results = document.getElementById('closeRestaurants');
                while (results.childNodes[0]) {
                    results.removeChild(results.childNodes[0]);
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

          createMarkers(results);
          //this console.log is super helpfull
          console.log(results);

          
          let userRating = $('#form-control');


         //___________________________BEGIN Loop_____________

          for (let i = 0; i < results.length; i += 1) {
            //console.log(resultRestaurantsLoop)
            resultRestaurantsLoop = results[i]

            //displayRestaurantsList();
             
             if (all) {
              if (results[i].rating >= 0){
                console.log('all')
                //closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
              }
             } else if (one) {
                if (results[i].rating >= 1 && results[i].rating < 2){
                  console.log('three')
                  

                  closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
                }
             }else if (two) {
                if (results[i].rating >= 2 && results[i].rating < 3){
                  console.log('three')
                  

                  closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
                }
             }else if (three === true) {
                if (results[i].rating >= 3 && results[i].rating < 4){
                  console.log('three')
                  

                  closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
                }
             } else if (four === true) {
                if (results[i].rating >= 4 && results[i].rating < 5){
                
                let fourRest = results[i].rating === 4
                console.log(fourRest)
                

               closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
              }
            }else if (five) {
                if (results[i].rating >= 5){
                  console.log('three')
                  

                  closeRestaurants.append("<li>" + results[i].name + results[i].rating  + "</li>")
                }
             }
          }
//_______________END loop ____________

        });//end nearby search
      getValue.addEventListener('change', function () {
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
                }
                else if (getValue.value === 'two') {
                    restSort();
                    two = true;
                    clearResults();
                    search();
                }
                else if (getValue.value === 'three') {
                    restSort();
                    three = true;
                    clearResults();
                   
                    search();
                }
                else if (getValue.value === 'four') {
                    restSort();
                    four = true;
                    clearResults();
                    
                    search();
                }
                else if (getValue.value === 'five') {
                    restSort();
                    five = true;
                    clearResults();
                    search();
                }
            });
    }// end function search

search()




  });


  } 
//=============================== END IF (navigator.geolocation) ==============================================

  //________________________ END try HTML5 geolocation



} // ========================== END INIT FUNCTION ==========================================================


//___________________ FUNCTION ERROR GEOLOCATION

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}






