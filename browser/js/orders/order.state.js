app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/orders/cart.template.html',
        resolve: {
            backEndCart: function(OrderFactory){
                return OrderFactory.getCart();
            }
        },
        controller: 'CartCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/orders/checkout.template.html',
        resolve: {
            cart: function(OrderFactory){
                return OrderFactory.getCart();
            }
        },
        controller: 'CheckoutCtrl'
    });
});


app.config(function ($stateProvider) {
    $stateProvider.state('complete', {
        url: '/complete/:id',
        templateUrl: 'js/orders/complete.template.html',
        resolve: {
            recentOrder: function(OrderFactory, $stateParams, $state){
                return OrderFactory.getRecentComplete($stateParams.id);
            },
            loggedInUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        },
        controller: 'CompleteCtrl'
    });
});

