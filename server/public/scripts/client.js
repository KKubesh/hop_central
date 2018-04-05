let app = angular.module('HopApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    console.log('Route config loaded');

    $routeProvider
    .when('/rabbits', {
      templateUrl: '/views/rabbits.html',
      controller: 'RabController as vm'
    })
    .when('/checkin', {
      templateUrl: '/views/checkin.html',
      controller: 'CheckController as vm'
    }).otherwise(
      { redirectTo: '/rabbits'} // any other route it will send it back to rabbits
    )
}]);