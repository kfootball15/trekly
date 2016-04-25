app.config(function ($stateProvider) {
    $stateProvider.state('adminEditOrder', {
        url: '/edit/orders/:orderId',
        controller: 'AdminEditOrderCtrl',
        templateUrl: '/js/admin/admin.order/admin.edit.order/admin.edit.order.template.html',
        resolve: {
            orderToEdit: function($stateParams, AdminOrderFactory){
                console.log($stateParams.orderId)
                return AdminOrderFactory.getOneOrder($stateParams.orderId)
            },
            isAdminUser: function(AuthService, $state){
                AuthService.getLoggedInUser()
                .then(function(user){
                    if(!user.isAdmin) $state.go('home');
                });
            }
        }
    });
});

// '/js/admin/admin.order/admin.edit.order/admin.edit.order.template.html',
