app.controller('HomeCtrl', function($scope, ProductFactory) {
  $scope.imagePath = 'assets/images/placeholder.jpg';
  ProductFactory.getAllProducts()
  .then(function(products){
      $scope.products = products;
  })
});
