app.controller('ProductCtrl', function($scope, OrderFactory, $mdDialog) {

	$scope.addToCart = function(productId) {
		OrderFactory.addToCartFromProduct(productId)
		.then(function(cart) {
			console.log(cart);
		});
	};

  $scope.showAlert = function(ev, product) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Package Added To Cart')
        .textContent(product.title + ' added to cart.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Keep Shopping!')
        .targetEvent(ev)
    );
  };

})

