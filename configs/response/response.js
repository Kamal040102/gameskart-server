const successResponseMessage = (res, statusCode, message) => {
    return res.status(statusCode || 200).json({
        code: 1,
        message
    })
}

const successResponseData = (res, statusCode, data) => {
    return res.status(statusCode || 200).json({
        code: 1,
        data
    })
}

const failureResponseMessage = (res, statusCode, message, code) => {
    return res.status(statusCode).json({
        code: code || 2,
        message: message || "Internal Server Error."
    })
}

module.exports = {
    successResponseData, successResponseMessage, failureResponseMessage
}