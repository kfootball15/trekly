app.config(function ($stateProvider) {
    $stateProvider.state('adminCreateProduct', {
        url: '/admin/create',
        controller: 'AdminCreateCtrl',
        templateUrl: '/js/admin/admin.edit/admin.create.template.html',
        resolve: {
            isAdminUser: function(AuthService, $state){
                AuthService.getLoggedInUser()
                .then(function(user){
                    if(!user.isAdmin) $state.go('home');
                });
            }
        },
    });
});
