module.exports = function () {
    return function (req, res, next) {

        var token;

        if(req.headers && req.headers.authorization){

            var parts = req.headers.authorization.split(' ');
            if(parts.length === 2 && parts[0] === 'Bearer'){
                token = parts[1];
            }
            if(token){
                // TODO logic for access-level
                next();
            }
            else{
                console.log('invalid token');
                deny();
            }
        }
        else{
            deny();
        }

        function deny () {
            res.status(403).end('cannot get in here!');
        }
    }

};
