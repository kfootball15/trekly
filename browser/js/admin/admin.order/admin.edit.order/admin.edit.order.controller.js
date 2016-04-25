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
    // console.log("controller:", order._id)
    $state.go('adminEdit', {id: order._id})
  };

  $scope.updateOrder = function(order, update){
    console.log(order._id)
    console.log(update)
    AdminOrderFactory.updateOneOrder(order._id, update)
    .then(function(){
      $state.go('adminOrder')
    })
  };

  $scope.removeProduct = function(product){

    for (var i = 0; i < $scope.update.products.length; i++) {
      if($scope.update.products[i]._id === product._id) $scope.update.products.splice(i, 1)
    }

  };



});
