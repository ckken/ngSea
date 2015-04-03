define(function (require, exports, module) {
    var app = angular.module('app', ['ui.router','ngSea']);
    app.config(function ($stateProvider, $urlRouterProvider) {


        $stateProvider
            .state('main',{
                url: "/main",
                views:{
                    "":{
                        controller: 'main',
                        templateUrl: G.path.mod+'/main/main.html',
                        controllerUrl: G.path.mod+'/main/main.js'
                    }
                }
            })

            .state('home', {
              url: "/",
                controller: function ($scope, $location) {
                    $scope.str = new Date()
                },
                template: '<div>{{str}}</div>'
            })


             $urlRouterProvider.otherwise("/");
    })

    app.run(function ($rootScope, $ngSea) {

        app = $ngSea(app,{
            route_start:'$stateChangeStart',
            mod_root:G.path.mod
        });


    })

    module.exports = app;

})