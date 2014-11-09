/**
 * APPLE TV CCTV PROXY
 *
 * Kyle He (admin@hk1229.cn)
 * 2014-11-09 19:09:27
 */

var http = require('http');
var qs = require('querystring');
var url = require('url');

const PORT = 8002;

function sendRequest(channel, callback) {

    var data = {
        channel: 'pa://cctv_p2p_hd' + channel,
        client: 'html5'
    };

    var content = qs.stringify(data);

    var options = {
        hostname: 'vdn.live.cntv.cn',
        port: 80,
        path: '/api2/liveHtml5.do?' + content,
        method: 'GET'
    };

    var req = http.request(options, function(res) {
        // console.log('STATUS: ' + res.statusCode);
        res.setEncoding('utf8');
        var buffer = '';
        res.on('data', function(chunk) {
            buffer += chunk;
        });
        res.on('end', function() {
            var url = getUrl(buffer);
            if (url.length < 100) {
                callback(false, 'No url');
            } else {
                console.log('url get: ' + url);
                callback(url);
            }
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        callback(false, e.message);
    });

    req.end();
}


function getUrl(input) {
    var startString = ',"hls2":"';
    var startIndex = input.indexOf(startString) + startString.length;
    var endIndex = input.indexOf('"', startIndex);
    input = input.substring(startIndex, endIndex);
    return input;
}

function serverHandler(request, response) {
    var query = url.parse(request.url).pathname;
    var ret = query.match(/\/([^\.]+)\.mp4/i);
    if (!ret || !ret[1]) {
        return ;
    }
    var channel = ret[1];

    sendRequest(channel, function(url, msg) {
        if (url) {
            response.writeHead(302, {
                'Location': url
            });
            response.write(url);
        } else {
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.write(msg);
        }
        response.end();
    });
};

var server = http.createServer(serverHandler);
server.listen(PORT);
console.log('Server runing at port: ' + PORT);



