(function (){
    angular
        .module('forex')
        .controller('SignupController', Signup);

    function Signup ($scope, signup) {
        var vm = this;
        console.log('signup controller');
        $scope.signup = function () {
            console.log("signing up");

            signup.submit({firstName: vm.fname, lastName: vm.lname, email: vm.email, password: vm.password});
        }
    }
})();
