var AWS = require('aws-sdk');
var httpResponse = require('httpResponse')

var apiGateway = new AWS.APIGateway();

exports.handler = function (event, context, callback) {

    var body = JSON.parse(event.body);

    console.log(body)

    var params = {
        description: 'API Key for user ' + body.username,
        enabled: true,
        generateDistinctId: true,
        name: 'API_KEY_' + body.username
    };

    apiGateway.createApiKey(params, function (err, data) {
        if (err) {
            console.log("Could not create API key for user " + body.username, err);
            return
        }

        var params = {
            keyId: data.id,
            keyType: "API_KEY",
            usagePlanId: body.usagePlanId
        };

        apiGateway.createUsagePlanKey(params, function (err, data) {
            if (err) {
                console.log("Could not associate API key for user " + body.username + " to plan id " + body.usagePlanId, err);
                return
            }

            var responseBody = {
                status: "OK",
                input: event
            };

            httpResponse.sendHTTPOKResponse(responseBody, context)
        });
    });
}