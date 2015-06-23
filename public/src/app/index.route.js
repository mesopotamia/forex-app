(function() {
  'use strict';

  angular
    .module('forex')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
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
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/dashboard');
  }

})();
