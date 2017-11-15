var AWS = require('aws-sdk');
//var httpResponse = require('httpResponse');

var ec2 = new AWS.EC2();

exports.handler = function(event, context, callback) {

    var body = JSON.parse(event.body);

    console.log(body)

    var params = {
        ImageId: body.amiId,
        InstanceType: body.instanceType,
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
                Value: body.username
            }
        ]};
        ec2.createTags(params, function(err) {
            console.log("Tagging instance", err ? "failure" : "success");
        });

        //TODO Insert data for user in DB

        var responseBody = {
            status: "OK",
            input: event
        };

        httpResponse.sendHTTPOKResponse(responseBody, context)
    });
}