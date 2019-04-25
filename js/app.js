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
    map = new google.maps.Map(document.getElementById('map'), {
        center: currentLocation, // Set location
        zoom: 17
    });



    //________________________BEGUIN try HTML5 geolocation

    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            };

            currentLocation = pos;

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            //infoWindow.setIcon('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'),
            infoWindow.open(map);
            map.setCenter(pos);
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

                    marker = new google.maps.Marker({
                        map: map,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                        title: place.name,
                        position: place.geometry.location
                    });

                    // Click marker restaurant and display name of restaurant
                    (function(marker){
                      marker.addListener('click', function() {

                        alert('OK !');
                        alert(marker.title);
                        alert(marker.position)

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