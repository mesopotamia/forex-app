module.exports = {
    send: function (res, responseObj) {
        res.status(responseObj.status).json({
            data: responseObj.message
        });
    }
};
