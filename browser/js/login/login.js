app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo)
        .then(function (user) {
            if(user.isAdmin) $state.go('admin')
            else if (user.passwordReset) $state.go('passwordReset', {id: user._id})
            else $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
