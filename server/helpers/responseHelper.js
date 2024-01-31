const responseSuccess = ( res, status, statusMessage, data ) => {
    return res.status(status).json({ isSucsess: true, status: statusMessage, result: data })
};

const responseError = ( res, status, statusMessage ) => {
    return res.status(status).json({ isSucsess: false, status: statusMessage })
};

module.exports = ({ responseSuccess, responseError})