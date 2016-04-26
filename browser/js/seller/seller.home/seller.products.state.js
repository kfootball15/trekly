app.config(function ($stateProvider) {
    $stateProvider.state('sellerProducts', {
        url: '/sellerProducts/:sellerId',
        controller: 'SellerCtrl',
        resolve: {
            getAllProducts: function(ProductFactory, $stateParams){
                console.log('in seller home state:', $stateParams.sellerId)
                return ProductFactory.getAllProducts($stateParams.sellerId);
            },
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
        templateUrl: '/js/seller/seller.home/seller.products.template.html'
    });
});
