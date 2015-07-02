(function () {
    angular
        .module('forex')
        .factory('UsersService', UsersService);

    function UsersService ($resource, $localStorage, ENV) {
        return $resource(ENV.api+'user/:user', {user: '@user'}, {
            signin: {
                method: 'POST',
                interceptor: {
                    response: function (response) {

                        if(response.status == 200 && response.data.token){
                            // TODO clean up server response
                            $localStorage.user = response.data.data;
                            $localStorage["forex-token"] = response.data.token;
                        }
                        return response;
                    },
                    responseError: function (error) {
                        // TODO implement error handling
                        return error;
                    }
                }
            },

        });
    };
})();
