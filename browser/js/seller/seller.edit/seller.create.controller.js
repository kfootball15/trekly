app.controller('SellerCreateCtrl', function(currentUser, $scope, $state, ProductFactory) {
	console.log('in seller create controller');
	$scope.user = currentUser;

  	$scope.create = {images: [], coordinates: []};

  $scope.createProduct = function(create){
  	create.seller = $scope.user._id;
  	console.log('create', create);
    ProductFactory.createProduct(create)
    .then(function(){
      $state.go('sellerProducts', {sellerId: $scope.user._id})
    })
  }

});
