(function () {
    angular
        .module("forex")
        .factory("session", sessionManager);

    function sessionManager ($http, $cookies) {
        var apiHost = "http://localhost:4000/auth/signin";

        var service = {
            getSession: getSession,
            setSession: setSession,
            authenticate: authenticate
        }

        return service;
        var sessionData;

        function getSession () {
            return sessionData
        };

        function setSession (data) {
            sessionData = data;
        };

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
                $cookies.put("forex-token", response.token)
                sessionData = response;
            };

            function authenticationFailed (error) {
                console.log(error);
            };

        };

    }
})();
