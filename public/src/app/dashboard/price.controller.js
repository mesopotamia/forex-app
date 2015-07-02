(function () {
    angular
        .module("forex")
        .controller("PriceController", Price);

    function Price ($scope, $location, $localStorage, PriceService) {
        var vm = this;

        activate();

        function activate() {
            PriceService.fetch({}, function (response) {
                vm.prices = response.data.data.prices;
                console.log(response);
            });
        };
    };
})();
