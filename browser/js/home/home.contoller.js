app.controller('HomeCtrl', function($scope, ProductFactory, allProducts, $state) {
  $scope.imagePath = 'assets/images/placeholder.jpg';

  $scope.products = allProducts;

  // PUTS ALL CATEGORIES FROM ALL PRODUCTS INTO CATS ARRAY
  var cats = [];
  (function getCategories() {
  	allProducts.forEach(function(product) {
  		product.categories.forEach(function(category) {
  			cats.push(category);
  		})
  	});
  })();

  // MAKES SURE THERE ARE NO DUPLICATE CATEGORIES AND PUTS THEM INTO $SCOPE.CATEGORIES
  $scope.categories = [];
  (function cleanCategories() {
  	cats.forEach(function(category) {
  		if ($scope.categories.indexOf(category) === -1) {
  			$scope.categories.push(category);
  		}
  	});
  })();
console.log('home')

  $scope.searchByCat = function() {
    //do something with selected category
  };

});
