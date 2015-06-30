(function () {
    angular
        .module('forex')
        .factory('UsersService', UsersService);

    function UsersService ($resource, $localStorage) {
        return $resource('http://localhost:4000/api/user/:user', {user: '@user'}, {
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
                    responseError: {
                        // TODO implement error handling
                    }
                }
            },

        });
    };
})();
