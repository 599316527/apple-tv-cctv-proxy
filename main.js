/**
 * APPLE TV CCTV PROXY
 *
 * Kyle He (admin@hk1229.cn)
 * 2014-11-23 20:26:37
 */


var Server = require('./server').Server;
var Emitter = require('./event-emitter').Event;


var server = new Server();


Emitter.on('ERROR', function (code, msg) {
    console.log(code, msg);
    server.output(500, 'plain', msg);
});

Emitter.on('REQUEST', function (channel) {
    console.log((new Date()).toString());
    if (channel) {
        console.log(channel);
        var VideoUrl = require('./video-url');
        VideoUrl.fetch(channel);
    } else {
        console.log('Index');
        var ChannelList = require('./channel-list');
        ChannelList.show();
    }
});

Emitter.on('URL_GOT', function (url) {
    console.log(url);
    server.redirect(url);
});

Emitter.on('HTML_OUTPUT', function (data) {
    server.output(200, 'html', data);
});

server.start();

