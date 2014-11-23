/**
 * APPLE TV CCTV PROXY
 *
 * Kyle He (admin@hk1229.cn)
 * 2014-11-23 20:33:34
 */

var Emitter = require('./event-emitter').Event;
var fs = require('fs');

function convData2Html(data) {
    var html = '<!doctype html><html><head><title>Channels</title>';
    html += '<meta name="viewport" content="width=device-width">';
    html += '<link rel="stylesheet" type="text/css" href="https://hk1229.cn/demo/phoenixtv/static/css/common.css">';
    html += '</head><body><h1>Channels</h1><ul>';
    var rows = data.toString().split('\n');
    var cells, title, href;
    for (var i = 0; i < rows.length; i++) {
        cells = rows[i].split(/\s+/);
        if (cells.length !== 3) continue;
        title = cells[0];
        href = cells[1].substring(cells[1].lastIndexOf('/'));
        html += '<li><a href="' + href + '" target="_blank">' + title + '</a></li>';
    }
    html += '</ul></body></html>';
    return html;
}

function readFile () {
    fs.readFile(
        'channels.txt',
        {
            'encoding': 'utf-8',
            'flag': 'r'
        },
        function(err, data) {
            if (err) {
                Emitter.emit('ERROR', 500, err.message);
            } else {
                var html = convData2Html(data);
                Emitter.emit('HTML_OUTPUT', html);
            }
        }
    );
}

exports.show = readFile;
