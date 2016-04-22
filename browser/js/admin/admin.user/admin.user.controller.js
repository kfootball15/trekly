app.controller('AdminUserCtrl', function($scope, $state, getAllUsers) {
  $scope.users = getAllUsers;

  $scope.editUser = function(user){
    console.log("user id", user._id)
    $state.go('adminEditUser', {id: user._id})
  }

});
