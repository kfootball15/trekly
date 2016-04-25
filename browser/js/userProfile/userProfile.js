app.config(function ($stateProvider) {

    $stateProvider.state('userProfile', {
        url: '/user-profile',
        templateUrl: 'js/userProfile/userProfile.html',
        controller: 'UserProfileCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser();
            },
            reviews: function (AuthService, ReviewFactory) {
                return AuthService.getLoggedInUser().
                then(function(user) {
                    return ReviewFactory.getProductReviewsByUser(user._id);
                });
            },
            orders: function (AuthService, OrderFactory) {
                return AuthService.getLoggedInUser().
                then(function(user) {
                    return OrderFactory.getCompleteOrdersByUser(user._id);
                });
            },
        }
    });

});

app.controller('UserProfileCtrl', function($scope, user, reviews, orders) {
    $scope.user = user;
    $scope.reviews = reviews;
    $scope.orders = orders.map(function(order) {
        order.products = order.products.map(function(product, i) {
            product.finalPrice = order.finalPrice[i];
            console.log(product);
            return product;
        });
        return order;
    });



});
