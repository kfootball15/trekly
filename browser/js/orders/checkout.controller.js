// checkout.controller.js

app.controller('CheckoutCtrl', function($scope, $state, OrderFactory, $timeout, $q, $log) {
  
  $scope.cart = OrderFactory.getCartCache();
  
  $scope.editOrder = function(){
    $state.go('cart');
  }

 
  // $scope.confirm = function(){
  //   var cart = $scope.cart;
  //   var orderId = $scope.cart._id;
  //   return OrderFactory.changeStatus('complete', orderId)
  //   .then(function(order){
  //       $state.go('complete', {id: order._id});
  //   })    
  // }


});
