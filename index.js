var Device = require('./lib/device')
  , util = require('util')
  , stream = require('stream')
  , configHandlers = require('./lib/config-handlers');

var upTimer;

util.inherits(driver,stream);

var HELLO_WORLD_ANNOUNCEMENT = {
  "contents": [
    { "type": "heading",      "text": "Forecast.io Driver Loaded" },
    { "type": "paragraph",    "text": "The Forecast.io driver has been loaded. Further configuration is required. ('Drivers', 'Configure')" }
  ]
};

function driver(opts,app) {

  var self = this;
  this._app = app;
  this._opts = opts;
this._devices = {};

	app.on('client::down',function(){ 
    clearInterval(upTimer);
	});
  
  app.on('client::up',function(){

    if (!opts.hasSentAnnouncement) {
      self.emit('announcement',HELLO_WORLD_ANNOUNCEMENT);
      opts.hasSentAnnouncement = true;
	  opts.current = [];
      self.save();
    }
	
	if (!opts.urls) {opts.urls = [];};
	
	self._opts.urls.forEach(function(url,index) {
		self.createCameraByUrl(url,index);
    });
  }.bind(this));
  	
};

driver.prototype.config = function(rpc,cb) {

  var self = this;

  if (!rpc) {
    return configHandlers.probe.call(this,cb);
  }

  switch (rpc.method) {
	case 'back':     			return configHandlers.probe.call(this,cb); break;
    case 'manual_set_url':      return configHandlers.manual_set_url.call(this,rpc.params,cb); break;
    case 'manual_get_url':      return configHandlers.manual_get_url.call(this,rpc.params,cb); break;
    case 'manual_show_remove':  return configHandlers.manual_show_remove.call(this,rpc.params,cb); break;
    case 'manual_remove_url':   return configHandlers.manual_remove_url.call(this,rpc.params,cb); break;
    default:                    return cb(true);                                              break;
  }
};

driver.prototype.createCameraByUrl = function(snapshot_url,index) {

  var self = this;
  var opts = snapshot_url;

  var device;
  if (self._devices.hasOwnProperty(opts)) {
    device = self._devices[opts];
  } else {
    device = new Device(opts,index);
    self._devices[opts] = device;
  }

  Object.keys(device.devices).forEach(function(opts) {
    self.emit('register', device.devices[opts]);
  });
};

module.exports = driver;
