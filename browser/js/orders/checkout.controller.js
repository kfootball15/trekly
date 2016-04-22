// checkout.controller.js

app.controller('CheckoutCtrl', function($scope, $state, OrderFactory, $timeout, $q, $log) {
  
  $scope.cart = OrderFactory.getCartCache();
  $scope.consolidateCart = $scope.cart.consolidateCart;
  $scope.totalPrice = $scope.cart.totalPrice;


  $scope.editOrder = function(){
    $state.go('cart');
  }

   //ADD VALIDATIONS: 
   //MAKE SURE IT ONLY CHECKS OUT THE ONE CART
   //CHECK IT DOESN'T GO INTO NEGATIVE INVENTORY
  // $scope.message; 
  $scope.confirm = function(){
    var cart = $scope.cart;
  	console.log('in controller checkout')
    return OrderFactory.changeStatus('complete')
    .then(function(order){
      //NEED TO DEBUG THIS
        $state.go('complete', {id: order._id});
    })    
  }


});
