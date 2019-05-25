

// NOTE
// All this does is load the map and log the users coordinates to the console
// The purpose of this code is to serve as a way to begin to view the module pattern














function initMap() {



    var MODULE = (function Module() {

let pos, currentPosition;
        var app = {

            //___________________________________________________BEGIN set initial state of app

    
            map: undefined,
            infoWindow: undefined,
            marker: undefined,
            //currentPosition: undefined,
            //pos: undefined,
            place: undefined,
            asdf: undefined,
           

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

  // a very basic method
  saySomething: function () {

     asdf = console.log( "Where in the world is Paul Irish today?" );
    alert(pos)
  },

            createMap: function(coordinates){
                    map = new google.maps.Map(document.getElementById('map'), {
                    center: coordinates, // Set location
                    zoom: 17
                })
                    console.log(pos)
                return map
            },



            getUserGeolocation: function(callback) {   // callback creates map
                
                let markerMyPosition;

                if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(function(position) {
                        pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };

                        callback(pos)

                        currentPosition = pos
                        //console.log(currentPosition)

                        // CREATE MARKER MY POSITION ___________________________

                        markerMyPosition = new google.maps.Marker({
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

                    })
                } else {
                    // Browser doesn't support Geolocation
                    // Handle error
                    console.log("Browser does not support geo location")
                }

                return markerMyPosition

            },

            createMarkersRestaurant: function(places){
                let bounds = new google.maps.LatLngBounds();
                //let place;
                //loop markers
                for (var i = 0; i < places.length; i++) {

                  place = places[i]

                  alert(currentPosition)


                 }
                    

                    
                 },
      //________________________________________ Create the places service.
                createPlacesService: function(){
                      var service = new google.maps.places.PlacesService(map);
                      var getNextPage = null;
                      // Perform a nearby search.
                      service.nearbySearch({
                          location: pos,
                          //alert(currentLocation);
                          radius: 5000,
                          type: ['restaurant']
                        },

                        function(results, status, pagination) {
                          if (status !== 'OK') return;

                          createMarkers(results);
                          //this console.log is super helpfull
                          console.log(results);

                          let closeRestaurants = $("#closeRestaurants");
                         //_______________________________________________________BEGIN William changes

                          for (let i = 0; i < results.length; i += 1) {

                             let rating = buildRatingStarDisplayValue(results[i].rating)
                            closeRestaurants.append("<li>" + results[i].name + rating + "</li>")
                          }
                        });

                      //_________________________________________________________END William changes



                      //____________________________________________ END Create the places service.


                                
                },





            createRestaurants: function(restaurants){

                  alert()
                  
            },

            test: function(testx){
                $('#test').click(function(){
                   alert( "test" ); 
                });

                  
                
            },


            run: function() {

               app.getUserGeolocation(app.createMap)
               app.saySomething(app.saySomething)
               app.createMarkersRestaurant(app.createMarkersRestaurant)
               app.createPlacesService(app.createPlacesService)
               app.test(app.test)

            }
        }


        return app;




    }());
//console.log(currentPosition)


    var app = MODULE;
    app.run();

}




































