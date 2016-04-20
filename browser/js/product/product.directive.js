app.directive('productCard', function(){
    return {
        restrict: 'E',
        templateUrl: '/js/product/product.template.html',
        controller: 'ProductCtrl'
    }
})
