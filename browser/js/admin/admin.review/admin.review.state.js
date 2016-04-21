app.config(function ($stateProvider) {
    $stateProvider.state('adminReview', {
        url: '/admin/review',
        controller: 'AdminCtrl',
        templateUrl: '/js/admin/admin.review/admin.review.template.html',
        // resolve: {
        //     productToEdit: function($stateParams, ProductFactory){
        //         console.log("ID:", $stateParams.id)
        //         return ProductFactory.getOneProduct($stateParams.id)
        //     }
        // }
    });
});
