(function () {
    angular.module("forex")
        .config(['$routeProvider', config]);

    function config ($routeProvider) {
        $routeProvider.
        when('/signon', {
            templateUrl: 'app/signon/signon.html',
            controller: 'SignOn',
            controllerAs: "vm"
        })
        .when("/dashboard", {
            templateUrl: "app/dashboard/dashboard.html",
            controller: "Dashboard",
            controllerAs: "vm"
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    }
})();
