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
