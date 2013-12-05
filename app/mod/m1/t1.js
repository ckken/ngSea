define(function (require, exports, module) {

    module.exports = function(app){

        app.register.controller('testACtrl', ['$scope', '$routeParams', '$location', '$http',
            function($scope, $routeParams, $location, $http){
                $http.get('data/testA.json').success(function(res){
                    $scope.data=res;
                })
            }
        ]);


    }
});