define(function (require, exports, module) {

    module.exports = function(app){

        app.controller('multi', ['$scope', '$stateParams', '$location', '$http',
                function($scope, $stateParams, $location, $http){

                    $scope.str = new Date()
                }]
        )

    }



});