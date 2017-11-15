var AWS = require('aws-sdk');
var httpResponse = require('./libs/httpResponse.js');

var ec2 = new AWS.EC2();

exports.handler = function (event, context, callback) {

    var body = JSON.parse(event.body);

    console.log(body)

    var params = {
        InstanceIds: [body.instanceId],
        DryRun: false
    };

    ec2.terminateInstances(params, function (err, data) {
        if (err) {
            console.log("Could not terminate instance" + body.instanceId, err);
            return
        }

        var responseBody = {
            status: "OK",
            input: event
        };

        httpResponse.sendHTTPOKResponse(responseBody, context, callback)
    });
}