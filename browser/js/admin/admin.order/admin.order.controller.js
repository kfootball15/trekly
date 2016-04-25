app.controller('AdminOrderCtrl', function($scope, $state, allOrders) {

  $scope.allOrders = allOrders;

  $scope.statuses = ['cart', 'confirmed', 'processing', 'cancelled', 'complete']

  $scope.update = {}
  $scope.update.status = 'cart';

  $scope.consoleLog = function(){
    console.log($scope.update)
  }

  $scope.editOrderForm = function(order){
    console.log("controller:", order._id)
    $state.go('adminEditOrder', {orderId: order._id})
  };

});
