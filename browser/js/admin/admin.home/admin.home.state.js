app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        templateUrl: '/js/admin/admin.home/admin.home.template.html'
    });
});
