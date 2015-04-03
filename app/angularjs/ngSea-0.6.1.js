/**
 * ngSea VerSion 0.2.1
 * Author by KenZR email ckken@qq.com
 * Create time 2013/12/5
 * support in IE6 about with the Angular 1.0.8 (because the 1.2.3 not support in IE 7)
 * use it inject ngSea And in run use app = $ngSea(app); that's all
 * Contact us: QQ 117692258
 */
angular.module('ngSea', [], ["$controllerProvider", "$compileProvider", "$filterProvider", "$provide", 
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
    $provide.factory('$ngSea', ['$rootScope', '$q', function ($rootScope, $q) {
        return function (app,setting) {

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


            var config = {
                route_start:'$routeChangeStart',
                mod_root:'',
                tpl_ext:'.html'
            }


            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service,
                decorator: $provide.decorator
            }

            config = angular.extend(setting,setting);


            var _route_run = {}


            _route_run['$routeChangeStart'] = function(){
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
                })
            }

            _route_run['$stateChangeStart'] = function(){

                function _resolve_route(route){
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
                }

                $rootScope.$on('$stateChangeStart', function (e, to) {

                    angular.forEach(to.views,function(v,k){
                            _resolve_route(v)
                    })

                })
            }

            _route_run[config.route_start]()


            app.ui_format = function (url,name,array){

                        view = view||''
                        var json = {views:{},url:url}
                        var mod_path = name&&name+'/'||''
                        array = array||[]
                        if(array.length>0){
                            angular.forEach(array,function(v,k){
                                 v.view = v.view||''
                                 json.views[v.view] = {
                                    templateUrl: v.template||config.mod_root+'/'+mod_path+v.controller+config.tpl_ext,
                                    controller:v.controller||'',
                                    controllerUrl:v.controllerUrl||config.mod_root+'/'+mod_path+v.controller,
                                    abstract :v.abstract||false
                                }
                            })
                        }else if(!angular.isUndefined(name)){

                                 json.views[''] = {
                                    templateUrl: config.mod_root+'/'+mod_path+name+config.tpl_ext,
                                    controller:name,
                                    controllerUrl:config.mod_root+'/'+mod_path+name
                                }
                        }

                        return json
                }

            return app;
        }
    }]);
}]);
