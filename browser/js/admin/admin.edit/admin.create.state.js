app.config(function ($stateProvider) {
    $stateProvider.state('adminCreateProduct', {
        url: '/admin/create',
        controller: 'AdminCreateCtrl',
        templateUrl: '/js/admin/admin.edit/admin.create.template.html',
    });
});
