app.factory('OrderFactory', function($http){
    var OrderFactory = {};

    // OrderFactory.getAllOrders = function(){
    //     return $http.get('/api/orders/')
    //     .then(function(orders){
    //         return orders.data;
    //     })
    // }

    OrderFactory.getCart = function(){
        return $http.get('/api/orders/getCart')
        .then(function(cart){
            return cart.data;
        })
    }

    //NOT BEING USED!
    // OrderFactory.getProcessing = function(){
    //     return $http.get('/api/orders/getProcessing')
    //     .then(function(processing){
    //         return processing.data;
    //     })
    // }

    OrderFactory.getCompleteOrdersByUser = function(userId){
        return $http.get('/api/orders/getComplete/' + userId)
        .then(function(completeOrders){
            return completeOrders.data;
        });
    };


    OrderFactory.getRecentComplete = function(orderId){
        return $http.get('/api/orders/getRecentComplete/' + orderId)
        .then(function(recentComplete){
            return recentComplete.data;
        })
    }

     OrderFactory.getAllComplete = function(){
        return $http.get('/api/orders/getAllComplete/')
        .then(function(allCompletes){
            return allCompletes.data;
        })
    }


    OrderFactory.getPastOrders = function(){
        return $http.get('/api/orders/')
        .then(function(order){
            var orderArr = order.data;
            return orderArr.filter(function(order){
                return (order.status === 'complete' || order.status === 'cancelled')
            })
        })
        .then(function(filteredOrder){
            console.log('filtered', filteredOrder)
            return filteredOrder;
        })
    }

    //WILL ADD TO CART OR CREATE CART IF DOESN'T ALREADY EXIST
    OrderFactory.addToCart = function(productId){
        console.log('hit order factory add to cart. productId: ', productId)
        return $http.put('/api/orders/addToCart/' + productId)
        .then(function(cart){
            console.log('result', cart.data)
            return cart.data;
        })
    }

    OrderFactory.removeOneFromCart = function(productId){
        console.log('in remove one from cart factory')
        return $http.put('/api/orders/removeOneFromCart/' + productId)
        .then(function(cart){
            console.log('cart after subtract in order factory', cart.data)
            return cart.data;
        })
    }

    OrderFactory.removeFromCart = function(productId){
        console.log('in remove all product from cart factory')
        return $http.put('/api/orders/removeFromCart/' + productId)
        .then(function(cart){
            console.log('cart after remove in order factory', cart.data)
            return cart.data;
        })
    }


    //WORK IN PROGRESS / CURRENTLY DEBUGGING
    OrderFactory.changeStatus = function(newStatus){
        console.log('in factory change status with new status: ', newStatus);
        return $http.put('/api/orders/' + newStatus)
        .then(function(updatedOrder){
            console.log('in factory after $http.put');
            console.log('order updated in factory', updatedOrder.data)
            return updatedOrder.data;
        })
        .catch(function(err){
            console.log('Error: ', err);
        })
    }

    return OrderFactory;
})
