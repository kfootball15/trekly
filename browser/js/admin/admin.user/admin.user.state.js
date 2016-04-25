app.config(function ($stateProvider) {
    $stateProvider.state('adminUser', {
        url: '/admin/user',
        controller: 'AdminUserCtrl',
        templateUrl: '/js/admin/admin.user/admin.user.template.html',
        resolve: {
            getAllUsers: function(UserFactory){
                return UserFactory.getAllUsers()
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
