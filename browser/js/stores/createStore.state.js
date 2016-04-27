app.config(function ($stateProvider) {
    $stateProvider.state('createStore', {
        url: '/createStore',
        templateUrl: '/js/stores/createStore.template.html',
        resolve: {
        	user: function(AuthService) {
		        	return AuthService.getLoggedInUser()
        		
        	}
        },
        controller: function($scope, UserFactory, $state, user) {
        	console.log('user in ctrl',user);
        	$scope.user = user;

        	$scope.makeUserStoreOwner = function() {
        		return UserFactory.updateUser($scope.user._id, {isSeller: true, storeName: $scope.storeName})
        		.then(function(user) {
        			$scope.user = user.data;
        			console.log('user in asdfadf', $scope.user._id)
        			$state.go('sellerHome', {sellerId: $scope.user._id});
        		})
        	};
        }
    });
});