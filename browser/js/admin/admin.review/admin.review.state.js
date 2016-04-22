// app.config(function ($stateProvider) {
//     $stateProvider.state('adminReview', {
//         url: '/admin/review',
//         controller: 'AdminReviewCtrl',
//         templateUrl: '/js/admin/admin.review/admin.review.template.html',
//         resolve: {
//             allOrders: function(){
//                 return $http.get('/api/orders')
//                 .then(function(order){
//                     return order.data;
//                 })
//                 .catch(function(err){
//                     console.error(err);
//                 });
//             }
//         }
//     });
// });
