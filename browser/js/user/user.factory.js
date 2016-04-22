app.factory('UserFactory', function($http) {
    return {
        getUserById: function(userId) {
            return $http.get('/api/members/' + userId)
            .then(function(user) {
                return user;
            });
        },
        getAllUsers: function(){
            return $http.get('/api/members/')
            .then(function(users){
                return users.data;
            })
        }
    };
});
