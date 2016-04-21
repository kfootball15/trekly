app.config(function ($stateProvider) {
    $stateProvider.state('adminUser', {
        url: '/admin/user',
        controller: 'AdminCtrl',
        templateUrl: '/js/admin/admin.user/admin.user.template.html',
        resolve: {
            // productToEdit: function($stateParams, ProductFactory){
            //     console.log("ID:", $stateParams.id)
            //     return ProductFactory.getOneProduct($stateParams.id)
            // }
        }
    });
});
