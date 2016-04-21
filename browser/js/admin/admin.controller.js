app.controller('AdminCtrl', function($scope, $state, $mdSidenav, $mdMedia, ProductFactory, getAllProducts) {

  $scope.imagePath = 'assets/images/placeholder.jpg';

  $scope.products = getAllProducts

  $scope.editForm = function(product){
    console.log(product)
    $state.go('adminEdit', {id: product._id})
  }

  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

});
