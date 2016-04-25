app.config(function ($stateProvider) {
    $stateProvider.state('adminOrder', {
        url: '/admin/order',
        controller: 'AdminOrderCtrl',
        templateUrl: '/js/admin/admin.order/admin.order.templates/admin.order.template.html',
        resolve: {
            allOrders: function(AdminOrderFactory){
                return AdminOrderFactory.getAllOrders();
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
