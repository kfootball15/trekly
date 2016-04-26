app.config(function ($stateProvider) {
    $stateProvider.state('sellerEditOrder', {
        url: '/edit/orders/:orderId',
        controller: 'SellerEditOrderCtrl',
        templateUrl: '/js/seller/seller.order/seller.edit.order/seller.edit.order.template.html',
        resolve: {
            orderToEdit: function($stateParams, SellerOrderFactory){
                console.log($stateParams.orderId)
                return SellerOrderFactory.getOneOrder($stateParams.orderId)
            },
            isAdminUser: function(AuthService, $state){
                AuthService.getLoggedInUser()
                .then(function(user){
                    if(!user.isSeller) $state.go('home');
                });
            }
        }
    });
});

// '/js/admin/admin.order/admin.edit.order/admin.edit.order.template.html',
