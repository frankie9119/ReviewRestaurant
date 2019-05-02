

// NOTE
// All this does is load the map and log the users coordinates to the console
// The purpose of this code is to serve as a way to begin to view the module pattern














function initMap() {


    var MODULE = (function Module() {


        var app = {

            //___________________________________________________BEGIN set initial state of app

    
         
            infoWindow: undefined,
            marker: undefined,

            //__________________________________________________END set initial state of app

            //__________________________________________________BEGIN build rating stars
            buildRatingStarDisplayValue: function(numbVal) {
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

            },

            //__________________________________________________END build rating stars


            createMap:function(coordinates){
                let map = new google.maps.Map(document.getElementById('map'), {
                    center: coordinates, // Set location
                    zoom: 17
                })
                return map
            },



            getUserGeolocation: function(callback) {   // callback creates map
                let pos;
                if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(function(position) {
                        pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        

                        callback(pos)
                        console.log(pos)

                    })


                } else {
                    // Browser doesn't support Geolocation
                    // Handle error
                    console.log("Browser does not support geo location")
                }

                return pos

            },



            run: function() {

               app.getUserGeolocation(app.createMap)

            }
        }


        return app;


    }());



    var app = MODULE;
    app.run();

}