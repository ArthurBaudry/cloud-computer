var assert = require('assert');
var sinon = require('sinon')

var AWS = require('aws-sdk');

var httpResponse = require('../libs/httpResponse.js');

// describe('sendHTTPOKResponse', function () {
//     it('', function () {
//         var context = sinon.spy(AWS.Context);
//
//         var responseBody = 'body'
//         var response = httpResponse.sendHTTPOKResponse(responseBody, context)
//
//         assert(context.calledOnce);
//
//         assert.equal('', response);
//     });
// });
