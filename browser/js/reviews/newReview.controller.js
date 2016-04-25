app.controller('NewReviewCtrl', function($scope, user, product, $state, ReviewFactory, $log) {
    $scope.product = product;
    $scope.user = user;

    $scope.submitReview = function() {
        var newReview = {
            rating: $scope.review.rating,
            comment: $scope.review.comment,
            user: user._id,
            product: product._id
        };
        ReviewFactory.createReview(newReview)
        .then(function() {
            $state.go('home');
        })
        .catch($log.error);
    };
});
