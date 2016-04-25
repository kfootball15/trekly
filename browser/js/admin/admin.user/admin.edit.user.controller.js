app.controller('AdminEditUserCtrl', function($scope, $state, UserFactory, userToEdit) {

  $scope.userToEdit = userToEdit;

  $scope.update = {};

  $scope.roles = ['Admin', 'Seller', 'Customer']

  $scope.updateUser = function(userId, update){
    UserFactory.updateUser(userId, update)
    .then(function(){
      $state.go('adminUser')
    })
  }

});
