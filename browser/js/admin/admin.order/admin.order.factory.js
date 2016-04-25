app.factory('AdminOrderFactory', function($http){
    return {
        getAllOrders: function(){

            return $http.get('/api/orders')
            .then(function(order){
                return order.data;
            });
        },
        getOneOrder: function(orderId){

            return $http.get('/api/orders/findOneOrderById/' + orderId)
            .then(function(products){
                return products.data;
            });

        },
        updateOneOrder: function(orderId, update){

            return $http({
                method: 'PUT',
                url: '/api/orders/' + orderId,
                data: update
            }).then(function(response){
                return response.data;
            });

        },
        deleteOneOrder: function(orderId){

            return $http.delete('api/orders/' + orderId)
            .then(function(order){
                return order;
            });

        }
    };
});


