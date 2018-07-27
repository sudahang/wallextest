const request = require('request');
const resources = require('./resources');

function postPayment(env, payload, callback){
    var url = resources.urls[env] + '/bank';
    console.log(url);
    request.post(url, {json:payload},function(e, r, body) {
        if (e) {
            console.log(e, e.stack);
            callback(error || {statusCode: r.statusCode});
        }
        console.log(body);
        callback(null, r.statusCode, body);
    });
}

exports.postPayment = postPayment;