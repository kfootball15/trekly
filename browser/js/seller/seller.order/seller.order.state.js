app.config(function ($stateProvider) {
    $stateProvider.state('sellerOrder', {
        url: '/seller/order',
        controller: 'SellerOrderCtrl',
        templateUrl: '/js/seller/seller.order/seller.order.templates/seller.order.template.html',
        resolve: {
            allOrders: function(SellerOrderFactory){
                return SellerOrderFactory.getAllOrders();
            },
            isSellerUser: function(AuthService, $state){
                AuthService.getLoggedInUser()
                .then(function(user){
                    if(!user.isSeller) $state.go('home');
                });
            }
        }
    });
});
