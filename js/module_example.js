
  var MODULE = (function Module() {

   
      var app = {

      getNearbyRestaurants:function(){

      }

      //_____________________________________________________________BEGIN create Markers

      createMarkers:function(){

       let arrayOfRestaurants = app.getNearbyRestaurants();

        return markers
      },

      //______________________________________________________________End create markers



      run: function() {

              app.doStuff();
           

          }
      }


      return app;


  }());



  var app = MODULE;
  app.run();