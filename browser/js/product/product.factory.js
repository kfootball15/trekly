app.factory('ProductFactory', function($http){
    return {
        getAllProducts: function(sellerId){
            console.log('sellerID: ', sellerId)
            return $http.get('/api/product/')
            .then(function(products){
                if (!sellerId) return products.data;
                var products = products.data;
                console.log('products before filter: ', products);
                products = products.filter(function(product) {
                    return (product.seller === sellerId);
                });
                console.log(products);
                return products;
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
            console.log('id in getById',id);
        	return $http.get('api/product/' + id)
        	.then(function(product) {
                console.log('product in getById', product)
        		return product.data;
        	});

        }
    }
})
