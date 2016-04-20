app.config(function ($stateProvider) {
    $stateProvider.state('adminEdit', {
        url: '/edit/:id',
        controller: 'AdminEditCtrl',
        templateUrl: '/js/admin/admin.edit/admin.edit.template.html',
        resolve: {
            productToEdit: function($stateParams, ProductFactory){
                console.log("ID:", $stateParams.id)
                return ProductFactory.getOneProduct($stateParams.id)
            }
        }
    });
});
