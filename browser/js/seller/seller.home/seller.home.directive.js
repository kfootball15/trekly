// app.directive('sellerToolbar', function(){
//     return {
//         restrict: 'E',
//         templateUrl: '/js/seller/seller.home/seller.home.toolbar.template.html'
//     }
// })

app.directive('sellerNav', function(AuthService){
    return {
        restrict: 'E',
        templateUrl: '/js/seller/seller.home/seller.home.nav.template.html',
        // scope: {
        // 	storeName: '='
        // },
        link: function(scope){
        	return AuthService.getLoggedInUser()
        	.then(function(user){
        		scope.storeName = user.storeName;
        		return user;
        	})
        }
    }
})