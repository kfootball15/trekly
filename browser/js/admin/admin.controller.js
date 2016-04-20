app.controller('AdminCtrl', function($scope, $state, ProductFactory) {

  $scope.imagePath = 'assets/images/placeholder.jpg';

  ProductFactory.getAllProducts()
  .then(function(products){
      $scope.products = products;
  })

  ProductFactory.getOneProduct()
  .then(function(product){
    return product;
  })

  $scope.editForm = function(product){
    console.log(product)
    $state.go('adminEdit', {id: product._id})
  }

});
