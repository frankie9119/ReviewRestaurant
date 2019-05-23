//_________________________________________BEGIN createMap


function createMap() {
    return new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
}


//__________________________________________END 










//__________________________________________BEGIN create surrounding place markers

function createSurroundingPlaceMarkers() { // WORK   <---------------

    //  he he he 


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


            createSurroundingPlaceMarkers(); // WOrk (this might not be the proper place to invoke this function.....you must decide for yourself. It looks about right ....kinda :)

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






//___________________________________________BEGIN MAIN application

function initMap() {
    let map = createMap();

    let infoWindow = createPopUpInfoWindow()
    getUserGeoLocation(map, infoWindow)


}



//_________________________________________  END MAIN application