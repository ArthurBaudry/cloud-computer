
module.exports = function sendHTTPOKResponse(responseBody, context) {
    var responseCode = 200;

    var response = {
        isBase64Encoded: false,
        statusCode: responseCode,
        headers: {
            "X-CLOUD-COMPUTER-HEADER" : "HEADER"
        },
        body: JSON.stringify(responseBody)
    };

    console.log("response: " + JSON.stringify(response))

    context.succeed(response);
}
