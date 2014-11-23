/**
 * APPLE TV CCTV PROXY
 *
 * Kyle He (admin@hk1229.cn)
 * 2014-11-23 20:33:34
 */


var Config = require('./config');
var Url = require('url');
var Http = require('http');
var Emitter = require('./event-emitter').Event;


function getChannel (url) {
    var regex = /\/([^\.]+)\.mp4/i;
    var path = Url.parse(url).pathname;
    var ret = path.match(regex);
    return ret && ret[1];
}


function Server () {
    this._response;
    this._server;
}

Server.prototype.start = function (opt_port) {
    var port = opt_port || Config.SERVER_PORT;
    var me = this;
    var server = Http.createServer(
        function (request, response) {
            me._response = response;
            var channel = getChannel(request.url);
            if (channel) {
                Emitter.emit('REQUEST', channel);
            } else {
                Emitter.emit('REQUEST');
            }
        }
    );
    server.listen(port);
    console.log('Server runing at port: %d', port);
    this._server = server;
};

Server.prototype.output = function (code, type, data) {
    console.log(this.response);
    var response = this._response;
    response.writeHead(code, {
        'Content-Type': 'text/' + type
    });
    response.write(data);
    response.end();
};

Server.prototype.redirect = function (url) {
    var response = this._response;
    response.writeHead(302, {
        'Content-Type': 'text/plain',
        'Location': url
    });
    response.write('Redirecting...');
    response.end();
};

exports.Server = Server;


