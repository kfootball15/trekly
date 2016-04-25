app.factory('OrderFactory', function($http){

    var OrderFactory = {};

    var cachedCart = {};

    OrderFactory.getCartCache = function(){
        return cachedCart;
    }

    OrderFactory.getCart = function(){
        return $http.get('/api/orders/getCart')
        .then(function(cart){
            var cart = cart.data;
            if ((!cart.products) || (cart && cart.products.length < 1)) {
                cachedCart.cartTotal = 0;
                return cachedCart;
            }
            else {
                var priceArr = cart.products.map((product)=>{return product.quantity * product.product.price});
                priceArr.forEach((price, index)=>{cart.products[index]['productTotal'] = price});
                cart.cartTotal = priceArr.reduce((p,c)=>{return p+c; });
                angular.copy(cart, cachedCart);
                return cachedCart;
            }
        });
    };

    OrderFactory.getRecentComplete = function(orderId){
        return $http.get('/api/orders/getRecentComplete/' + orderId)
        .then(function(recentComplete){
            var order = recentComplete.data;
            var priceArr = order.products.map((product)=>{return product.quantity * product.finalPrice});
            priceArr.forEach((price, index)=>{order.products[index]['productTotal'] = price});
            order.orderTotal = priceArr.reduce((p,c)=>{return p+c; });
            return order;
        })
    }


    OrderFactory.getCompleteOrdersByUser = function(userId){
        return $http.get('/api/orders/getComplete/' + userId)
        .then(function(completeOrders){
            return completeOrders.data;
        });
    };


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
            return filteredOrder;
        })
    }

    function updateCache(productId, number){
        console.log('in update cache')
        var arr = cachedCart.products.map(productChild => productChild.product._id);
        var index = arr.indexOf(productId);
        cachedCart.products[index].quantity+=number;
        cachedCart.products[index].productTotal = cachedCart.products[index].quantity * cachedCart.products[index].product.price;
        var arr = cachedCart.products.map(function(product){return product.quantity * product.product.price});
        cachedCart.cartTotal = arr.reduce(function(p,c){return p+c});
    }

    //WILL ADD TO CART OR CREATE CART IF DOESN'T ALREADY EXIST
    OrderFactory.addToCart = function(productId, quantity){
        return $http.put('/api/orders/addToCart/' + productId, {quantity: quantity})
        .then(function(cart){
            updateCache(productId, quantity);
            return cachedCart;
        });
    };

    OrderFactory.addToCartFromProduct = function(productId, quantity){
        return $http.put('/api/orders/addToCart/' + productId, {quantity: quantity})
        .then(function(cart){
            return cart.data;
        });
    };


    OrderFactory.removeOneFromCart = function(productId){
        console.log('product id in remove one from car', productId)
        return $http.put('/api/orders/removeOneFromCart/' + productId)
        .then(function(cart){
            updateCache(productId, -1);
            return cachedCart;
        })
    }

    OrderFactory.removeFromCart = function(productId){
        console.log('cachedCart in removefrom cart factory', cachedCart);
        return $http.put('/api/orders/removeFromCart/' + productId)
        .then(function(cart){
            var index;
            for (var i=0; i< cachedCart.products.length; i++){
                console.log(cachedCart.products[i].product._id)
                if (cachedCart.products[i].product._id === productId) index = i;
            }
            console.log('index', index)
            cachedCart.cartTotal -= cachedCart.products[index].productTotal;
            cachedCart.products.splice(index,1);
            return cachedCart;
        })
    }

    OrderFactory.changeStatus = function(newStatus, orderId){
        cachedCart = {};
        return $http.put('/api/orders/changeStatus/' + orderId + '/' + newStatus)
        .then(function(updatedOrder){
            return updatedOrder.data;
        })
    }

    return OrderFactory;
})
