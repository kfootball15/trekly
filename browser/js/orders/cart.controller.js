app.controller('CartCtrl', function($scope, $state, OrderFactory, $timeout, $q, $log) {

  $scope.cart = OrderFactory.getCartCache();
  $scope.products = $scope.cart.products;
  $scope.finalPrice = $scope.cart.finalPrice;
  // $scope.consolidateCart = $scope.cart.consolidateCart;



  // $scope.getTotalPrice = function(){
  //   var arr = $scope.consolidateCart.map(function(item){
  //     return item.finalPrice;
  //   })
  //   $scope.totalPrice = arr.reduce(function(prev,curr){return prev+curr; })
  // }


  //ADD TOTAL PRICE FUNCTION INTO THE ORDER FACTORY
  // $scope.totalPrice = $scope.consolidateCart.map(function(item){return item.finalPrice; }).reduce(function(prev,curr){return prev+curr; });
  // $scope.totalPrice = $scope.cart.totalPrice;
  // var getTotalPrice = function(){
  //   if ($scope.cart.finalPrice) {
  //     price = $scope.cart.finalPrice.reduce(function(prev,curr){return prev+curr; })
  //     $scope.totalPrice = String(price);
  //   }
  //   else $scope.totalPrice = '0';
  // }


  $scope.checkout = function(){
    console.log('in checkout')
    $state.go('checkout');
  }

  $scope.add = function(productId){
    console.log('in controller add function, productId: ', productId)
    OrderFactory.addToCart(productId)
    .then(function(updatedCart){
      $scope.getTotalPrice();
      console.log('backend cart updated');
    })
  }

  $scope.subtract = function(productId){
    console.log('in controller subtract function, productId: ', productId)
    OrderFactory.removeOneFromCart(productId)
    .then(function(updatedCart){
      $scope.getTotalPrice();
      console.log('backend cart updated');
    })
  }

  $scope.remove = function(productId){
    console.log('in controller remove function, productId: ', productId)
    OrderFactory.removeFromCart(productId)
    .then(function(updatedCart){
      $scope.getTotalPrice();
      console.log('backend cart updated');
    })
  }

  console.log('in controller');

//MAKE SURE:
//one session ID can only have one cart order at a given time
//one session ID can have multiple orders at once
});
