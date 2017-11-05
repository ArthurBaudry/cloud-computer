var AWS = require('aws-sdk');

var ec2 = new AWS.EC2();

var params = {
    ImageId: 'ami-10fd7020',
    InstanceType: 't1.micro',
    MinCount: 1,
    MaxCount: 1
};

exports.handler = function(event, context) {

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
    });
}
