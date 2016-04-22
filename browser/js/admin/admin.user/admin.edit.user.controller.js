app.controller('AdminEditUserCtrl', function($scope, $state, UserFactory, userToEdit) {

  $scope.userToEdit = userToEdit;

  // $scope.update = {};

  // $scope.updateUser = function(userId, update){
  //   UserFactory.updateProduct(userId, update)
  //   .then(function(){
  //     $state.go('home')
  //   })
  // }

});
