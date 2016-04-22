app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
        	allProducts: function(ProductFactory) {
				return ProductFactory.getAllProducts();
        	}
        }
    });
});

