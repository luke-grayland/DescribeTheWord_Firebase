const JsonResponse = (
    data = [],
    success = false,
    message = 'Error',
    status = 500
) => {
    return {
        "data": data,
        "success": success,
        "message": message,
        "status": status
    }
}

module.exports.JsonResponse = JsonResponse