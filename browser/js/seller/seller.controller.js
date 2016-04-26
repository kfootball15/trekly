app.controller('SellerCtrl', function(currentUser, $scope, $state, $mdSidenav, $mdMedia, ProductFactory, getAllProducts) {

  $scope.imagePath = 'assets/images/placeholder.jpg';

  $scope.user = currentUser;

  $scope.products = getAllProducts

  $scope.deleteProduct = function(product, index){
    return ProductFactory.deleteProduct(product._id)
    .then(function(response){
      if (response.status === 204){
        return $scope.products.splice(index, 1)
      }
    })
  }

  $scope.createProduct = function(){
    $state.go('sellerCreateProduct')
  }

  $scope.editForm = function(product){
    $state.go('sellerEdit', {id: product._id})
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
