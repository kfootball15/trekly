app.controller('AdminCtrl', function($scope, $state, $mdSidenav, $mdMedia, ProductFactory, getAllProducts) {

  $scope.imagePath = 'assets/images/placeholder.jpg';

  $scope.products = getAllProducts

  $scope.createProduct = function(){
    $state.go('adminCreateProduct')
  }

  $scope.editForm = function(product){
    console.log(product)
    $state.go('adminEdit', {id: product._id})
  }

  // $scope.openLeftMenu = function() {
  //   $mdSidenav('left').toggle();
  // };
  // $scope.isOpen = true;
  // $scope.toolbar = {
  //       isOpen: true,
  //       count: 5,
  //       selectedDirection: 'left'
  // };

});
