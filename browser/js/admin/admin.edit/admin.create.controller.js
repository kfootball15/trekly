app.controller('AdminCreateCtrl', function($scope, $state, ProductFactory) {

  $scope.create = {images: [], coordinates: []};

  $scope.createProduct = function(create){
  	console.log("created", create)
    ProductFactory.createProduct(create)
    .then(function(){
      $state.go('home')
    })
  }

});
