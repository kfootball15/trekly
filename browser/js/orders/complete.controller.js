// complete.controller.js

app.controller('CompleteCtrl', function(recentComplete, $state, $scope, OrderFactory, $timeout, $q, $log) {

	$scope.complete = recentComplete;

	$scope.consolidateOrder = recentComplete.consolidateOrder;
	// $scope.totalOrder = recentComplete.totalPrice;

	//WORK ON TOTAL PRICE

});