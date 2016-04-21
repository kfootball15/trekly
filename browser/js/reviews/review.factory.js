app.factory('ReviewFactory', function($http) {
	return {

		getProductReviews: function(productId) {
			return $http.get('/api/reviews/product/' + productId)
			.then(function(reviews) {
				return reviews.data;
			})
		}

	};
});