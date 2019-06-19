<!DOCTYPE html>
<html>

<head>
    <title>Restaurant Review</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <link rel="icon" href="logo-map.png">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <div id="head-title">
        <h2 class="title-name">Restaurant Review</h2>
    </div>
    <!--Navbar
      ================================================== -->
    <nav class="navbar visible-xs navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <p class="navbar-brand">Restaurants List</p>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <ul class="restaurantsListCollapse" id=""></ul>
                </ul>
            </div>
        </div>
    </nav>
    <!-- ===================================================================
                            MAP
=================================================================== -->
    <div id="map"></div>
    <!-- ===================================================================
                          right panel
=================================================================== -->
    <div id="right-panel" class="right-panel">
        <div class="right-panel-head">
            <label>
                <h2>Sort by </h2>
            </label>
            <select id="rating-control">
                <option value="all">All stars</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <ul class="restaurantsList" id=""></ul>
    </div>
    <!-- ===================================================================
                Info Content - When right click
=================================================================== 
    <div id="info-content-new-restaurant">
        <form id="form-add-restaurant" action="post">
            <h3 class="add-res-heading">Add A Restaurant</h3>
            <label for="restaurant-name">Please add Restaurant's name</label>
            <input type="text" id="res-name" name="res-name" placeholder="Restaurant Name" required />
            <label for="ratingNewRestaurant">What Rating do you give this Restaurant</label>
            <select id="ratingNewRestaurant" required>
                <option value="all">All stars</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label for="your-name">Please add Your Name</label>
            <input type="text" name="user-name" id="user-name" placeholder="Your Name" required>
            <label for="your-review">What would you like to say about this restaurant</label>
            <textarea name="user-review" id="user-review" placeholder="Your Review" required></textarea>
            <button type="button" id="add-restaurant" class="btn button add-restaurant">ADD REVIEW</button>
        </form>
    </div>-->
    <!-- ===================================================================
             MODAL - When click on  markers
=================================================================== -->
    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="title-modal">
                        <h4 class="modal-title" id="title"></h4>
                    </div>
                    <div class="rating-stars">
                        <h4 id="rating-stars"></h4>
                    </div>
                </div>
                <div id="street-view"></div>
                <p id="review-text">Reviews:</p>
                <div class="modal-body" id="review">
                </div>
                <div class="modal-footer">
                    <div class="btn-add-review">
                        <button type="button" class="btn btn-default " data-dismiss="modal" id="btn-add-review">Add Review</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ===================================================================
             MODAL - When RIGHT click on  markers
=================================================================== -->


    <!-- Modal -->
    <div class="modal fade" id="myModalX" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
                    <form id="form-add-restaurant" action="post">

            <label for="restaurant-name">Please add Restaurant's name</label>
            <input type="text" id="res-name" name="res-name" placeholder="Restaurant Name" required />
            <label for="ratingNewRestaurant">What Rating do you give this Restaurant</label>
            <select id="ratingNewRestaurant" required>
                <option value="all">All stars</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label for="your-name">Please add Your Name</label>
            <input type="text" name="user-name" id="user-name" placeholder="Your Name" required>
            <label for="your-review">What would you like to say about this restaurant</label>
            <textarea name="user-review" id="user-review" placeholder="Your Review" required></textarea>
      <div class="modal-footer">
            <button type="button" id="add-restaurant" class="btn button add-restaurant" data-dismiss="modal">ADD REVIEW</button>
      </div>
        </form>
        </div>
    </div>

<!--data-backdrop="static"-->

    <div class="modal"  id="modalTest"tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
            <h3 class="add-res-heading">Add A Restaurant</h3>

        
      </div>
      <div class="modal-body">


    <div id="info-content-new-restaurant">
        <form id="form-add-restaurant" action="post">

            <label for="restaurant-name">Please add Restaurant's name</label>
            <input type="text" id="res-name" name="res-name" placeholder="Restaurant Name" required />
            <label for="ratingNewRestaurant">What Rating do you give this Restaurant</label>
            <select id="ratingNewRestaurant" required>
                <option value="all">All stars</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label for="your-name">Please add Your Name</label>
            <input type="text" name="user-name" id="user-name" placeholder="Your Name" required>
            <label for="your-review">What would you like to say about this restaurant</label>
            <textarea name="user-review" id="user-review" placeholder="Your Review" required></textarea>

        </form>
    </div>



      </div>
      <div class="modal-footer">
            <button type="button" id="add-restaurant" class="btn button add-restaurant" data-dismiss="modal">ADD REVIEW</button>
      </div>
    </div>
  </div>
</div>







<div class="modal" id="sure" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" id="yes" class="btn btn-primary" data-dismiss="modal">YES</button>
        <button type="button" id="no" class="btn btn-secondary" data-dismiss="modal">NO</button>
      </div>
    </div>
  </div>
</div>
    <!-- ===================================================================
                    ADD NEW REVIEW form
=================================================================== -->
    <div id="div-add-new-review">
        <form id="add-new-review" action="post">
            <h3 class="add-new-review-head">Add A Review</h3>
            <label for="new-user-name-review">Please add Your Name</label>
            <input type="text" id="new-user-name" name="new-user-n" placeholder="Your Name" required>
            <label for="new-rating">What Rating do you give this Restaurant</label>
            <select id="new-rating" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label for="new-review">What would you like to say about this restaurant</label>
            <textarea name="new-user-review" id="new-user-review" placeholder="Your Review" required></textarea>
            <button type="button" id="btn-add-new-review" class="btn draw-border">ADD REVIEW</button>
            <!--<input type="button" id="btn-add-new-review" class="button add-new-review"/>-->
        </form>
    </div>
</body>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="js/app.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCegTNrd3DtW2Bk_Dl8MEayKarv0u6KcQ4&libraries=places&callback=initMap" async defer></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

</html>