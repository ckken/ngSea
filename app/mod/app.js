define(function (require, exports, module) {
    var app = angular.module('app', ['ngSea']);
    app.config(['$routeProvider', "$controllerProvider", function ($routeProvider, $controllerProvider) {

        $routeProvider
            .when('/t2',{
                controller: 'testBCtrl',
                templateUrl: './app/mod/m2/t2.html',
                'controllerUrl': 'm2/t2'
            })
            .when('/t1', {
                controller: 'testACtrl',
                templateUrl: './app/mod/m1/t1.html',
                'controllerUrl': 'm1/t1'
            })

            .when('/', {
                controller: function ($scope, $routeParams, $location) {
                    $scope.str = new Date()
                },
                template: '<div>{{str}}</div>'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
    ]);

    app.run(["$rootScope", "$ngSea", function ($rootScope, $ngSea) {

        app = $ngSea(app);

    }]);

    module.exports = app;

});