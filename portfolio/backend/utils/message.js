exports.Message = (res,statuscode,success,message,data) =>{
    res.status(statuscode).json({
        success,
        message:message,
        data
    })
}