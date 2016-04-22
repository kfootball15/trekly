app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/orders/cart.template.html',
        resolve: {
        	cart: function(OrderFactory){
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
            recentComplete: function(OrderFactory, $stateParams, $state){
                console.log('stateparams orderID', $stateParams);
                // console.log($state.params)
                return OrderFactory.getRecentComplete($stateParams.id);
            }
        },
        controller: 'CompleteCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('userAccount', {
        url: '/userAccount',
        templateUrl: 'js/orders/userAccount.template.html',
        resolve: {
            // completeOrders: function(OrderFactory){
            //     return OrderFactory.getAllComplete();
            // },
            pastOrders: function(OrderFactory){
                return OrderFactory.getPastOrders();
            },
            loggedInUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        },
        controller: 'UserAccountCtrl'
    });
});