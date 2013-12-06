/**
 * ngSea VerSion 0.2.1
 * Author by KenZR email ckken@qq.com
 * Create time 2013/12/5
 * support in IE6 about with the Angular 1.0.8 (because the 1.2.3 not support in IE 7)
 * use it inject ngSea And in run use app = $ngSea(app); that's all
 * Contact us: QQ 117692258
 */
angular.module('ngSea', [], ["$controllerProvider", "$compileProvider", "$filterProvider", "$provide", function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
    $provide.factory('$ngSea', ['$rootScope', '$q', function ($rootScope, $q) {
        return function (app) {

            $rootScope.activeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            $rootScope.$on('$routeChangeStart', function (e, target) {
                var route = target && target.$$route ||{};
                route.resolve =route.resolve || {};
                route.resolve.loadedModule = function () {
                    var deferred = $q.defer();
                    seajs.use(route.controllerUrl, function(m){
                        $rootScope.activeApply(function () {
                            if(angular.isUndefined(m)){
                                deferred.reject(m);
                            }else{
                                deferred.resolve(angular.isFunction(m) ? m(app) : m);
                            }
                        });
                    });

                    return deferred.promise;
                }
            });


            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service,
                decorator: $provide.decorator
            }
            return app;
        }
    }]);
}]);
