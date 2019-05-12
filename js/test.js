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
          




















      