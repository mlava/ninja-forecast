var stream = require('stream');
var util = require('util');
var https = require('https');
var querystring = require('querystring');
var Forecast = require('./forecast/');

util.inherits(Device,stream);

module.exports=Device;

function Device(snapshot_url,index,node,token,G) {

	var self = this;
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
	this.device = self;
	this._guid = [node,this.G,this.V,this.D].join('_');

	process.nextTick(function() {
    self.emit('data','');
	updateDevices(snapshot_url);
	setInterval(function() {
				updateDevices(snapshot_url);
			}, 300000);
  });
};

function updateDevices(snapshot_url) {	// runs every "updateInterval" seconds

var self = this;
	
var split_snapshot = snapshot_url.split("=:=");
this.NF_name = split_snapshot[0].slice(5);
this.NF_latitude = split_snapshot[1].slice(9);
this.NF_longitude = split_snapshot[2].slice(10);
this.NF_APIkey = split_snapshot[3].slice(7);
this.NF_units = split_snapshot[4].slice(6);
	
console.log("Updating weatherDriver Devices...");

var options = {
  APIKey: this.NF_APIkey,
  timeout: 1500
},
forecast = new Forecast(options);

var options = {
  exclude: 'minutely,hourly,daily,flags,alerts',
  units: this.NF_units
  };
  
forecast.get(this.NF_latitude, this.NF_longitude, options, function (err, res, data) {
  if (err) throw err;
  //console.log('res: ' + util.inspect(res));
  console.log('data: ' + util.inspect(data));
});
};

Device.prototype.write = function(dataRcvd) {
	var app = this._app;
	var opts = this.opts;
	console.log("weatherDriver Device " + this.name + " received data: " + dataRcvd);

		var stgSubmit = undefined;
		(this.config.setStg || []).forEach(function(fn) {
			try {
				stgSubmit = fn(apiKey, dataRcvd);
			} catch(e) {
				stgSubmit = undefined;
			}
		});
		console.log("weatherDriver string: " + stgSubmit);
		if (stgSubmit !== undefined) {
			console.log(this.name + " - submitting data to thermostat: " + stgSubmit);
			var rslt = exec(stgSubmit, function (error, stdout, stderr) {
				stdout.replace(/(\n|\r|\r\n)$/, '');
				console.log(this.name + " - Result: " + stdout);
				setTimeout( function() { updateDevices(app, opts) }, pauseAfterSetToUpdate);
			});
		}
		else {
			console.log(this.name + ' - error parsing data!');
		};		
};