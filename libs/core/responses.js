module.exports = {
    INVALID_TOKEN: {
        status: 401,
        message: 'Invalid token!'
    },
    NOT_ENTITLED: {
        status: 403,
        message: 'Not entitled to make this request!'
    },
    GLOBAL_ERROR: {
        status: 400,
        message: 'Error occured'
    }
};
