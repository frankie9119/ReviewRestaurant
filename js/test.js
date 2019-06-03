


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







