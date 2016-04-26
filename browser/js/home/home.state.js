app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
        	allProducts: function(ProductFactory) {
				return ProductFactory.getAllProducts()
                .then(function(products){
                    products = products.filter(function(product){
                        return (product.seller === null)
                    })
                    return products;
                })
        	}
        }
    });
});


app.config(function ($stateProvider) {
    $stateProvider.state('seller', {
        url: '/seller/:sellerId',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            allProducts: function(ProductFactory, $stateParams) {
                return ProductFactory.getAllProducts($stateParams.sellerId);
            }
        }
    });
});


app.config(function ($stateProvider) {
    $stateProvider.state('allStores', {
        url: '/stores',
        templateUrl: 'js/home/stores.template.html',
        // controller: 'AllStoresCtrl',
        resolve: {
            getAllUsers: function(UserFactory){
                return UserFactory.getAllUsers()
                .then(function(users){
                    users = users.filter(function(user){
                        return (user.isSeller === true)
                    })
                    return users;
                })
            }
        },
        controller: function($scope, getAllUsers){
            $scope.users = getAllUsers;
        }
    });
});
