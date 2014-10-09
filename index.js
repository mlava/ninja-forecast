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
		self.save();
    }
	
	if (!opts.urls) {opts.urls = [];};
	/*if (!opts.name) {opts.name = [];};
	if (!opts.latitude) {opts.latitude = [];};
	if (!opts.longitude) {opts.longitude = [];};
	if (!opts.APIkey) {opts.APIkey = [];};
	if (!opts.units) {opts.units = [];};
	if (!opts.frequency) {opts.frequency = [];};
	if (!opts.temp) {opts.temp = [];};
	if (!opts.app_temp) {opts.app_temp = [];};
	if (!opts.humidity) {opts.humidity = [];};
	if (!opts.wind_spd) {opts.wind_spd = [];};
	if (!opts.wind_dir) {opts.wind_dir = [];};
	if (!opts.precip_prob) {opts.precip_prob = [];};
	if (!opts.precip_int) {opts.precip_int = [];};
	if (!opts.precip_type) {opts.precip_type = [];};
	if (!opts.dewpoint) {opts.dewpoint = [];};
	if (!opts.pressure) {opts.pressure = [];};
	if (!opts.current) {opts.current = [];};
	if (!opts.day_summ) {opts.day_summ = [];};
	if (!opts.icon) {opts.icon = [];};
	if (!opts.visibility) {opts.visibility = [];};
	if (!opts.cloudCover) {opts.cloudCover = [];};
	if (!opts.ozone) {opts.ozone = [];};
	if (!opts.tonightTemperatureMin) {opts.tonightTemperatureMin = [];};
	if (!opts.todayTemperatureMax) {opts.todayTemperatureMax = [];};
	if (!opts.tmwTemperatureMax) {opts.tmwTemperatureMax = [];};
	if (!opts.precipAccumulation) {opts.precipAccumulation = [];};
	if (!opts.tmwprecipAccumulation) {opts.tmwprecipAccumulation = [];};
	if (!opts.sunsetTime) {opts.sunsetTime = [];};
	if (!opts.sunriseTime) {opts.sunriseTime = [];};
	if (!opts.alerts) {opts.alerts = [];};
	if (!opts.nearestStormDistance) {opts.nearestStormDistance = [];};
	if (!opts.nearestStormBearing) {opts.nearestStormBearing = [];};
	if (!opts.moonPhase) {opts.moonPhase = [];};
	if (!opts.temperatureMinTime) {opts.temperatureMinTime = [];};
	if (!opts.temperatureMaxTime) {opts.temperatureMaxTime = [];};
	if (!opts.tmwTemperatureMaxTime) {opts.tmwTemperatureMaxTime = [];};
	if (!opts.nextHourTemperature) {opts.nextHourTemperature = [];};
	if (!opts.nextHourApparentTemperature) {opts.nextHourApparentTemperature = [];};
	if (!opts.nextHourPrecipProbability) {opts.nextHourPrecipProbability = [];};
	if (!opts.nextHourPrecipIntensity) {opts.nextHourPrecipIntensity = [];};
	if (!opts.tmwPrecipIntensityMax) {opts.tmwPrecipIntensityMax = [];};
	if (!opts.tmwPrecipIntensityMaxTime) {opts.tmwPrecipIntensityMaxTime = [];};
	if (!opts.apparentTemperatureMax) {opts.apparentTemperatureMax = [];};
	if (!opts.apparentTemperatureMaxTime) {opts.apparentTemperatureMaxTime = [];};
	if (!opts.apparentTemperatureMin) {opts.apparentTemperatureMin = [];};
	if (!opts.apparentTemperatureMinTime) {opts.apparentTemperatureMinTime = [];};*/
	
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

driver.prototype.createCameraByUrl = function(snapshot_url,index,opts) {

	var self = this;
	var opts = snapshot_url;

	var device;
	if (self._devices.hasOwnProperty(opts)) {
		device = self._devices[opts];
	} 	
	else {
		device = new Device(opts,index);
		self._devices[opts] = device;
	}

	Object.keys(device.devices).forEach(function(opts) {
		self.emit('register', device.devices[opts]);
	});
};

module.exports = driver;
