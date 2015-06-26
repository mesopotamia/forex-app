(function () {
    angular
        .module('forex')
        .factory('signup', Signup);

    function Signup ($http) {
        var apiHost = "http://localhost:4000/api/users/";

        return {
            submit: submit
        };

        function submit (payload) {

            return $http({
                method: 'POST',
                url: apiHost,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                },
                data: payload
            })
            .success(signupComplete).error(signupFailed);
        }

        function signupComplete (response) {
            $localStorage.user = response.data;
            $cookies.put("forex-token", response.token);
            sessionData = response;
        }

        function signupFailed (error) {
            console.log(error);
        }

    }
})();
