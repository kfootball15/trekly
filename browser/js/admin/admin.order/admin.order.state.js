app.config(function ($stateProvider) {
    $stateProvider.state('adminOrder', {
        url: '/admin/order',
        controller: 'AdminCtrl',
        templateUrl: '/js/admin/admin.order/admin.order.template.html',
        resolve: {
            // productToEdit: function($stateParams, ProductFactory){
            //     console.log("ID:", $stateParams.id)
            //     return ProductFactory.getOneProduct($stateParams.id)
            // }
        }
    });
});
