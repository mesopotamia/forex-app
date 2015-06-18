(function () {
    angular
        .module("forex")
        .factory("session", session);

    function session ($http, $cookies) {
        var session;

        var get = function () {
            return session;
        }

        var set = function (_session) {
            session = _session;
        }

        var getUser = function () {
            return session.data;
        }

        var authenticate = function (email, password) {
            if(session){
                return session;
            }

            return $http({
                method: 'POST',
                url: "http://localhost:3000/auth/signin",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                },
                data: { email: email, password: password}
            })
            .success(function(data){
                $cookies.put("forex-token", data.token);

                session = data;

                console.log(data);
            }).error(function(err){
                console.log(err);
            })
        }
        return {
            get: get,
            set: set,
            authenticate: authenticate
        }
    }
})();
