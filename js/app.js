

var infoWindow, marker;



function getUserGeoLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            };
        })
    }

}


function createMap(geoLocation) {

    return new google.maps.Map(document.getElementById('map'), {
        center: geoLocation, // Set location
        zoom: 17
    });

}

function createMarkers(places, map) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {

        marker = new google.maps.Marker({
            map: map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            title: place.name,
            position: place.geometry.location
        });


        marker.addListener('click', function() {

            alert('OK !');
            alert(marker.title);
            alert(marker.position)
        });




        bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
}





function initMap() {

    // Create the map.
    var currentLocation = getUserGeoLocation()

    // Get initial map location
    let map = createMap(currentLocation )


    //________________________BEGUIN try HTML5 geolocation

    

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