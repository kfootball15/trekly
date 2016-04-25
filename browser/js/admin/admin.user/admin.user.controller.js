app.controller('AdminUserCtrl', function($scope, $state, getAllUsers, UserFactory) {

  $scope.users = getAllUsers;

  $scope.editUser = function(user){
    $state.go('adminEditUser', {id: user._id})
  }

  $scope.passwordReset = function(user){
    return UserFactory.updateUser(user._id, {passwordReset: true})
    .then(function(response){
      console.log(response)
    })
  }

  $scope.deleteUser = function(user, index){
    return UserFactory.deleteUser(user._id)
    .then(function(response){
      if (response._id === user._id){
        return $scope.users.splice(index, 1)
      }
    })
  }

});
