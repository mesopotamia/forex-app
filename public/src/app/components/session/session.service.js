(function () {
    angular
        .module("forex")
        .factory("session", sessionManager);

    function sessionManager ($http, $cookies, $localStorage) {
        var apiHost = "http://localhost:4000/auth/signin";
        var sessionData;

        var service = {
            getSession: getSession,
            setSession: setSession,
            authenticate: authenticate
        };

        return service;


        function getSession () {
            return sessionData
        }

        function setSession (data) {
            sessionData = data;
        }

        function authenticate (email, password) {
            if(sessionData){
                return sessionData;
            }

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
                data: { email: email, password: password}
            })
            .success(authenticationComplete).error(authenticationFailed);

            function authenticationComplete (response) {
                $localStorage.user = response.data;
                $cookies.put("forex-token", response.token);
                sessionData = response;
            }

            function authenticationFailed (error) {
                console.log(error);
            }

        }

    }
})();
