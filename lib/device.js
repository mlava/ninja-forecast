var stream = require('stream');
var util = require('util');
var https = require('https');
var querystring = require('querystring');
var Forecast = require('./forecast/');

var current_temp = '';
var current_time = '';
var current_summary = '';
var current_icon = '';
var current_precipProbability = '';

//var data = "test";

util.inherits(Device,stream);

module.exports=Device;

function Device(snapshot_url,index,node,token,G) {

	var self = this;
	
	this.snapshot_url = snapshot_url;
	this.index = index;
	this.node = node;
	this.token = token;
	this.G = G;
  	
	this.snapshot_url = snapshot_url;
	
	var split_snapshot = snapshot_url.split("=:=");
    this.NF_name = split_snapshot[0].slice(5);
    this.NF_latitude = split_snapshot[1].slice(9);
	this.NF_longitude = split_snapshot[2].slice(10);
    this.NF_APIkey = split_snapshot[3].slice(7);
	this.NF_units = split_snapshot[4].slice(6);
	
	this.readable = true;
	this.writeable = true;
	
	this.G = G;
	this.V = 0;
	this.D = 2000;
	this.name = "forecast.io - "+this.NF_name;

	this._guid = [node,this.G,this.V,this.D].join('_');

	process.nextTick(function() {
	updateDevices(snapshot_url, function() {
	self.emit('data', data);
	});
	setInterval(function() {
				updateDevices(snapshot_url, function() {
					self.emit('data', data);
				});
			}, 180000);
  });
};

function updateDevices(snapshot_url, callback) {	// runs every "updateInterval" seconds

var self = this;

var split_snapshot = snapshot_url.split("=:=");
this.NF_name = split_snapshot[0].slice(5);
this.NF_latitude = split_snapshot[1].slice(9);
this.NF_longitude = split_snapshot[2].slice(10);
this.NF_APIkey = split_snapshot[3].slice(7);
this.NF_units = split_snapshot[4].slice(6);

var options = {
	APIKey: this.NF_APIkey,
	timeout: 3000
},
forecast = new Forecast(options);

var options = {
	exclude: 'minutely,daily,flags,alerts,hourly',
	units: this.NF_units
  };
  
forecast.get(this.NF_latitude, this.NF_longitude, options, function (err, res, data) {
  var self = this;
	if (err) throw err;
	this.data = data;
/*	current_temp = data.currently.temperature;
	current_time = data.currently.time;
	current_summary = data.currently.summary;
	current_icon = data.currently.icon;
	current_precipProbability = data.currently.precipProbability;
	current_humidity = data.currently.humidity;
	current_apparentTemperature = data.currently.apparentTemperature;
	current_dewPoint = data.currently.dewPoint;
	current_windSpeed = data.currently.windSpeed;
	current_windBearing = data.currently.windBearing;
	current_precipIntensity = data.currently.precipIntensity;
	current_cloudCover = data.currently.cloudCover;	
	*/
	//console.log(data);
	callback(data);
});
};



Device.prototype.write = function(dataRcvd) {
//dummy
};