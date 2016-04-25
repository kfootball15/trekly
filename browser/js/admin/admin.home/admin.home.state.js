app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        resolve: {
            getAllProducts: function(ProductFactory){
                return ProductFactory.getAllProducts();
            },
            isAdminUser: function(AuthService, $state){
                AuthService.getLoggedInUser()
                .then(function(user){
                    if(!user.isAdmin) $state.go('home');
                });
            }
        },
        templateUrl: '/js/admin/admin.home/admin.home.template.html'
    });
});
