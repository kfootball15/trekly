app.controller('AdminOrderCtrl', function($scope, $state, AdminOrderFactory, allOrders) {

  //For Filtering
  $scope.statuses = ['all', 'cart', 'confirmed', 'processing', 'cancelled', 'complete']

  //Update Object to send to Put Requests
  $scope.update = {};
  $scope.update.status = 'all';
  $scope.update.allOrders = allOrders;


  $scope.deleteOrder = function(orderId){
    AdminOrderFactory.deleteOneOrder(orderId)
    .then(function(order){
      //CHECK FOR STATUS LIKE LAURA DID
      for (var i = 0; i < $scope.update.allOrders.length; i++) {
        if ($scope.update.allOrders[i]._id === order._id) $scope.update.allOrders.splice(i, 1);
      }
    })
    .then(null, function(err){
      console.error(err);
    });
  };

  $scope.editOrderForm = function(order){
    $state.go('adminEditOrder', {orderId: order._id});
  };

});
