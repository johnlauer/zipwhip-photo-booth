var photoBoothApp = angular.module('photoBoothApp', []);

photoBoothApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/start', {
        templateUrl: 'templates/start.html',
        controller: 'StartController'
      })
      .when('/phone', {
        templateUrl: 'templates/phone.html',
        controller: 'PhoneController'
      })
      .when('/display', {
        templateUrl: 'templates/display.html',
        controller: 'StartController'
      })
      .when('/booth/:phone', {
        templateUrl: 'templates/booth.html',
        controller: 'BoothController'
      })
      .when('/booth', {
        templateUrl: 'templates/booth.html',
        controller: 'BoothController'
      })
      .when('/final', {
        templateUrl: 'templates/final.html',
        controller: 'FinalController'
      })
      .when('/final/:phone', {
        templateUrl: 'templates/final.html',
        controller: 'FinalController'
      })
      .otherwise({
        redirectTo: '/start'
      });;
  }
]);


photoBoothApp.controller('StartController', function($scope, $routeParams) {
  $scope.totalFiles = totalFiles;
});
photoBoothApp.controller('PhoneController', function($scope, $routeParams) {

});
photoBoothApp.controller('BoothController', function($scope, $routeParams) {
  $scope.phone = $routeParams.phone;

});
photoBoothApp.controller('FinalController', function($scope, $routeParams) {
  $scope.url = window.url;
  $scope.phone = $routeParams.phone;
});
