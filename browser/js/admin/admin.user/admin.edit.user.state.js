app.config(function ($stateProvider) {
    $stateProvider.state('adminEditUser', {
        url: '/admin/edit/user/:id',
        controller: 'AdminEditUserCtrl',
        templateUrl: '/js/admin/admin.user/admin.edit.user.template.html',
        resolve: {
            userToEdit: function($stateParams, UserFactory){
                return UserFactory.getUser($stateParams.id)
            }
        }
    });
});
