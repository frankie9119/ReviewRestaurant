//API AIzaSyCYjoSbqIxNuU4CDBbTYGRWbgrpgQ-JhF8

function initMap(){
      // Map options
      var options = {
        zoom:12,
        center:{lat:51.5074,lng:-0.1278}
      }

      // New map
      var map = new google.maps.Map(document.getElementById('map'), options);

      /*
      // Listen for click on map
      google.maps.event.addListener(map, 'click', function(event){
        // Add marker
        alert('add marker here!')
        //IF YES add marker ELSE no TODO
        addMarker({coords:event.latLng});
      });
	*/

      // Array of restaurants


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



        // Check content
        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
      }
    }



/*

function initMap(){
	let map = new google.maps.Map(document.getElementById('map'),{
		center: new google.maps.LatLng(51.5074,-0.1278),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom:12
	});

for (var x in restaurant) {
	let building = restaurant[x];
	let location = new google.maps.LatLng(building.lat,building.lng);
	let marker = new google.maps.Marker({
		position: location,
		title: building.name,
		map: map
	});
	}
}
*/








/*
 function initMap(){
 	// Map Options
  	let options = {
    	zoom: 10,
    	center:{lat:51.5074,lng:-0.1278}
  }
  // New Map
  let map = new google.maps.Map(document.getElementById('map'), options);

  // Add Marker
  let marker = new google.maps.Marker({
  	position: {lat:51.5085088,lng:-0.1016101},
  	map:map
  });
}
*/


