app.config(function ($stateProvider) {
    $stateProvider.state('adminOrder', {
        url: '/admin/order',
        controller: 'AdminOrderCtrl',
        templateUrl: '/js/admin/admin.order/admin.order.template.html',
        resolve: {
            allOrders: function(AdminOrderFactory){
                return AdminOrderFactory.getAllOrders();
            }
        }
    });
});
