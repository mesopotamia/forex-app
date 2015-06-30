(function () {
    angular
        .module("forex")
        .controller("SignOnController", SignOn );

    function SignOn ($scope, $http, $location, $cookies, session, UsersService){
        var vm = this;

        $scope.submitThis = function () {
            UsersService.signin({ email: vm.email, password: vm.password}, function (response) {
                console.log(response);
                $location.path("/dashboard");
            });
        };
    };



})();
