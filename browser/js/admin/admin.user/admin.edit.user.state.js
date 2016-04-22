app.config(function ($stateProvider) {
    $stateProvider.state('adminEditUser', {
        url: '/edit/user/:id',
        controller: 'adminEditUserCtrl',
        templateUrl: '/js/admin/admin.edit/admin.edit.user.template.html',
        resolve: {
            userToEdit: function($stateParams, UserFactory){
                console.log($stateParams.id)
                return UserFactory.getUser($stateParams.id)
            }
        }
    });
});
