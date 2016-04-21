app.factory('UserFactory', function($http) {
	return {
		getUserById: function(userId) {
			$http.get('/api/members/' + userId)
			.then(function(user) {
				return user;
			});
		}
	};
});