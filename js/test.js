


/*

=================================================

     !!! THIS FILE IS JUST FOR NOTES !!!

==================================================

*/







let list = [{
    name: "A",
    rating: 3
  },
  {
    name: "B",
    rating: 1
  },
  {
    name: "C",
    rating: 5
  },
  {
    name: "D",
    rating: 2
  },
  {
    name: "E",
    rating: 0
  },
  {
    name: "F",
    rating: 3
  },
  {
    name: "G",
    rating: 2
  },
  {
    name: "H",
    rating: 10
  }
];



function sortRestByRating(restaurantsArraySort) {
  let list = [...restaurantsArraySort];

  let listSort = list.sort((a, b) => {
    return a.rating - b.rating
  });
  return listSort
} 

function getSpecificRating(restaurantsArraySpecific, ratingValue) {

  let resultList = restaurantsArraySpecific.filter((val) => {
    return val.rating === ratingValue

  })

  return resultList
}
//let ratingFromUser = 2
//console.log(getSpecificRating(list, ratingFromUser))



function displaySurroundingPlaceList(restaurantsArray) {
  $("#restaurantsList").empty();
  let restaurantsList = $("#restaurantsList");
  for (let i = 0; i < restaurantsArray.length; i++) {
    restaurantsList.append("<li>" + restaurantsArray[i].name + ' ' + restaurantsArray[i].rating + "</li>")
  }
}

let sortedRestaurants = sortRestByRating(list);
displaySurroundingPlaceList(sortedRestaurants)


$('#rating-control').on('change', function(e) {
let ratingFromUser = this.value

//___________________________________________William code

if(e.target.value === "all"){
   //alert("Weeeeeee")
   displaySurroundingPlaceList(sortRestByRating(list));
}else{


//_________________________________________END William code


var ratingNumberFromUser = parseInt(ratingFromUser);
  console.log(ratingNumberFromUser);

  let specificRating = getSpecificRating(list,ratingNumberFromUser)
  displaySurroundingPlaceList(specificRating)
  }
  
});







