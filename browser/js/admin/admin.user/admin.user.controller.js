app.controller('AdminUserCtrl', function($scope, $state, getAllUsers) {
  $scope.users = getAllUsers;

});
