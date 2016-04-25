app.factory('OrderFactory', function($http){
    var OrderFactory = {};

    // OrderFactory.getAllOrders = function(){
    //     return $http.get('/api/orders/')
    //     .then(function(orders){
    //         return orders.data;
    //     })
    // }

    var cachedCart = {};

    // var getTotalPrice = function(cachedCart){
    //     var arr = cachedCart.consolidateCart.map(function(item){
    //         return item.finalPrice;
    //     })
    //     return arr.reduce(function(prev,curr){return prev+curr; })
    // }

    OrderFactory.getCartCache = function(){
        // cachedCart.totalPrice = getTotalPrice(cachedCart);
        return cachedCart;
    }


    // var consolidateCart = function(products){
    //     if (!products) return;
    //     var newObj = {};
    //     for (var i = 0; i<products.length; i++){
    //         newObj[products[i].title] = newObj[products[i].title] || {};
    //         newObj[products[i].title].product = products[i];
    //         newObj[products[i].title].quantity = ++newObj[products[i].title].quantity || 1;
    //         newObj[products[i].title].finalPrice = newObj[products[i].title].finalPrice + products[i].price || products[i].price;
    //         // newObj[products[i].title].finalPrice = newObj[products[i].title].finalPrice + finalPrice[i] || finalPrice[i];
    //     }
    //     var array = [];
    //     for (var key in newObj){
    //         var finalObj = {};
    //         finalObj['title'] = key;
    //         finalObj['quantity'] = newObj[key].quantity;
    //         finalObj['finalPrice'] = newObj[key].finalPrice;
    //         finalObj['products'] = newObj[key].product;
    //         finalObj['id'] = newObj[key].product._id;
    //         array.push(finalObj);
    //     }
    //     console.log('consolidated array', array);
    //     return array;
    // }

    OrderFactory.getCart = function(){
        return $http.get('/api/orders/getCart')
        .then(function(cart){
            console.log(cart)
            if (!cart) throw new Error();
            // var products = cart.products;
            // cart.consolidateCart = consolidateCart(products);
            // console.log('cart with consolidateCart', consolidateCart);
            angular.copy(cart.data, cachedCart);
            return cachedCart;
        });
    };


    var consolidateOrder = function(products, finalPrice){
        var newObj = {};
        for (var i = 0; i<products.length; i++){
            newObj[products[i].title] = newObj[products[i].title] || {};
            newObj[products[i].title].product = products[i];
            newObj[products[i].title].quantity = ++newObj[products[i].title].quantity || 1;
            // newObj[products[i].title].finalPrice = newObj[products[i].title].finalPrice + products[i].price || products[i].price;
            newObj[products[i].title].finalPrice = newObj[products[i].title].finalPrice + finalPrice[i] || finalPrice[i];
        }
        var array = [];
        for (var key in newObj){
            var finalObj = {};
            finalObj['title'] = key;
            finalObj['quantity'] = newObj[key].quantity;
            finalObj['finalPrice'] = newObj[key].finalPrice;
            finalObj['products'] = newObj[key].product;
            finalObj['id'] = newObj[key].product._id;
            array.push(finalObj);
        }
        console.log('consolidated array', array);
        return array;
    }

    //TEST THIS!!!!
    OrderFactory.getRecentComplete = function(orderId){
    	return $http.get('/api/orders/getRecentComplete/' + orderId)
    	.then(function(recentComplete){
    		return recentComplete.data;
    	})
        .then(function(recentOrder){
            if (!recentOrder) throw new Error();
            var products = recentOrder.products;
            var finalPrice = recentOrder.finalPrice;
            // recentOrder.totalPrice = getTotalPrice(recentOrder);
            recentOrder.consolidateOrder = consolidateOrder(products, finalPrice);
            console.log('recent order with consolidated order', consolidateOrder);
            return recentOrder;
        })
        .catch(function(err){
            console.log('Error: ', err);
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
        	console.log('filtered', filteredOrder)
        	return filteredOrder;
        })
    }

    function updateCache(productId, number){
        var arr = cachedCart.products.map(productChild => productChild.product._id);
        var index = arr.indexOf(productId);
        cachedCart.products[index].quantity+=number;
        cachedCart.products[index].totalPrice = cachedCart.products[index].quantity * cachedCart.products[index].product.price;
    }

    //WILL ADD TO CART OR CREATE CART IF DOESN'T ALREADY EXIST
    OrderFactory.addToCart = function(productId){
    	return $http.put('/api/orders/addToCart/' + productId)
    	.then(function(cart){
            updateCache(productId, 1);
    		return cachedCart;
    	});
    };


    OrderFactory.removeOneFromCart = function(productId){
    	console.log('in remove one from cart factory')
    	return $http.put('/api/orders/removeOneFromCart/' + productId)
    	.then(function(cart){
            console.log('cart', cart)
            updateCache(productId, -1);
            // cachedCart.consolidateCart = removeOneFromCache(cachedCart.consolidateCart, productId);
    		console.log('cart after subtract in order factory', cachedCart)
            // console.log('cache', cachedCart)
    		return cachedCart;
    	})
    }


    // function addToCache(consolidatedArray, productId){
    //     console.log('consolidatedArray', consolidatedArray);
    //     var index;
    //     for (var i=0; i< consolidatedArray.length; i++){
    //         if (consolidatedArray[i].id === productId) index = i;
    //     }
    //     consolidatedArray[index].quantity++;
    //     consolidatedArray[index].finalPrice += consolidatedArray[index].products.price;
    //     return consolidatedArray;
    // }


    // function removeOneFromCache(consolidatedArray, productId){
    //     var index;
    //     for (var i=0; i< consolidatedArray.length; i++){
    //         if (consolidatedArray[i].id === productId) index = i;
    //     }
    //     consolidatedArray[index].quantity--;
    //     consolidatedArray[index].finalPrice = consolidatedArray[index].finalPrice - consolidatedArray[index].products.price;
    //     console.log('in remove cache function')
    //     return consolidatedArray;
    // }

    OrderFactory.removeFromCart = function(productId){
    	console.log('in remove all product from cart factory')
    	return $http.put('/api/orders/removeFromCart/' + productId)
    	.then(function(cart){
            var index = cachedCart.products.map(productChild => productChild.product._id).indexOf(productId);
            cachedCart.products.splice(index, 1);
            console.log('cart after remove in order factory', cachedCart)
    		return cachedCart;
    	});
    };

    function removeAllFromCache(consolidatedArray, productId){
        console.log('consolidatedArray', consolidatedArray);
        var index;
        for (var i=0; i< consolidatedArray.length; i++){
            if (consolidatedArray[i].id === productId) index = i;
        }
        consolidatedArray.splice(index, 1)
        return consolidatedArray;
    }

    //NEED TO DEBUG THIS
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
