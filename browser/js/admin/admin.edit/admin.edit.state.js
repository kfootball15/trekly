app.config(function ($stateProvider) {
    $stateProvider.state('adminEdit', {
        url: '/edit/:id',
        controller: 'AdminEditCtrl',
        templateUrl: '/js/admin/admin.edit/admin.edit.template.html',
        resolve: {
            productToEdit: function($stateParams, ProductFactory){
                return ProductFactory.getOneProduct($stateParams.id)
            }
        }
    });
});
