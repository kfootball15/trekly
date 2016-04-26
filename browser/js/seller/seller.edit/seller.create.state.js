app.config(function ($stateProvider) {
    $stateProvider.state('sellerCreateProduct', {
        url: '/seller/create/:sellerId',
        controller: 'SellerCreateCtrl',
        templateUrl: '/js/seller/seller.edit/seller.create.template.html',
        resolve: {
            currentUser: function(AuthService) {
             return AuthService.getLoggedInUser()
             .then(function(user){
                 console.log('user', user)
                 return user;
             })
            }
        }
    });
});
