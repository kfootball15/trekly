app.config(function($stateProvider) {

    $stateProvider.state('userProfile', {
        url: '/user-profile',
        templateUrl: 'js/userProfile/userProfile.html',
        controller: 'UserProfileCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            reviews: function(AuthService, ReviewFactory) {
                return AuthService.getLoggedInUser().
                then(function(user) {
                    return ReviewFactory.getProductReviewsByUser(user._id);
                });
            },
            orders: function(AuthService, OrderFactory) {
                return AuthService.getLoggedInUser().
                then(function(user) {
                        return OrderFactory.getCompleteOrdersByUser(user._id);
                    })
                    .then(function(orders) {
                        return orders.map(function(order) {
                            var sum = 0;
                            order.products.forEach(function(product) {
                                sum += product.product.price * product.quantity;
                            });
                            order.totalPrice = sum;
                            return order;
                        });
                    });
            },
        }
    });

});

app.controller('UserProfileCtrl', function($scope, user, reviews, orders, $state) {
    $scope.user = user;
    $scope.reviews = reviews;
    $scope.orders = orders;
});
