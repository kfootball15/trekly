app.factory('ReviewFactory', function($http) {
    return {
        getProductReviews: function(productId) {
            return $http.get('/api/reviews/product/' + productId)
            .then(function(reviews) {
                return reviews.data;
            });
        },
        getProductReviewsByUser: function(userId) {
            return $http.get('/api/reviews/user/' + userId)
            .then(function(reviews) {
                return reviews.data;
            });
        },
        createReview: function(newReview) {
            return $http.post('/api/reviews/', newReview)
            .then(function(review) {
                return review.data;
            });
        }
    };
});
