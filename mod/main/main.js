define(function (require, exports, module) {

module.exports = function(app){

  app.controller('main', ['$scope', '$stateParams', '$location', '$http',
    function($scope, $stateParams, $location, $http){

      $scope.main = 'this is the main view'
    }]
  )

}



});