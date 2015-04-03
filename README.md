<h1>ngSea v0.6.1 beta</h1>

<h3>Ui-route + angular 1.3.*</h3>

- 同时支持 ui-route 以及 ng-route		
- 约定大于配置的原则 尽量减少代码量
- 修复 ui-route没 resolve会导致 进入ngsea模型不加载的问题

目前还在通过测试用例中 有兴趣的可以先测试
访问 ui.html 进行测试




<h3>IE8 + Angularjs 1.2.* + Seajs +ng-route</h3>
 DEMO http://wvovo.com/ngSea/index.1.2.7.html
 
angular 1.2.7 支持IE8+ 如需支持IE7 需要关闭 $sceProvider
 
<pre>
 angular.module('ie7support', []).config(function($sceProvider) {
        $sceProvider.enabled(false);
    });
    然后注入 ie7support
</pre>
 

<h3>IE6 + Angularjs 1.0.8 + Seajs</h3>
 
 DEMO :http://wvovo.com/ngSea/#/
 
 有任何问题请在这里留言:https://github.com/ckken/ngSea/issues/1



<h3>SeaJs配置</h3>
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
<h1>ngSea v0.6.1 beta</h1>

<h3>Ui-route + angular 1.3.*</h3>

- 同时支持 ui-route 以及 ng-route
- 约定大于配置的原则 尽量减少代码量
- 修复 ui-route没 resolve会导致 进入ngsea模型不加载的问题

目前还在通过测试用例中 有兴趣的可以先测试
访问 ui.html 进行测试




<h3>IE8 + Angularjs 1.2.* + Seajs +ng-route</h3>
 DEMO http://wvovo.com/ngSea/index.1.2.7.html

angular 1.2.7 支持IE8+ 如需支持IE7 需要关闭 $sceProvider

<pre>
 angular.module('ie7support', []).config(function($sceProvider) {
        $sceProvider.enabled(false);
    });
    然后注入 ie7support
</pre>


<h3>IE6 + Angularjs 1.0.8 + Seajs</h3>

 DEMO :http://wvovo.com/ngSea/#/

 有任何问题请在这里留言:https://github.com/ckken/ngSea/issues/1



<h3>SeaJs配置</h3>
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
