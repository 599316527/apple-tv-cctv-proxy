/**
 * APPLE TV CCTV PROXY
 *
 * Kyle He (admin@hk1229.cn)
 * 2014-11-23 19:10:45
 */


var Config = require('./config');
var Http = require('http');
var Emitter = require('./event-emitter').Event;


function getUrl (input) {
    var startString = ',"hls2":"';
    var startIndex = input.indexOf(startString) + startString.length;
    var endIndex = input.indexOf('"', startIndex);
    input = input.substring(startIndex, endIndex);
    return input;
}

var urlPattern = /^http:\/\//i;

function responseHandler (response) {
    response.setEncoding('utf8');
    var buffer = '';
    response.on('data', function(chunk) {
        buffer += chunk;
    });
    response.on('end', function() {
        var url = getUrl(buffer);
        if (urlPattern.test(url)) {
            Emitter.emit('URL_GOT', url);
        } else {
            Emitter.emit('ERROR', 500, 'Fail to fetch URL');
        }
    });
}

function requestErrorHandler (evt) {
    Emitter.emit('ERROR', 500, evt.message);
}


function fetch (channel) {
    var requestOptions = Config.getRequestOptions(channel);
    var request = Http.request(requestOptions, responseHandler);
    request.on('error', requestErrorHandler);
    request.end();
}

exports.fetch = fetch;

