app.factory('UserFactory', function($http) {
    var UserFactory = {};

    function getData(res) {
        return res.data;
    }

    UserFactory.signup = function(newUser) {
        return $http.post('api/members/', newUser)
        .then(getData)
        .then(function(createdUser) {
            return createdUser;
        });
    };

    return UserFactory;
});
