app.controller('AdminEditOrderCtrl', function($scope, $state, AdminOrderFactory, orderToEdit) {

  $scope.orderToEdit = orderToEdit;

  console.log("$scope.orderToEdit", $scope.orderToEdit)

  $scope.update = {};

  $scope.statuses = ['cart', 'confirmed', 'processing', 'cancelled', 'complete']

  // $scope.updateOrder = function(productId, update){
  //   console.log("Should have switched")
  //   AdminOrderFactory.updateOrder(productId, update)

  // }

  $scope.editProductForm = function(order){
    $state.go('adminEdit', {id: order._id})
  };

  $scope.updateOrder = function(order, update){
    AdminOrderFactory.updateOneOrder(order._id, update)
    .then(function(){
      $state.go('adminOrder')
    })
  };

  $scope.removeProduct = function(product, order, update){
    // $scope.updateOrder(order, update)
    console.log("romoveProduct:", update);

    //THE LOGIC HERE IS BACKWARDS!!! It should remove the product, and if successful
    //then it should remove from $scope.update.products like Laura did

    for (var i = 0; i < $scope.update.products.length; i++) {
      if($scope.update.products[i]._id === product._id) $scope.update.products.splice(i, 1)
    }

    AdminOrderFactory.updateOneOrder(order._id, update)
    .then(function(){
    })

  };

});
