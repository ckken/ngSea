define(function (require, exports, module) {

    module.exports = function(app){

        app.register.controller('testBCtrl', ['$scope', '$routeParams', '$location', '$http',
            function($scope, $routeParams, $location, $http){
                $http.get('data/testB.json').success(function(res){
                    $scope.data=res;
                })
            }
        ]);


    }
});