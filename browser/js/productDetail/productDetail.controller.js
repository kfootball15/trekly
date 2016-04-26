app.controller('ProductDetail', function($state, $scope, ProductFactory, $stateParams, ReviewFactory, UserFactory, singleProduct, OrderFactory, $mdDialog) {
	console.log('singleProduct',singleProduct)
	$scope.product = singleProduct;

	ReviewFactory.getProductReviews($stateParams.productId)
	.then(function(reviews) {
		$scope.reviews = reviews;
		$scope.totalReviwRating = 0; 
		reviews.forEach(function(elem) {
			$scope.totalReviwRating += elem.rating;
		});
		$scope.totalReviewRating = Math.round($scope.totalReviwRating/reviews.length);
		(function numReviews() {
			if (reviews.length === 1) $scope.numReviews = 'review'
			else $scope.numReviews = 'reviews';

			if (reviews.length === 0) $scope.reviewsPresent = false
			else $scope.reviewsPresent = true;
		})();
	}); 

	$scope.bigImgSrc = $scope.product.images[0];
	$scope.setBigImg = function(img) {
		$scope.bigImgSrc = img;
	};

	$scope.addToCart = function(productID, quantity) {
		var quantity = quantity || 1;
		OrderFactory.addToCartFromProduct(productID, quantity)
		.then(function(cart) {
			console.log('cart from Ctrl:', cart);
		});
	};


	function initialize_gmaps() {
	    // initialize new google maps LatLng object

	    // USE PRODUCT.COORDINATES IN THE FOLLOWING LINE FOR LAT/LONG
	    var myLatlng = new google.maps.LatLng(singleProduct.coordinates[0],singleProduct.coordinates[1]);
	    // set the map options hash
	    var mapOptions = {
	        center: myLatlng,
	        zoom: 5,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    // get the maps div's HTML obj
	    var map_canvas_obj = document.getElementById("map-canvas");
	    console.log(map_canvas_obj);
	    // initialize a new Google Map with the options
	    var map = new google.maps.Map(map_canvas_obj, mapOptions);
	    // Add the marker to the map
	    var marker = new google.maps.Marker({
	        position: myLatlng,
	        title:"Hello World!"
	    });
	    // Add the marker to the map by calling setMap()
	    marker.setMap(map);
	};

    $scope.runMap = initialize_gmaps;

    $scope.numbers = [1,2,3,4,5,6,7,8,9,10];


    $scope.showConfirm = function(ev, product) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('You just added ' + product.title + ' to your cart!')
          .textContent('You are on your way to ' + product.location + '!')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Keep Shopping')
          .cancel('Go to Cart');

	    $mdDialog.show(confirm).then(function() {
	  		$state.go('productDetail', {productId: product._id, sellerId: product.seller});
	    }, function() {
	      $state.go('cart');
	    });
  };



});

