app.config(function ($stateProvider) {
    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/productDetail/productDetail.html',
        controller: 'ProductDetail',
        resolve: {
        	singleProduct: function(ProductFactory, $stateParams) {
        		return ProductFactory.getById($stateParams.productId);
        	}
        }
    });
});
