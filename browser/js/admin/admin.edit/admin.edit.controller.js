app.controller('AdminEditCtrl', function($scope, $state, ProductFactory, productToEdit) {

  $scope.productToEdit = productToEdit;

  $scope.update = {};

  $scope.updateProduct = function(productId, update){
    ProductFactory.updateProduct(productId, update)
    .then(function(response){
      $state.go('home')
    })
  }

});
