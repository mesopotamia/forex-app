(function () {
    angular
        .module("forex")
        .controller("DashboardController", Dashboard);

    function Dashboard ($scope, $location, $localStorage) {
        if(!$localStorage["forex-token"]){
            $location.path("/signon");
        }
        var vm = this;
        vm.user = $localStorage.user;
    }
})();
