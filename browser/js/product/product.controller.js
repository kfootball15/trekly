app.controller('ProductCtrl', function($scope, ProductFactory, $timeout, $q, $log) {

  $scope.imagePath = 'assets/images/placeholder.jpg';

  ProductFactory.getAllProducts()
  .then(function(products){
      $scope.products = products;
  })

  // $scope.searchText='';


});
