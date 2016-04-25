app.controller('CartCtrl', function($scope, $state, OrderFactory, $timeout, $q, $log) {

// var isCartFull = function(){
//   if ($scope.cart.cartTotal === 0) $scope.isFull = false;
//   else $scope.isFull = true;
//   console.log('isFull', $scope.isFull);
// }

$scope.cart = OrderFactory.getCartCache();

$scope.checkCartEmpty = function(){
  console.log('in checkCartEmpty function')
  if ($scope.cart.cartTotal === 0) return true;
  else return false;
}

//NEED TO MAKE THIS RESPONSIVE ON FRONT-END


  $scope.checkout = function(){
    // if ($scope.cart.products.length > 0) $state.go('checkout');
    $state.go('checkout');
  }

  $scope.add = function(productId){
    OrderFactory.addToCart(productId)
    .then(function(updatedCart){
    })
  }

  $scope.subtract = function(productId){
    OrderFactory.removeOneFromCart(productId)
    .then(function(updatedCart){
    })
  }

  $scope.remove = function(productId){
    OrderFactory.removeFromCart(productId)
    .then(function(updatedCart){
      if (updatedCart.cartTotal === 0) $scope.cart.cartTotal = 0;
      $scope.checkCartEmpty();
    })
  }

});
