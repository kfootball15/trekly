app.controller('SellerOrderCtrl', function($scope, $state, SellerOrderFactory, allOrders) {

  //For Filtering
  $scope.statuses = ['all', 'cart', 'confirmed', 'processing', 'cancelled', 'complete']

  //Update Object to send to Put Requests
  $scope.update = {};
  $scope.update.status = 'all';
  $scope.update.allOrders = allOrders;


  $scope.deleteOrder = function(orderId){
    SellerOrderFactory.deleteOneOrder(orderId)
    .then(function(order){
      if(order.status===200){
        for (var i = 0; i < $scope.update.allOrders.length; i++) {
          if ($scope.update.allOrders[i]._id === order.data._id) $scope.update.allOrders.splice(i, 1);
        }
      }
    })
    .then(null, function(err){
      console.error(err);
    });
  };

  $scope.editOrderForm = function(order){
    $state.go('sellerEditOrder', {orderId: order._id});
  };

});
