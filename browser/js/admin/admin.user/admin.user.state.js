app.config(function ($stateProvider) {
    $stateProvider.state('adminUser', {
        url: '/admin/user',
        controller: 'AdminUserCtrl',
        templateUrl: '/js/admin/admin.user/admin.user.template.html',
        resolve: {
            getAllUsers: function(UserFactory){
                return UserFactory.getAllUsers()
            }
        }
    });
});
