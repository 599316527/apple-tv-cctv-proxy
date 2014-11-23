/**
 * APPLE TV CCTV PROXY
 *
 * Kyle He (admin@hk1229.cn)
 * 2014-11-23 19:35:48
 */


var QueryString = require('querystring');

var param = {
    channel: 'pa://cctv_p2p_hd',
    client: 'html5'
};

var server = {
    hostname: 'vdn.live.cntv.cn',
    port: 80,
    path: '/api2/liveHtml5.do?',
    method: 'GET'
};

function getRequestOptions (channel) {
    var options = server;
    var querys = param;
    querys.channel += channel;
    options.path += QueryString.stringify(querys);
    return options;
}

exports.getRequestOptions = getRequestOptions;

exports.SERVER_PORT = 8002;

