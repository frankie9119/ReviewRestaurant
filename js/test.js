


/*

=================================================

     !!! THIS FILE IS JUST FOR NOTES !!!

==================================================

*/







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



let service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
      location: userGeoLocation,
    },
    function(results, status) {
      if (status !== 'OK') return;
      for (let i = 0; i < results.length; i++) {
        let storage = [];
        storage = {
          position: results[i].geometry.location,
          placeId: results[i].id,
        }
      }
    });











function getReviewFromGoogle (marker){

let serviceNew = new google.maps.places.PlacesService(map);

  serviceNew.getDetails({
    placeId: marker.placeId
  }, function(restaurants, status) {

    if (status === google.maps.places.PlacesServiceStatus.OK) {

      for(let i = 0; i <= restaurants.reviews.length; i++) {

        console.log(restaurants.reviews[i]);
      }
    }
  });
}

var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for(var i=0; i <= place.reviews.length; i++) {
        console.log(place.reviews[i]);
      }
    }
  });






















function getReviewFromGoogle(marker,restaurants,map) {
let serviceNew = new google.maps.places.PlacesService(map);
for(let i = 0; i < restaurants.placeId.length; i++){
  let restaurantsPlaceId = restaurants.placeId[i]
  console.log(restaurantsPlaceId)
}
  serviceNew.getDetails({
    placeId: marker.placeId
  }, function(restaurants, status) {

    if (status === google.maps.places.PlacesServiceStatus.OK) {
      
      
      for(let i = 0; i <= restaurants.reviews.length; i++) {
        console.log(restaurants.reviews[i]);
        let review = restaurants.reviews[i];
        //reviews.push(review);
        console.log(restaurants);
        //console.log(displayReview.author_name);
        

      }
    }
  });
}

















function displaySurroundingPlaceList(restaurantsArray) {
  $("#restaurantsList").empty();
  let restaurantsList = $("#restaurantsList");
  for (let i = 0; i < restaurantsArray.length; i++) {
    restaurantsList.append("<li>" + restaurantsArray[i].name + ' ' + restaurantsArray[i].rating +' ' + buildRatingStarDisplayValue(restaurantsArray[i].rating) +"</li>")
  }
}

















// In the following example, markers appear when the user clicks on the map.
      // The markers are stored in an array.
      // The user can then click an option to hide, show or delete the markers.
      var map;
      var markers = [];

      function initMap() {
        var haightAshbury = {lat: 37.769, lng: -122.446};

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: haightAshbury,
          mapTypeId: 'terrain'
        });

        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function(event) {
          addMarker(event.latLng);
        });

        // Adds a marker at the center of the map.
        addMarker(haightAshbury);
      }// ======= END INIT MAP ============
//*******************************************************************

      // Adds a marker to the map and push to the array.
      function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
        markers.push(marker);
      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }

function setMapOnSome(ratingNumberFromUser) {
  //setMapOnAll(null);
  for (var i = 0; i < allMarkers.length; i++) {
    if (allMarkers[i].rating === ratingNumberFromUser) {
      allMarkers[i].setMap(map);
    }
  }
}








$('#some_markers').on('click', function(map) {
      
        alert('display')
        for (var i = 0; i < allMarkers.length; i++) {
          allMarkers[i].setMap(map);
        }
      })




















      $('#some_markers').on('click', function() {
        alert('display')
        setMapOnSome(map);
      })
      function setMapOnSome(map){
        setMapOnAll(null);
        for (var i = 0; i < allMarkers.length; i++) {
          if(allMarkers[i].rating === 4){
            //alert('found 4 rating');
            allMarkers[i].setMap(map);

          }
          //allMarkers[i].setMap(map);
        }
      }


function displaySurroundingPlaceList(restaurantsArray) {
  $("#restaurantsList").empty();
  let restaurantsList = $("#restaurantsList");
  for (let i = 0; i < restaurantsArray.length; i++) {
    restaurantsList.append("<li>" + restaurantsArray[i].name + ' ' + restaurantsArray[i].rating + ' ' + buildRatingStarDisplayValue(restaurantsArray[i].rating) + "</li>")
  }
}








































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
            let ratingNumberNewRestaurant = parseInt(ratingNewRestaurant);
            let userName = document.getElementById('user-name').value;
            let userReview = document.getElementById('user-review').value;

            //when you create a new restaurant the default name is "A"
            //if the default name is A change it with new user input
            if (newRestaurantContent.name === 'A') {
              newRestaurantContent.name = newName;
              newRestaurantContent.rating = ratingNumberNewRestaurant;

              newRestaurantContent.userName = userName;
              newRestaurantContent.userReview = userReview;
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




















    let marker = new google.maps.Marker({
      map: map,
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      position: restaurantsArray[i].position,
      name: restaurantsArray[i].name,
      rating: restaurantsArray[i].rating,
      placeId: restaurantsArray[i].placeId,
      id: restaurantsArray[i].id
    });




















function newRestaurantContent(newMarker) {
  //loop through restaurants global
  for (let i = 0; i < restaurants.length; i++) {
    //looking for restaurant with same position of marker
    
      let newRestaurantContent = restaurants[i]

          $('#add-restaurant').on('click', function() {
            let newName = document.getElementById('res-name').value
            let ratingNewRestaurant = document.getElementById('ratingNewRestaurant').value
            let ratingNumberNewRestaurant = parseInt(ratingNewRestaurant);
            let userName = document.getElementById('user-name').value;
            let userReview = document.getElementById('user-review').value;


              restaurants.push({
                name: newName,
                position: data.latLng,
                lat: data.latLng.lat(),
                lng: data.latLng.lng(),
                rating: ratingNumberNewRestaurant,
                userName: userName,
                userReview: userReview,
                placeId: 0,
              })


              displaySurroundingPlaceList(sortRestByRating(restaurants));
            
            //hide form
            document.getElementById("form-add-restaurant").style.display = "none";
          })
        } 
}


       // END when click new marker DisplayForm - set newName
    
  













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















clickOnMarkerInfo(marker, map)






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


function displayReviewList(displayReview) {
  $("#review").empty();
  let reviewDisplayList = $("#review");

  for (let i = 0; i < displayReview.length; i++) {
    reviewDisplayList.append("<li>" + displayReview[i].text + "</li>")
  }
}
















#right-panel {
  width: 30%;
  height: 90%;
  line-height: 30px;
  padding-left: 10px;
  font-family: Arial, Helvetica, sans-serif;
  position: absolute;
  right: 5px;
  padding: 5px;
  z-index: 5;
  border: 1px solid #999;
  background: #fff;
}





<div id="info-content-new-restaurant" >

            <form id="form-add-restaurant" action="post">
              <h3 class="add-res-heading">Add A Restaurant</h3>
              <label for="restaurant-name">Please add Restaurant's name</label>
              <input type="text" id="res-name" name="res-name" placeholder="Restaurant Name" required/>
              <label for="ratingNewRestaurant">What Rating do you give this Restaurant</label>
              <select id="ratingNewRestaurant" required>
                    <option value="all">All stars</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
              <label for="your-name">Please add Your Name</label>
              <input type="text" name="user-name" id="user-name" placeholder="Your Name" required>
              <label for="your-review">What would you like to say about this restaurant</label>
              <textarea name="user-review" id="user-review" placeholder="Your Review" required></textarea>
              <input type="button" id="add-restaurant"  class="button add-restaurant"/>
            </form>

        </div>




document.getElementById("add-new-review").style.display = "block";




    let placeIdOfMarkerClicked = marker.placeId;
    addReview(placeIdOfMarkerClicked);


document.getElementById("add-new-review").style.display = "block";

placeIdOfMarkerClicked = marker.placeId;
placeId: restaurants.length,


