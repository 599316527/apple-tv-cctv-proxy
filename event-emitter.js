/**
 * APPLE TV CCTV PROXY
 *
 * Kyle He (admin@hk1229.cn)
 * 2014-11-23 20:06:35
 */

function Event () {
    this.events = {};
}

Event.prototype.on =
Event.prototype.bind =
Event.prototype.addListener = function (eventName, eventFunc) {
    if (!this.events[eventName]) {
        this.events[eventName] = [];
    }
    this.events[eventName].push(eventFunc);
    return this;
};

Event.prototype.off =
Event.prototype.unbind =
Event.prototype.removeListener = function (eventName, eventFunc) {
    if (!this.events[eventName]) {
        return this;
    }
    var index = this.events[eventName].indexOf(eventFunc);
    if (index >= 0) {
        this.events[eventName].splice(index, 1);
    }
    return this;
};

Event.prototype.emit =
Event.prototype.trigger = function (eventName, opt_args) {
    if (!this.events[eventName]) {
        return this;
    }
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1);
    this.events[eventName].forEach(function(eventFunc) {
        if (typeof eventFunc === 'function') {
            eventFunc.apply(me, args);
        }
    });
    return this;
};

exports.Event = new Event();


