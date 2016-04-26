app.config(function ($stateProvider) {
    $stateProvider.state('sellerHome', {
        url: '/sellerHome/:sellerId',
        controller: 'SellerHomeCtrl',
        resolve: {
            isSellerUser: function(AuthService, $state){
                AuthService.getLoggedInUser()
                .then(function(user){
                    if (!user.isSeller) $state.go('home')
                })
            },
            currentUser: function(AuthService) {
             return AuthService.getLoggedInUser()
             .then(function(user){
                 console.log('user', user)
                 return user;
             })
            }
        },
        templateUrl: '/js/seller/seller.home/seller.home.template.html'
    });
});
