<h1>Angularjs 1.0.8 + Seajs 按需加载插件</h1>
 
 目前测试兼容IE6+
 
 DEMO :http://wvovo.com/ngSea/#/

* ngSea by KenZR email ckken@qq.com
 * Create time 2013/12/5
 * support in IE6 about with the Angular 1.0.8 (because the 1.2.3 not support in IE 7)
 * use it inject ngSea And in run use app = $ngSea(app); that's all
 * Contact us: QQ 117692258

SeaJs配置
<pre>
    seajs.use(['app'], function(app){
        angular.bootstrap(document, ['app']);
    });
</pre>


加载插件后 注入ngSea

<pre>
var app = angular.module('app', ['ngSea']);
</pre>

路由配置方式

<pre>
  when('/t1', {
      controller: 'testACtrl',
      templateUrl: './app/mod/m1/t1.html',
      'controllerUrl': 'm1/t1'
  })
</pre>

Run 期间引入$ngSea 赋值

<pre>
    app.run(["$rootScope", "$ngSea", function ($rootScope, $ngSea) {
        app = $ngSea(app);
    }]);
</pre>

请保留app里面的 register变量
使用方式为
<pre>
    module.exports = function(app){
        app.register.controller('testACtrl', ['$scope', '$routeParams', '$location', '$http',
            function($scope, $routeParams, $location, $http){
                $http.get('data/testA.json').success(function(res){
                    $scope.data=res;
                })
            }
        ]);
    }
</pre>


如果选择兼容requireJs 或者不考虑IE7一下的话
可以考虑天猪的版本 :https://github.com/ckken/angular-lazyload
我的版本只支持SEAjs
