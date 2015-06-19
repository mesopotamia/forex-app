(function() {
  'use strict';

  angular
    .module('forex')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('signon', {
        url: '/signon',
        templateUrl: 'app/signon/signon.html',
        controller: 'SignOnController',
        controllerAs: 'vm'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/dashboard');
  }

})();
