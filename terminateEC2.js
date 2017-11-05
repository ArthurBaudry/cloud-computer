var AWS = require('aws-sdk');

var ec2 = new AWS.EC2();

exports.handler = function (event, context, callback) {

    var params = {
        InstanceIds: [event.instanceId],
        DryRun: false
    };

    ec2.terminateInstances(params, function (err, data) {
        if (err) {
            console.log("Could not stop instance" + event.instanceId, err);
            return
        }

        var responseBody = {
            status: "OK",
            input: event
        };

        var responseBody = {
            status: "OK",
            input: event
        };

        sendHTTPOKResponse(responseBody, context, callback)
    });
}

function sendHTTPOKResponse(responseBody, context, callback) {
    var responseCode = 200;

    var response = {
        isBase64Encoded: false,
        statusCode: responseCode,
        headers: {
            "X-CLOUD-COMPUTER-HEADER": "HEADER"
        },
        body: JSON.stringify(responseBody)
    };

    console.log("response: " + JSON.stringify(response))

    callback(null, response);
}

function listEC2Instances(username, context) {
    var params = {
        DryRun: false,
        Filters: [{
            Name: username,
        }],
        MaxResults: 1
    };

    ec2.describeInstances(params, function (err, data) {
        if (err) {
            console.log("Could not list instances", err);
            return
        }

        console.log("Instance id found for username " + username + " is " + data.Reservations[0])

        return data.Reservations[0].Instances[0].InstanceId
    });
}