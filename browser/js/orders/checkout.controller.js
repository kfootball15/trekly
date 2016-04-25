app.controller('CheckoutCtrl', function(cart, $scope, $state, OrderFactory, $timeout, $q, $log) {
  
  $scope.cart = cart;

  $scope.editOrder = function(){
    $state.go('cart');
  }

  $scope.confirm = function(){
    var cart = $scope.cart;
    return OrderFactory.changeStatus('complete')
    .then(function(order){
        $state.go('complete', {id: order._id});
    })    
  }

});
