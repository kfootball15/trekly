app.controller('AdminCreateCtrl', function($scope, $state, ProductFactory) {

  $scope.create = {};

  $scope.createProduct = function(create){
    ProductFactory.createProduct(create)
    .then(function(){
      $state.go('home')
    })
  }

});
