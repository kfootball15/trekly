app.config(function ($stateProvider) {
    $stateProvider.state('sellerEdit', {
        url: '/seller/edit/:id',
        controller: 'SellerEditCtrl',
        templateUrl: '/js/seller/seller.edit/seller.edit.template.html',
        resolve: {
            productToEdit: function($stateParams, ProductFactory){
                return ProductFactory.getOneProduct($stateParams.id)
            },
            isAdminUser: function(AuthService, $state){
                AuthService.getLoggedInUser()
                .then(function(user){
                    if(!user.isSeller) $state.go('home');
                });
            }
        }
    });
});
