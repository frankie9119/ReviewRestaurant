      // This example displays a marker at the center of Australia.
      // When the user clicks the marker, an info window opens.

      function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }






 (function(marker) {
            marker.addListener('click', function() {

              //alert OK !;
              alert(marker.title);
              alert(marker.rate);

              //it is not working
              alert(marker.review);


              // Display the rating with Stars
              function buildStars() {
                if (marker.rate) {
                  let ratingHtml = '';
                  for (let i = 0; i < 5; i++) {
                    if (marker.rate < (i + 0.5)) {
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
              }
              buildStars()


function starRating(place) {
    let rating = [];
    if (place.rating) {
        for (let i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
                rating.push('&#10025;');
            } else {
                rating.push('&#10029;');
            }
        }
        return rating.join(' ');
    }
}














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
          
          //alert(places.title)
          //console.log(marker);
           markerRate = markers.rate
           markerTitle = markers.title
          //alert(markerTitle)
           markerReview = markers.review

          delMarker.push(markers)

  //==============FUNCTION MARKER  =================================================
          //(function(marker) {
            
            markers.addListener('click', function() {

              //alert(markerTitle)
              //buildStars();
                $("#title").html(markers.title);
                //alert(markers.title)
                $("#rating-small").html(buildRatingStarDisplayValue(markers.rate));
                $("#review").html(markers.title);
                // Modal
                $("#myModal").modal();
              //======= street View ========
              var panorama = new google.maps.StreetViewPanorama(
              document.getElementById('street-view'), {
              position: markers.position,

                });
            })
          
















var map, service;

function initMap() {
  var central_park = new google.maps.LatLng(40.764243, -73.973049);

  map = new google.maps.Map(document.getElementById("map"), {
    center: central_park,
    zoom: 15
  });

  var request = {
    location: central_park,
    radius: "500",
    types: ["bakery"]
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, searchResult);
}

function searchResult(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    // show first result on map and request for details
    var place = results[0];
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });
    var infowindow = new google.maps.InfoWindow({
      content: place.name
    });
    infowindow.open(map, marker);

    service.getDetails({placeId: place.place_id}, function(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let rating = document.querySelector('#rating');
        let reviewEl = document.querySelector('.review-list');
        
        rating.innerHTML = place.rating;
        
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




















for (let i = 0; i < results.length; i++) {
    markers[i] = new google.maps.Marker({
        position: results[i].geometry.location,
        placeId: results[i].id,
        zIndex: 5,
        id: googleRestaurantsArray[i].id
    });
    for (let i = 0; i < restaurantsArray.length; i++) {
                            markers[googleRestaurantsArray.length + i] = new google.maps.Marker({
                                position: restaurantsArray[i].geometry.location,
                                placeId: restaurantsArray[i].id,
                                zIndex: 5,
                                id: restaurantsArray[i].id,
                            });


















      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: -25.363882, lng: 131.044922 }
        });

        map.addListener('click', function(e) {
          placeMarkerAndPanTo(e.latLng, map);
        });
      }

      function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        map.panTo(latLng);
      }









 /*-----------------------------------------------------------------------------------
            Builds the new Restaurant info Window
            -------------------------------------------------------------------------------------*/
            function buildResDetailContent(marker) {
                restaurantInfoDiv.style.display = "block";
                form.style.padding = '10px';
                form.innerHTML = `
                    <h3 class="add-res-heading">Add A Restaurant</h3>
                    <input type="text" id="res-name" name="res-name" placeholder="Restaurant Name" required/>
                    <input type="hidden" id="res-location-lat" name="res-location-lat" value="${marker.position.lat()}"/>
                    <input type="hidden" id="res-location-lng" name="res-location-lng" value="${marker.position.lng()}"/>
                    <input type="text" name="res-address" id="res-address" placeholder="Restaurant Address" required/>
                    <label for="res-rating">Rating: </label>
                    <select name="res-rating" id="res-rating" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    <input type="text" name="res-telephone" id="res-telephone" placeholder="Restaurant Telephone" />
                    <input type="text" name="res-website" id="res-website" placeholder="Restaurant Website" />
                    <button id="add-restaurant" class="button add-restaurant">Add New Restaurant</button>`;
            }

            document.getElementById("form-add-restaurant").addEventListener("submit", function (e) {
                e.preventDefault();
                form.style.padding = '';
                let name = document.getElementById('res-name');
                let address = document.getElementById('res-address');
                let telephone = document.getElementById('res-telephone');
                let website = document.getElementById('res-website');
                let rating = document.getElementById('res-rating');
                let locationLat = document.getElementById('res-location-lat');
                let locationLng = document.getElementById('res-location-lng');

                let position = new google.maps.LatLng(locationLat.value, locationLng.value);

                let place = {
                    name: name.value,
                    vicinity: address.value,
                    website: website.value,
                    url: website.value,
                    formatted_phone_number: telephone.value,
                    rating: rating.value,
                    position: position,
                    geometry: {location: position},
                    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
                    reviews: '',
                    photos: '',

                };
                /*-----------------------------------------------------------------------------------
                Pushes to array so that it knows which new restaurant to open when you add more than one
                -------------------------------------------------------------------------------------*/
                newPlace.push(place);
                closeInfoWindowNew();
                let marker = newRestaurantMarker[newResNum];
                restaurantIsNew = false;
                infoWindow.open(map, marker);
                buildIWContent(place);
                displayRestaurantInfo(place);

            });

            /*-----------------------------------------------------------------------------------*/









































      