app.controller('CompleteCtrl', function(recentOrder, $state, $scope, OrderFactory, $timeout, $q, $log, loggedInUser) {

	$scope.complete = recentOrder;
	$scope.loggedInUser = loggedInUser || null;
});