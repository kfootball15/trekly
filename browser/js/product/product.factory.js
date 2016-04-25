app.factory('ProductFactory', function($http){
    return {
        getAllProducts: function(){
            return $http.get('/api/product')
            .then(function(products){
                return products.data;
            })
        },
        getOneProduct: function(productId){
            return $http.get('/api/product/' + productId)
            .then(function(product){
                return product.data
            })
        },
        updateProduct: function(productId, update){
            return $http({
                method: 'PUT',
                url: '/api/product/' + productId,
                data: update
            }).then(function(response){
                return response.data;
            })
        },
        createProduct: function(create){
            return $http({
                method: 'POST',
                url: '/api/product',
                data: create
            }).then(function(response){
                return response.data;
            })
        },
        deleteProduct: function(productId){
            return $http({
                method: 'DELETE',
                url: '/api/product/'+ productId
            }).then(function(response){
                return response;
            })
        },
        // redunndant paths
        getById: function(id) {
        	return $http.get('api/product/' + id)
        	.then(function(product) {
        		return product.data;
        	});

        }
    }
})
