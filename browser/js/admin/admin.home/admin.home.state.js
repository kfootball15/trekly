app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        resolve: {
            getAllProducts: function(ProductFactory){
                return ProductFactory.getAllProducts()
            }
        },
        templateUrl: '/js/admin/admin.home/admin.home.template.html'
    });
});
