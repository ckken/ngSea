/**
 * ngSea VerSion 0.6.1
 * Author by ckken email ckken@qq.com
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


            var register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service,
                decorator: $provide.decorator
            }

            config = angular.extend(config,setting);


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
                                    deferred.resolve(angular.isFunction(m) ? m(register,app) : m);
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
