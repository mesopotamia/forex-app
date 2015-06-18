(function () {
    angular
        .module("forex")
        .controller("Dashboard", Dashboard);

    function Dashboard ($scope, $cookies, $location, session) {
        if(!$cookies.get("forex-token")){
            $location.path("/signon");
        }
        var vm = this;
        // vm.email = session.get().data.email;
    }
})();
