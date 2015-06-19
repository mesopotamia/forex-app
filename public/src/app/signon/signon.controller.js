(function () {
    angular
        .module("forex")
        .controller("SignOnController", SignOn );

    function SignOn ($scope, $http, $location, $cookies, session){
        var vm = this;

        $scope.submitThis = function () {
            session.authenticate(vm.email, vm.password).then(function(response){
                console.log(response);
                $location.path("/dashboard");
            });
        };
    }
})();
