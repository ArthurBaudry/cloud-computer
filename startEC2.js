var AWS = require('aws-sdk');

var ec2 = new AWS.EC2();

exports.handler = function(event, context, callback) {

    var params = {
        ImageId: event.amiId,
        InstanceType: event.instanceType,
        MinCount: 1,
        MaxCount: 1
    };

    // Create the instance
    ec2.runInstances(params, function(err, data) {
        if (err) {
            console.log("Could not create instance", err);
            return
        }
        var instanceId = data.Instances[0].InstanceId;
        console.log("Created instance", instanceId);
        // Add tags to the instance
        params = {Resources: [instanceId], Tags: [
            {
                Key: 'User',
                Value: event.username
            }
        ]};
        ec2.createTags(params, function(err) {
            console.log("Tagging instance", err ? "failure" : "success");
        });

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
            "X-CLOUD-COMPUTER-HEADER" : "HEADER"
        },
        body: JSON.stringify(responseBody)
    };

    console.log("response: " + JSON.stringify(response))

    callback(null, response);
}
