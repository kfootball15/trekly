// userAccount.controller.js

app.controller('UserAccountCtrl', function(loggedInUser, cart, processing, pastOrders, $scope, $state, OrderFactory, $timeout, $q, $log) {

	$scope.cart = cart;
	$scope.processing = processing;
	$scope.pastOrders = pastOrders;
	$scope.loggedInUser = loggedInUser;


//FIGURE OUT IF I NEED TO GO TO ANOTHER VIEW FOR THIS
 // $scope.checkout = function(){
 //  	$state.go('checkout');
 //  }
});
