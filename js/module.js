

// NOTE
// All this does is load the map and log the users coordinates to the console
// The purpose of this code is to serve as a way to begin to view the module pattern






function initMap() {


    var MODULE = (function Module() {

        

        var app = {

            //___________________________________________________BEGIN set initial state of app

    
            
            infoWindow: undefined,
            marker: undefined,
            pos: undefined,
            currentPosition: {},
            test: undefined,
            

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

            createMap: function(coordinates){
                    map = new google.maps.Map(document.getElementById('map'), {
                    center: coordinates, // Set location
                    zoom: 17
                })
                    //console.log("helloxxx")
                return map
            },

            testing: function(testex){
            
                test = 5

                return test
                


            },


            getUserGeolocation: function(callback) {   // callback creates map
                let pos;
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
                            //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                          });

                    })


                } else {
                    // Browser doesn't support Geolocation
                    // Handle error
                    console.log("Browser does not support geo location")
                }

                return pos, markerMyPosition

            },



            restaurants: function(rest) {
                  // Loop through markers
                  for(var i = 0;i < restaurants.length;i++){
                    // Add marker
                    addMarker(restaurants[i]);
                  
                    
                    }
                                      // Add Marker Function
                   function addMarker(props){
                    var marker = new google.maps.Marker({
                      position:props.coords,
                      map:map,
                      //icon:props.iconImage
                    }); 
                    console.log(restaurants[i]);
                    console.log(app.currentPosition);
                    console.log(app.pos);
                    alert()

              }
                },


            run: function() {

               app.getUserGeolocation(app.createMap)
               app.testing(app.testing)
               app.restaurants()
               //app.addMarker(app.addMarker)

            }
        }


        return app;


    }());



    var app = MODULE;
    app.run();

}