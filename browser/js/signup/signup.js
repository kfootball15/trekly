app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, UserFactory) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {
        $scope.error = null;

        UserFactory.signup(signupInfo)
        .then(function(newUser) {
            return AuthService.login(signupInfo);
        })
        .then(function () {
            $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Invalid signup credentials provided.';
        });

    };

    $scope.style = function() {
        if ($scope.signupForm.email.$invlaid) {
            return {"color": "red"};
        }
    }

});
