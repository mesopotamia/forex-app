(function () {
    angular
        .module("forex")
        .controller("SignOn", SignOn );

    function SignOn ($scope, $http, $location, $cookies, session){
        var vm = this;

        $scope.submitThis = function () {
            session.authenticate(vm.email, vm.password).then(function(){
                $location.path("/dashboard");
            });
        }
    }
})();
