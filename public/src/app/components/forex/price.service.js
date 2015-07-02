(function () {
    angular
        .module('forex')
        .factory('PriceService', PriceService);

    function PriceService ($resource, $localStorage, ENV) {
        return $resource(ENV.api+'prices?instruments=AUD_CAD%2CAUD_CHF', {instruments: '@instruments'}, {
            fetch: {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + $localStorage['forex-token']
                },
                interceptor: {
                    response: function (response) {

                        if(response.status == 200){
                            // TODO clean up server response
                            $localStorage.prices = response.data.data;
                        }
                        return response;
                    },
                    responseError: {
                        // TODO implement error handling
                    }
                }
            },

        });
    };
})();
