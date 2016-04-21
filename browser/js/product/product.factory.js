app.factory('ProductFactory', function($http){
    return {
        getAllProducts: function(){
            return $http.get('/api/product')
            .then(function(products){
                return products.data;
            })
        },

        getById: function(id) {
        	return $http.get('api/product/' + id)
        	.then(function(product) {
        		return product.data;
        	});
        }
    }
})
