app.directive('review', function(){
    return {
        restrict: 'E',
        templateUrl: '/js/reviews/review.template.html',
        controller: 'ReviewCtrl'
    }
});