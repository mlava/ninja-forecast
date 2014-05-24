var stream = require('stream');
var util = require('util');
var https = require('https');
var querystring = require('querystring');
var Forecast = require('./forecast.io/');

var current_temp = '';
var current_time = '';
var current_summary = '';
var current_icon = '';
var current_precipProbability = '';

util.inherits(Device,stream);

module.exports=Device;

function Device(snapshot_url,index,node,token,G) {

	var self = this;
	
	this.snapshot_url = snapshot_url;
	this.index = index;
	
	this.node = node;
	this.token = token;
	this.G = G;
	this.V = index;
	
	var index = index;
	
	this.snapshot_url = snapshot_url;
	
	var split_snapshot = snapshot_url.split("=:=");
    this.NF_name = split_snapshot[0].slice(5);
	var NF_name = this.NF_name;
	
    this.NF_latitude = split_snapshot[1].slice(9);
	this.NF_longitude = split_snapshot[2].slice(10);
    this.NF_APIkey = split_snapshot[3].slice(7);
	this.NF_units = split_snapshot[4].slice(6);
	
	var NF_frequency = split_snapshot[5].slice(10);
	NF_frequency = NF_frequency*60000;
	
	process.nextTick(function() {
	updateDevices(snapshot_url, function() {
	self.emit('data', data);
	var myhumidity = data.currently.humidity *100;
	self.devices.humidity.emit('data',myhumidity);
	self.devices.precipIntensity.emit('data',data.currently.precipIntensity);
	
	var precip = data.currently.precipProbability *100;
	self.devices.precipProbability.emit('data',precip);
	
	/*function capitaliseFirstLetter(string)
	{
    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	if (data.currently.precipIntensity !== '0') { 
	self.devices.precipType.emit('data',capitaliseFirstLetter(data.currently.precipType));
	}
	else {
	self.devices.precipType.emit('data','N/A');
	}
	*/
	
	self.devices.temperature.emit('data',data.currently.temperature);
	self.devices.apparentTemperature.emit('data',data.currently.apparentTemperature);
	self.devices.dewPoint.emit('data',data.currently.dewPoint);
	self.devices.windSpeed.emit('data',data.currently.windSpeed);
	
	function degToCompass(num) { 
    val= Math.round( (num -11.25 ) / 22.5 ) ;
    arr=["N","NNE","NE","ENE","E","ESE", "SE", 
          "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"] ;
    return arr[ val % 16 ] ;
	}

	if (data.currently.windSpeed !== '0') { 
	self.devices.windBearing.emit('data',degToCompass(data.currently.windBearing));
	}
	else {
	self.devices.windBearing.emit('data','N/A');
	}
	
	self.devices.pressure.emit('data',data.currently.pressure);
	self.devices.summary.emit('data',data.currently.summary);
	self.devices.daysummary.emit('data',data.hourly.summary);	
	console.log("ninja-forecast updated");
	//console.log(data);
	});
	setInterval(function() {
				updateDevices(snapshot_url, function() {
				self.emit('data', data);
				var myhumidity = data.currently.humidity *100;
				self.devices.humidity.emit('data',myhumidity);
				self.devices.precipIntensity.emit('data',data.currently.precipIntensity);
				/*function capitaliseFirstLetter(string)
				{
				return string.charAt(0).toUpperCase() + string.slice(1);
				}
				if (data.currently.precipIntensity !== '0') { 
				self.devices.precipType.emit('data',capitaliseFirstLetter(data.currently.precipType));
				}
				else {
				self.devices.precipType.emit('data','N/A');
				}
				*/
				self.devices.precipType.emit('data',data.currently.precipType);
				self.devices.temperature.emit('data',data.currently.temperature);
				self.devices.apparentTemperature.emit('data',data.currently.apparentTemperature);
				self.devices.dewPoint.emit('data',data.currently.dewPoint);
				self.devices.windSpeed.emit('data',data.currently.windSpeed);
				
				function degToCompass(num) { 
					val= Math.round( (num -11.25 ) / 22.5 ) ;
					arr=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"] ;
					return arr[ val % 16 ] ;
				}
				if (data.currently.windSpeed !== '0') { 
					self.devices.windBearing.emit('data',degToCompass(data.currently.windBearing));
				}
				else {
					self.devices.windBearing.emit('data','N/A');
				}
				self.devices.pressure.emit('data',data.currently.pressure);
				self.devices.summary.emit('data',data.currently.summary);
				self.devices.daysummary.emit('data',data.hourly.summary);
				console.log("ninja-forecast updated");
				});
			},NF_frequency);
  });
  
 function humidity() {

    this.readable = true;
    this.writeable = false;
    this.V = index;
    this.D = 21;
    this.G = 'humidity';
	this.name = "Forecast.io - Humidity";
  }

  util.inherits(humidity, stream);

  function windSpeed() {
    this.readable = true;
    this.writeable = false;
    this.V = index;
    this.D = 24;
    this.G = 'windSpeed';
	this.name = "Forecast.io - Wind Speed";
  }

  util.inherits(windSpeed, stream);

  function temperature() {
    this.readable = true;
    this.writeable = false;
    this.V = index;
    this.D = 20;
    this.G = 'temperature';
	this.name = "Forecast.io - Temperature";
  }

  util.inherits(temperature, stream);
  
    function apparentTemperature() {
    this.readable = true;
    this.writeable = false;
    this.V = index;
    this.D = 20;
    this.G = 'apparentTemperature';
	this.name = "Forecast.io - Apparent Temperature";
  }

  util.inherits(apparentTemperature, stream);

  function windBearing() {
    this.writeable = true;
    this.readable = false;
    this.V = index;
    this.D = 23;
    this.G = 'windBearing';
	this.name = "Forecast.io - Wind Direction";
  }

  util.inherits(windBearing, stream);

   function precipIntensity() {
    this.writeable = true;
    this.readable = false;
    this.V = index;
    this.D = 2000;
    this.G = 'precipIntensity';
	this.name = "Forecast.io - Precipitation Intensity";
  }

  util.inherits(precipIntensity, stream);
  
    function precipProbability() {
    this.writeable = true;
    this.readable = false;
    this.V = index;
    this.D = 21;
    this.G = 'precipProbability';
	this.name = "Forecast.io - Precipitation Probability";
  }

  util.inherits(precipProbability, stream);
  
      function precipType() {
    this.writeable = true;
    this.readable = false;
    this.V = index;
    this.D = 23;
    this.G = 'precipType';
	this.name = "Forecast.io - Precipitation Type";
  }

  util.inherits(precipType, stream);

    function pressure() {
    this.writeable = true;
    this.readable = false;
    this.V = index;
    this.D = 2000;
    this.G = 'pressure';
	this.name = "Forecast.io - Barometric Pressure";
  }

  util.inherits(pressure, stream);
  
    function dewPoint() {
    this.writeable = true;
    this.readable = false;
    this.V = index;
    this.D = 20;
    this.G = 'dewPoint';
	this.name = "Forecast.io - Dew Point";
  }

  util.inherits(dewPoint, stream);
  
   function summary() {
    this.writeable = true;
    this.readable = false;
    this.V = index;
    this.D = 23;
    this.G = 'summary';
	this.name = "Forecast.io - Next Hour Summary";
  }

  util.inherits(summary, stream);
  
    function daysummary() {
    this.writeable = true;
    this.readable = false;
    this.V = index;
    this.D = 23;
    this.G = 'daysummary';
	this.name = "Forecast.io - Next Day Summary";
  }

  util.inherits(daysummary, stream);
  
  this.devices = {
    humidity: new humidity(),
    windBearing: new windBearing(),
    windSpeed: new windSpeed(),
    temperature: new temperature(),
    precipIntensity: new precipIntensity(),
    precipProbability: new precipProbability(),
    precipType: new precipType(),
    apparentTemperature: new apparentTemperature(),
    pressure: new pressure(),
    dewPoint: new dewPoint(),
    summary: new summary(),
    daysummary: new daysummary()
  };
//console.log(this.devices);
  };

function updateDevices(snapshot_url, callback) {	// runs every "updateInterval" seconds

var self = this;

var split_snapshot = snapshot_url.split("=:=");
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
	exclude: 'minutely,flags,daily',
	units: this.NF_units
  };
  
forecast.get(this.NF_latitude, this.NF_longitude, options, function (err, res, data) {
  var self = this;
	if (err) throw err;
	this.data = data;
	callback(data);
});
};



Device.prototype.write = function(dataRcvd) {
//dummy
};