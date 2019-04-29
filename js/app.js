// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


var map, infoWindow, marker;

//________________________________________BEGIN create markers for type on line 31 "restaurant"

//________________________________________END create markers for type on line 26 "restaurant"

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

            //markerMyPosition.setPosition(pos);
            //markers.setContent('You are here.');
            //infoWindow.setIcon('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'),
            //markers.open(map);
            //map.setCenter(pos);



/*____------______-----______ TRYING 'YOU ARE HERE' MY LOCATION

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
            //var infowindow = new google.maps.InfoWindow({
          //content: contentString
       // });


        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var markerX = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

            markerMyPosition.addListener('click', function() {
          infowindow.open(map, markerMyPosition);
        });

        */
        //-----______------_____-----____---- END "YOU ARE HERE" MY LOCATION



            //__________________________BEGUIN markers

            function createMarkers(places) {
                var bounds = new google.maps.LatLngBounds();
                 var place;
                // LOOP through markers
                for (var i = 0; i < places.length; i++) {

                  place = places[i]

                    /* NOT NECESSARY
                    var image = {
                      url: place.icon,
                      size: new google.maps.Size(71, 71),
                      origin: new google.maps.Point(0, 0),
                      anchor: new google.maps.Point(17, 34),
                      scaledSize: new google.maps.Size(25, 25)
                    };
                    */

                    let marker = new google.maps.Marker({
                        map: map,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',                       
                        title: place.name,
                        rate: place.rating,
                        //review: place.reviews.rating,
                        position: place.geometry.location
                        //r: place.rating,
                    });

                    // Click marker restaurant and display name of restaurant
                    (function(marker){
                      marker.addListener('click', function() {

                        //alert('OK !');
                        alert(marker.title);
                        //alert(results.rating);
                        alert(marker.rate);

                        //it is not working
                        alert(marker.review);

function buildStars() {
   if (marker.rate) {
       let ratingHtml = '';
       for (let i = 0; i < 5; i++) {
          if (marker.rate < (i + 0.5)) {
              ratingHtml += '&#10025;';
          } else {
              ratingHtml += '&#10029;';
          }
          document.getElementById('rating-small').style.display = '';
          document.getElementById('rating-small').innerHTML = ratingHtml;
       }
   } else {
       document.getElementById('rating-small').style.display = 'none';
   }
}
buildStars()

                        //document.getElementById('title').textContent = marker.title;
                        $("#title").html(marker.title);
                        $("#review").html(marker.review);





                        //document.getElementById('rate').textContent = marker.rate;
                        $("#myModal").modal();
//____________________________________________________________________BEGUIN StreetView
                        var panorama = new google.maps.StreetViewPanorama(
                            document.getElementById('street-view'), {
                            position: marker.position,
                             //pov: {
                             //   heading: 34,
                             //   pitch: 10
                            //}
                        });
                        //map.setStreetView(panorama);
//____________________________________________________________END StreetView

                    })}(marker))



                    bounds.extend(place.geometry.location);
                }
                map.fitBounds(bounds);
            }

            //__________________________END Markers
            //________________________________________ Create the places service.

            var service = new google.maps.places.PlacesService(map);
            var getNextPage = null;



            // Perform a nearby search.
            service.nearbySearch({
                    location: currentLocation,

                    //alert(currentLocation);
                    radius: 500,
                    type: ['restaurant']
                },
                function(results, status, pagination) {
                    if (status !== 'OK') return;

                    createMarkers(results);
                    console.log(results);

                    let closeRestaurants = $("#closeRestaurants");

                    for (let i = 0; i < results.length; i += 1) {
                        closeRestaurants.append("<li>" + results[i].name + results[i].rating + "</li>")
                    }


                });



            //____________________________________________ END Create the places service.


        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    //________________________ END try HTML5 geolocation



}



//___________________ FUNCTION ERROR GEOLOCATION

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}