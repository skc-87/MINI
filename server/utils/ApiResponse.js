class ApiResponse {
    constructor(
        statuscode,
        data,
        message = "Success"
    ) {
        this.statuscode = statuscode;
        this.data = data;
        this.message = message;
        this.success = true;
    }
}

module.exports = {
    ApiResponse
};