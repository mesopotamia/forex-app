(function () {
    angular
        .module("forex")
        .controller("DashboardController", Dashboard);

    function Dashboard ($scope, $cookies, $location, session) {
        if(!$cookies.get("forex-token")){
            $location.path("/signon");
        }
        var vm = this;
    }
})();
