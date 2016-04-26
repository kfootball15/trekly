app.controller('SellerHomeCtrl', function(UserFactory, currentUser, $scope, $state, $mdSidenav, $mdMedia) {

  $scope.user = currentUser;
  $scope.newColor = {'background-color': $scope.user.backgroundColor};
  $scope.storeName = $scope.user.storeName;

  $scope.setStoreName = function(){
    console.log('set store name called in controller')
    UserFactory.updateUser($scope.user._id, {storeName: $scope.name})
    .then(function(user){
      console.log('updated user in controller: ', user)
      $scope.storeName = user.data.storeName;
      return user;
    })
  }


  $scope.setBackgroundColor = function(){
    UserFactory.updateUser($scope.user._id, {backgroundColor: $scope.color})
    .then(function(user){
      $scope.newColor["background-color"] = user.data.backgroundColor;
      return user;
    })
  }

});
