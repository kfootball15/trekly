app.controller('CartCtrl', function($scope, $state, OrderFactory, $timeout, $q, $log) {

$scope.cart = OrderFactory.getCartCache();

$scope.checkCartEmpty = function(){
  if ($scope.cart.cartTotal === 0) return true;
  else return false;
}

 $scope.checkout = function(){
    // if ($scope.cart.products.length > 0) $state.go('checkout');
    $state.go('checkout');
  }

  $scope.add = function(productId){
    OrderFactory.addToCart(productId, 1)
    .then(function(updatedCart){
    })
    .catch($log.error)
  }

  $scope.subtract = function(productId){
    OrderFactory.removeOneFromCart(productId)
    .then(function(updatedCart){
    })
    .catch($log.error)
  }

  $scope.remove = function(productId){
    OrderFactory.removeFromCart(productId)
    .then(function(updatedCart){
      if (updatedCart.cartTotal === 0) $scope.cart.cartTotal = 0;
      $scope.checkCartEmpty();
    })
    .catch($log.error)
  }

});
