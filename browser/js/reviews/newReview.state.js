app.config(function ($stateProvider) {
    $stateProvider.state('newReview', {
        url: '/newReview/:productId',
        templateUrl: '/js/reviews/newReview.template.html',
        controller: 'NewReviewCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            product: function(ProductFactory, $stateParams) {
                return ProductFactory.getOneProduct($stateParams.productId);
            }
        }
    });
});

