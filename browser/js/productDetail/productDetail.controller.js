app.controller('ProductDetail', function($scope, ProductFactory, $stateParams, ReviewFactory, UserFactory, singleProduct, OrderFactory) {

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
		})();
	}); 

	$scope.bigImgSrc = $scope.product.images[0];
	$scope.setBigImg = function(img) {
		$scope.bigImgSrc = img;
	};


	$scope.addToCart = function(product) {
		alert('clicked');
		// I DO NOT HAVE THE ROUTE FOR THIS IN THE BACKEND, ON DIFF BRANCH
		OrderFactory.addToCart(product._id)
		.then(function(cart) {
			console.log('cart from Ctrl:', cart);
		});
	};
});

