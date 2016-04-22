app.factory('AdminOrderFactory', function($http){
    return {
        getAllOrders: function(){
            return $http.get('/api/orders')
            .then(function(order){
                return order.data;
            })
            .catch(function(err){
                console.error(err);
            });
        },
        getOneOrder: function(orderId){
            return $http.get('/api/orders/findOneOrderById/' + orderId)
            .then(function(products){
                return products.data;
            })
            .catch(function(err){
                console.error(err);
            });

        },
        updateOneOrder: function(id, update){
            return $http({
                method: 'PUT',
                url: '/api/orders/' + id,
                data: update
            }).then(function(response){
                return response.data;
            });
        }
    };
});


