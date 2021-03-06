app.config(function ($stateProvider) {
    $stateProvider.state('adminEdit', {
        url: '/admin/edit/:id',
        controller: 'AdminEditCtrl',
        templateUrl: '/js/admin/admin.edit/admin.edit.template.html',
        resolve: {
            productToEdit: function($stateParams, ProductFactory){
                return ProductFactory.getOneProduct($stateParams.id)
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
