'use strict';

app.directive('oauthButton', function () {
	return {
		scope: {
			providerName: '@',
            verb: '@'
		},
		restrict: 'E',
		templateUrl: '/js/oauth-button/oauth-button.html'
	}
});
