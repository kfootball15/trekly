app.controller('ProductCtrl', function($scope, OrderFactory, $mdDialog, $state) {

	$scope.addToCart = function(productId) {
		OrderFactory.addToCartFromProduct(productId)
		.then(function(cart) {
			console.log(cart);
		});
	};


    $scope.showConfirm = function(ev, product) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('You just added ' + product.title + ' to your cart!')
          .textContent('You are on your way to ' + product.location + '!')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Keep Shopping')
          .cancel('Go to Cart');

    $mdDialog.show(confirm).then(function() {
        if (product.seller === null) var newState = 'home';
        else newState = 'seller'
      $state.go(newState, {sellerId: product.seller});
    }, function() {
      $state.go('cart');
    });
  };




})

