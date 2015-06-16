(function(){
    "use strict";

angular.module("forex", ['ngRoute', 'ngCookies'])
    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/signon', {
            templateUrl: 'templates/partials/signon.html',
            controller: 'SignOnController'
        })
        .when("/dashboard", {
            templateUrl: "templates/partials/dashboard.html",
            controller: "DashboardController",
            controllerAs: "vm"
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    }])
    .controller("SignOnController", function ($scope, $http, $location, $cookies, session){

        $scope.submitThis = function () {
            $http({
                method: 'POST',
                url: "http://localhost:3000/auth/signin",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                },
                data: { email: $scope.email, password: $scope.password}
            })
            .success(function(data){
                $location.path("/dashboard");
                $cookies.put("forex-token", data.token);
                session.set(data);
                console.log(data);
            }).error(function(err){
                console.log(err);
            })
        }
    })
    .controller("DashboardController", function ($scope, $cookies, $location, session) {
        if(!$cookies.get("forex-token")){
            $location.path("/signon");
        }
        var vm = this;
        vm.email = session.get().data.email;
        // this.email = session.get().data.email;
        // $scope.email = session.get().data.email;
    })
    .factory("session", function () {

        var session = {};
        var get = function () {
            return session;
        }
        var set = function (_session) {
            session = _session;
        }
        return {
            get: get,
            set: set
        }
    })
})();
