var stream = require('stream');
var util = require('util');
var https = require('https');
var querystring = require('querystring');
var Forecast = require('../node_modules/forecast.io/');

util.inherits(Device,stream);

module.exports=Device;

function convertTimestamp(timestamp) {
	var d = new Date(timestamp*1000), // Convert to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getUTCHours() + data.offset,
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;
             
    if (hh > 24) {
		h = hh - 24;
	}
	
	if (hh > 12) {
        //h = hh - 12;
        ampm = 'PM';
    } 
	
	if (hh == 0) {
        h = 12;
    }
	
    time = h + ':' + min;
         
    return time;
	
}
	


function degToCompass(num) { 
	val= Math.round( (num -11.25 ) / 22.5 ) ;
	arr=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"] ;
	return arr[ val % 16 ] ;
}	

function moonphase(num) { 
	var moonphase_val = parseFloat(num);
	if (moonphase_val == 0) {
	moonphase = "New moon";
	}
	if (moonphase_val == 0.25) {
	moonphase = "First quarter moon";
	}
	if (moonphase_val == 0.50) {
	moonphase = "Full moon";
	}
	if (moonphase_val == 0.75) {
	moonphase = "Last quarter moon";
	}
	if (moonphase_val > 0.75) {
	moonphase = "Waning crescent";
	}
	if (moonphase_val < 0.75) {
	moonphase = "Waning gibbous";
	}
	if (moonphase_val < 0.50) {
	moonphase = "Waxing gibbous";
	}
	if (moonphase_val < 0.25) {
	moonphase = "Waxing crescent";
	}
	return moonphase;
}	

function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

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
	
    var NF_frequency = split_snapshot[5].slice(10);
	NF_frequency = NF_frequency*60000;
	
	this.NF_temp = split_snapshot[6].slice(5);
	this.NF_app_temp = split_snapshot[7].slice(9);
	this.NF_humidity = split_snapshot[8].slice(9);
	this.NF_wind_spd = split_snapshot[9].slice(9);
	this.NF_wind_dir = split_snapshot[10].slice(9);
	this.NF_precip_prob = split_snapshot[11].slice(12);
	this.NF_precip_int = split_snapshot[12].slice(11);
	this.NF_precip_type = split_snapshot[13].slice(12);
	this.NF_dewpoint = split_snapshot[14].slice(9);
	this.NF_pressure = split_snapshot[15].slice(9);
	this.NF_current = split_snapshot[16].slice(8);
	this.NF_day_summ = split_snapshot[17].slice(9);
	this.NF_icon = split_snapshot[18].slice(5);
	this.NF_visibility = split_snapshot[19].slice(11);
	this.NF_cloudCover = split_snapshot[20].slice(11);
	this.NF_ozone = split_snapshot[21].slice(6);
	this.NF_tonightTemperatureMin = split_snapshot[22].slice(22);
	this.NF_todayTemperatureMax = split_snapshot[23].slice(20);
	this.NF_tmwTemperatureMax = split_snapshot[24].slice(18);
	this.NF_precipAccumulation = split_snapshot[25].slice(19);
	this.NF_tmwprecipAccumulation = split_snapshot[26].slice(22);
	this.NF_sunsetTime = split_snapshot[27].slice(11);
	this.NF_sunriseTime = split_snapshot[28].slice(12);
	this.NF_alerts = split_snapshot[29].slice(7);
	this.NF_nearestStormDistance = split_snapshot[30].slice(21);
	this.NF_nearestStormBearing = split_snapshot[31].slice(20);
	this.NF_moonPhase = split_snapshot[32].slice(10);
	this.NF_temperatureMinTime = split_snapshot[33].slice(19);
	this.NF_temperatureMaxTime = split_snapshot[34].slice(19);
	this.NF_tmwTemperatureMaxTime = split_snapshot[35].slice(22);
	this.NF_nextHourTemperature = split_snapshot[36].slice(20);
	this.NF_nextHourApparentTemperature = split_snapshot[37].slice(28);
	this.NF_nextHourPrecipProbability = split_snapshot[38].slice(26);
	this.NF_nextHourPrecipIntensity = split_snapshot[39].slice(24);
	this.NF_tmwPrecipIntensityMax = split_snapshot[40].slice(22);
	this.NF_tmwPrecipIntensityMaxTime = split_snapshot[41].slice(26);
	this.NF_apparentTemperatureMax = split_snapshot[42].slice(23);
	this.NF_apparentTemperatureMaxTime = split_snapshot[43].slice(27);
	this.NF_apparentTemperatureMin = split_snapshot[44].slice(23);
	this.NF_apparentTemperatureMinTime = split_snapshot[45].slice(27);
	
	process.nextTick(function() {
		updateDevices(snapshot_url, function() {
			var split_snapshot = snapshot_url.split("=:=");
			this.NF_temp = split_snapshot[6].slice(5);
			this.NF_app_temp = split_snapshot[7].slice(9);
			this.NF_humidity = split_snapshot[8].slice(9);
			this.NF_wind_spd = split_snapshot[9].slice(9);
			this.NF_wind_dir = split_snapshot[10].slice(9);
			this.NF_precip_prob = split_snapshot[11].slice(12);
			this.NF_precip_int = split_snapshot[12].slice(11);
			this.NF_precip_type = split_snapshot[13].slice(12);
			this.NF_dewpoint = split_snapshot[14].slice(9);
			this.NF_pressure = split_snapshot[15].slice(9);
			this.NF_current = split_snapshot[16].slice(8);
			this.NF_day_summ = split_snapshot[17].slice(9);
			this.NF_icon = split_snapshot[18].slice(5);
			this.NF_visibility = split_snapshot[19].slice(11);
			this.NF_cloudCover = split_snapshot[20].slice(11);
			this.NF_ozone = split_snapshot[21].slice(6);
			this.NF_tonightTemperatureMin = split_snapshot[22].slice(22);
			this.NF_todayTemperatureMax = split_snapshot[23].slice(20);
			this.NF_tmwTemperatureMax = split_snapshot[24].slice(18);
			this.NF_precipAccumulation = split_snapshot[25].slice(19);
			this.NF_tmwprecipAccumulation = split_snapshot[26].slice(22);
			this.NF_sunsetTime = split_snapshot[27].slice(11);
			this.NF_sunriseTime = split_snapshot[28].slice(12);
			this.NF_alerts = split_snapshot[29].slice(7);
			this.NF_nearestStormDistance = split_snapshot[30].slice(21);
			this.NF_nearestStormBearing = split_snapshot[31].slice(20);
			this.NF_moonPhase = split_snapshot[32].slice(10);
			this.NF_temperatureMinTime = split_snapshot[33].slice(19);
			this.NF_temperatureMaxTime = split_snapshot[34].slice(19);
			this.NF_tmwTemperatureMaxTime = split_snapshot[35].slice(22);
			this.NF_nextHourTemperature = split_snapshot[36].slice(20);
			this.NF_nextHourApparentTemperature = split_snapshot[37].slice(28);
			this.NF_nextHourPrecipProbability = split_snapshot[38].slice(26);
			this.NF_nextHourPrecipIntensity = split_snapshot[39].slice(24);
			this.NF_tmwPrecipIntensityMax = split_snapshot[40].slice(22);
			this.NF_tmwPrecipIntensityMaxTime = split_snapshot[41].slice(26);
			this.NF_apparentTemperatureMax = split_snapshot[42].slice(23);
			this.NF_apparentTemperatureMaxTime = split_snapshot[43].slice(27);
			this.NF_apparentTemperatureMin = split_snapshot[44].slice(23);
			this.NF_apparentTemperatureMinTime = split_snapshot[45].slice(27);
			
			var myDate = new Date();
			console.log(myDate+" - Forecast: Initial data call");
	
			if (NF_temp == "yes") {
				self.devices.temperature.emit('data',data.currently.temperature);
			}
	
			if (NF_app_temp == "yes") {
				self.devices.apparentTemperature.emit('data',data.currently.apparentTemperature);
			}
	
			if (NF_humidity == "yes") {
				var myhumidity = data.currently.humidity *100;
				self.devices.humidity.emit('data',myhumidity);
			}

			if (NF_wind_spd == "yes") {
				self.devices.windSpeed.emit('data',data.currently.windSpeed);
			}
	
			if (NF_wind_dir == "yes") {
				if (data.currently.windSpeed !== '0') { 
					self.devices.windBearing.emit('data',degToCompass(data.currently.windBearing));
				}
				else {
					self.devices.windBearing.emit('data','N/A');
				}
			}
	
			if (NF_precip_prob == "yes") {
				var precip = data.currently.precipProbability *100;
				self.devices.precipProbability.emit('data',precip);
			}
	
			if (NF_precip_int == "yes") {
				self.devices.precipIntensity.emit('data',data.currently.precipIntensity);
			}
	
			if (data.currently.precipIntensity == "0") { 
				self.devices.precipType.emit('data',"N/A");
			}
			else {
				self.devices.precipType.emit('data',capitaliseFirstLetter(data.currently.precipType));
			}
	
			if (NF_dewpoint == "yes") {
				self.devices.dewPoint.emit('data',data.currently.dewPoint);
			}

			if (NF_pressure == "yes") {
				self.devices.pressure.emit('data',data.currently.pressure);
			}
	
			if (NF_current == "yes") {
				self.devices.summary.emit('data',data.currently.summary);
			}
	
			if (NF_day_summ == "yes") {
				self.devices.daysummary.emit('data',data.hourly.summary);
			}
	
			if (NF_icon == "yes") {
				self.devices.icon.emit('data',data.currently.icon);	
			}
			
			if (NF_visibility == "yes") {
				self.devices.visibility.emit('data',data.currently.visibility);	
			}
			
			if (NF_cloudCover == "yes") {
				self.devices.cloudCover.emit('data',data.currently.cloudCover);	
			}
			
			if (NF_ozone == "yes") {
				self.devices.ozone.emit('data',data.currently.ozone);	
			}
			
			if (NF_tonightTemperatureMin == "yes") {
				self.devices.tonightTemperatureMin.emit('data',data.daily.data[1].temperatureMin);	
			}
			
			if (NF_todayTemperatureMax == "yes") {
				self.devices.todayTemperatureMax.emit('data',data.daily.data[0].temperatureMax);	
			}
			
			if (NF_tmwTemperatureMax == "yes") {
				self.devices.tmwTemperatureMax.emit('data',data.daily.data[1].temperatureMax);	
			}
			
			if (NF_precipAccumulation == "yes") {
				self.devices.precipAccumulation.emit('data',data.daily.data[0].precipAccumulation);	
			}
			
			if (NF_tmwprecipAccumulation == "yes") {
				self.devices.tmwprecipAccumulation.emit('data',data.daily.data[1].precipAccumulation);	
			}
			
			if (NF_sunsetTime == "yes") {
				self.devices.sunsetTime.emit('data',convertTimestamp(data.daily.data[0].sunsetTime));	
			}
			
			if (NF_sunriseTime == "yes") {
				self.devices.sunriseTime.emit('data',convertTimestamp(data.daily.data[1].sunriseTime));	
			}
			
			if (NF_alerts == "yes") {
				if (data.alerts) { 
				self.devices.alerts.emit('data',data.alerts.data[0].title);	
				}
				else {
				self.devices.alerts.emit('data',"No current alerts");	
				}
			}
			
			if (NF_nearestStormDistance == "yes") {
				self.devices.nearestStormDistance.emit('data',data.currently.nearestStormDistance);	
			}
	
			if (NF_nearestStormBearing == "yes") {
				if (data.currently.nearestStormDistance) {
					if (data.currently.nearestStormDistance !== '0') { 
						self.devices.nearestStormBearing.emit('data',degToCompass(data.currently.nearestStormBearing));
					}
					else {
					self.devices.nearestStormBearing.emit('data','N/A');
					}	
				}
				else {
					self.devices.nearestStormBearing.emit('data','N/A');
				}	
			}
			
			if (NF_moonPhase == "yes") {
				self.devices.moonPhase.emit('data',moonphase(data.daily.data[1].moonPhase));	
			}
			
			if (NF_temperatureMinTime == "yes") {
				self.devices.temperatureMinTime.emit('data',convertTimestamp(data.daily.data[0].temperatureMinTime));	
			}
			
			if (NF_temperatureMaxTime == "yes") {
				self.devices.temperatureMaxTime.emit('data',convertTimestamp(data.daily.data[0].temperatureMaxTime));	
			}
			
			if (NF_tmwTemperatureMaxTime == "yes") {
				self.devices.tmwTemperatureMaxTime.emit('data',convertTimestamp(data.daily.data[1].temperatureMaxTime));	
			}
			
			if (NF_nextHourTemperature == "yes") {
				self.devices.nextHourTemperature.emit('data',data.hourly.data[1].temperature);	
			}
			
			if (NF_nextHourApparentTemperature == "yes") {
				self.devices.nextHourApparentTemperature.emit('data',data.hourly.data[1].apparentTemperature);	
			}
			
			if (NF_nextHourPrecipProbability == "yes") {
				self.devices.nextHourPrecipProbability.emit('data',data.hourly.data[1].precipProbability);	
			}
			
			if (NF_nextHourPrecipIntensity == "yes") {
				self.devices.nextHourPrecipIntensity.emit('data',data.hourly.data[1].precipIntensity);	
			}
			
			if (NF_tmwPrecipIntensityMax == "yes") {
				self.devices.tmwPrecipIntensityMax.emit('data',data.daily.data[1].precipIntensityMax);	
			}
			
			if (NF_tmwPrecipIntensityMaxTime == "yes") {
				self.devices.tmwPrecipIntensityMaxTime.emit('data',convertTimestamp(data.daily.data[1].precipIntensityMaxTime));	
			}
			
			if (NF_apparentTemperatureMax == "yes") {
				self.devices.apparentTemperatureMax.emit('data',data.daily.data[0].apparentTemperatureMax);	
			}
			
			if (NF_apparentTemperatureMaxTime == "yes") {
				self.devices.apparentTemperatureMaxTime.emit('data',convertTimestamp(data.daily.data[0].apparentTemperatureMaxTime));	
			}
			
			if (NF_apparentTemperatureMin == "yes") {
				self.devices.apparentTemperatureMin.emit('data',data.daily.data[1].apparentTemperatureMin);	
			}
			
			if (NF_apparentTemperatureMinTime == "yes") {
				self.devices.apparentTemperatureMinTime.emit('data',convertTimestamp(data.daily.data[1].apparentTemperatureMinTime));	
			}
		});
	
	upTimer = setInterval(function() {
		updateDevices(snapshot_url, function() {
			var myDate = new Date();
			console.log(myDate+" - Forecast: Scheduled data call");
			
			if (NF_temp == "yes") {
				self.devices.temperature.emit('data',data.currently.temperature);
			}
	
			if (NF_app_temp == "yes") {
				self.devices.apparentTemperature.emit('data',data.currently.apparentTemperature);
			}
	
			if (NF_humidity == "yes") {
				var myhumidity = data.currently.humidity *100;
				self.devices.humidity.emit('data',myhumidity);
			}

			if (NF_wind_spd == "yes") {
				self.devices.windSpeed.emit('data',data.currently.windSpeed);
			}
	
			if (NF_wind_dir == "yes") {
				if (data.currently.windSpeed !== '0') { 
					self.devices.windBearing.emit('data',degToCompass(data.currently.windBearing));
				}
				else {
					self.devices.windBearing.emit('data','N/A');
				}
			}
	
			if (NF_precip_prob == "yes") {
				var precip = data.currently.precipProbability *100;
				self.devices.precipProbability.emit('data',precip);
			}
	
			if (NF_precip_int == "yes") {
				self.devices.precipIntensity.emit('data',data.currently.precipIntensity);
			}
	
			if (data.currently.precipIntensity == "0") { 
				self.devices.precipType.emit('data',"N/A");
			}
			else {
				self.devices.precipType.emit('data',capitaliseFirstLetter(data.currently.precipType));
			}
	
			if (NF_dewpoint == "yes") {
				self.devices.dewPoint.emit('data',data.currently.dewPoint);
			}

			if (NF_pressure == "yes") {
				self.devices.pressure.emit('data',data.currently.pressure);
			}
	
			if (NF_current == "yes") {
				self.devices.summary.emit('data',data.currently.summary);
			}
	
			if (NF_day_summ == "yes") {
				self.devices.daysummary.emit('data',data.hourly.summary);
			}
	
			if (NF_icon == "yes") {
				self.devices.icon.emit('data',data.currently.icon);	
			}
			
			if (NF_visibility == "yes") {
				self.devices.visibility.emit('data',data.currently.visibility);	
			}
			
			if (NF_cloudCover == "yes") {
				self.devices.cloudCover.emit('data',data.currently.cloudCover);	
			}
			
			if (NF_ozone == "yes") {
				self.devices.ozone.emit('data',data.currently.ozone);	
			}
			
			if (NF_tonightTemperatureMin == "yes") {
				self.devices.tonightTemperatureMin.emit('data',data.daily.data[1].temperatureMin);	
			}
			
			if (NF_todayTemperatureMax == "yes") {
				self.devices.todayTemperatureMax.emit('data',data.daily.data[0].temperatureMax);	
			}
			
			if (NF_tmwTemperatureMax == "yes") {
				self.devices.tmwTemperatureMax.emit('data',data.daily.data[1].temperatureMax);	
			}
			
			if (NF_precipAccumulation == "yes") {
				self.devices.precipAccumulation.emit('data',data.daily.data[0].precipAccumulation);	
			}
			
			if (NF_tmwprecipAccumulation == "yes") {
				self.devices.tmwprecipAccumulation.emit('data',data.daily.data[1].precipAccumulation);	
			}
			
			if (NF_sunsetTime == "yes") {
				self.devices.sunsetTime.emit('data',convertTimestamp(data.daily.data[0].sunsetTime));	
			}
			
			if (NF_sunriseTime == "yes") {
				self.devices.sunriseTime.emit('data',convertTimestamp(data.daily.data[1].sunriseTime));	
			}
			
			if (NF_alerts == "yes") {
				if (data.alerts) { 
				self.devices.alerts.emit('data',data.alerts.data[0].title);	
				}
				else {
				self.devices.alerts.emit('data',"No current alerts");	
				}
			}
			
			if (NF_nearestStormDistance == "yes") {
				self.devices.nearestStormDistance.emit('data',data.currently.nearestStormDistance);	
			}
	
			if (NF_nearestStormBearing == "yes") {
				if (data.currently.nearestStormDistance) {
					if (data.currently.nearestStormDistance !== '0') { 
						self.devices.nearestStormBearing.emit('data',degToCompass(data.currently.nearestStormBearing));
					}
					else {
					self.devices.nearestStormBearing.emit('data','N/A');
					}	
				}
				else {
					self.devices.nearestStormBearing.emit('data','N/A');
				}	
			}
			
			if (NF_moonPhase == "yes") {
				self.devices.moonPhase.emit('data',moonphase(data.daily.data[1].moonPhase));	
			}
			
			if (NF_temperatureMinTime == "yes") {
				self.devices.temperatureMinTime.emit('data',convertTimestamp(data.daily.data[0].temperatureMinTime));	
			}
			
			if (NF_temperatureMaxTime == "yes") {
				self.devices.temperatureMaxTime.emit('data',convertTimestamp(data.daily.data[0].temperatureMaxTime));	
			}
			
			if (NF_tmwTemperatureMaxTime == "yes") {
				self.devices.tmwTemperatureMaxTime.emit('data',convertTimestamp(data.daily.data[1].temperatureMaxTime));	
			}
			
			if (NF_nextHourTemperature == "yes") {
				self.devices.nextHourTemperature.emit('data',data.hourly.data[1].temperature);	
			}
			
			if (NF_nextHourApparentTemperature == "yes") {
				self.devices.nextHourApparentTemperature.emit('data',data.hourly.data[1].apparentTemperature);	
			}
			
			if (NF_nextHourPrecipProbability == "yes") {
				self.devices.nextHourPrecipProbability.emit('data',data.hourly.data[1].precipProbability);	
			}
			
			if (NF_nextHourPrecipIntensity == "yes") {
				self.devices.nextHourPrecipIntensity.emit('data',data.hourly.data[1].precipIntensity);	
			}
			
			if (NF_tmwPrecipIntensityMax == "yes") {
				self.devices.tmwPrecipIntensityMax.emit('data',data.daily.data[1].precipIntensityMax);	
			}
			
			if (NF_tmwPrecipIntensityMaxTime == "yes") {
				self.devices.tmwPrecipIntensityMaxTime.emit('data',convertTimestamp(data.daily.data[1].precipIntensityMaxTime));	
			}
			
			if (NF_apparentTemperatureMax == "yes") {
				self.devices.apparentTemperatureMax.emit('data',data.daily.data[0].apparentTemperatureMax);	
			}
			
			if (NF_apparentTemperatureMaxTime == "yes") {
				self.devices.apparentTemperatureMaxTime.emit('data',convertTimestamp(data.daily.data[0].apparentTemperatureMaxTime));	
			}
			
			if (NF_apparentTemperatureMin == "yes") {
				self.devices.apparentTemperatureMin.emit('data',data.daily.data[1].apparentTemperatureMin);	
			}
			
			if (NF_apparentTemperatureMinTime == "yes") {
				self.devices.apparentTemperatureMinTime.emit('data',convertTimestamp(data.daily.data[1].apparentTemperatureMinTime));	
			}
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
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 23;
		this.G = 'windBearing';
		this.name = "Forecast.io - Wind Direction";
	}

	util.inherits(windBearing, stream);

	function precipIntensity() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'precipIntensity';
		this.name = "Forecast.io - Precipitation Intensity";
	}

	util.inherits(precipIntensity, stream);
  
    function precipProbability() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 21;
		this.G = 'precipProbability';
		this.name = "Forecast.io - Precipitation Probability";
	}

	util.inherits(precipProbability, stream);
  
    function precipType() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 23;
		this.G = 'precipType';
		this.name = "Forecast.io - Precipitation Type";
	}

	util.inherits(precipType, stream);

	function pressure() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'pressure';
		this.name = "Forecast.io - Barometric Pressure";
	}

	util.inherits(pressure, stream);
  
    function dewPoint() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 20;
		this.G = 'dewPoint';
		this.name = "Forecast.io - Dew Point";
	}

	util.inherits(dewPoint, stream);
  
	function summary() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 23;
		this.G = 'summary';
		this.name = "Forecast.io - Next Hour Summary";
	}

	util.inherits(summary, stream);
  
    function daysummary() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 23;
		this.G = 'daysummary';
		this.name = "Forecast.io - Next Day Summary";
	}

	util.inherits(daysummary, stream);
  
    function icon() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 23;
		this.G = 'icon';
		this.name = "Forecast.io - Icon";
	}

	util.inherits(icon, stream);
  
	function visibility() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'visibility';
		this.name = "Forecast.io - Visibility";
	}
	util.inherits(visibility, stream);
	
	function cloudCover() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'cloudCover';
		this.name = "Forecast.io - Cloud Cover";
	}
	util.inherits(cloudCover, stream);
	
	function ozone() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'ozone';
		this.name = "Forecast.io - Ozone";
	}
	util.inherits(ozone, stream);
	
	function tonightTemperatureMin() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'tonightTemperatureMin';
		this.name = "Forecast.io - Tonight's minimum";
	}
	util.inherits(tonightTemperatureMin, stream);
	
	function todayTemperatureMax() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'todayTemperatureMax';
		this.name = "Forecast.io - Today's maximum";
	}
	util.inherits(todayTemperatureMax, stream);

	function tmwTemperatureMax() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'tmwTemperatureMax';
		this.name = "Forecast.io - Tomorrow's maximum";
	}
	util.inherits(tmwTemperatureMax, stream);
	
	function precipAccumulation() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'precipAccumulation';
		this.name = "Forecast.io - Snow accumulation";
	}
	util.inherits(precipAccumulation, stream);
	
	function tmwprecipAccumulation() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'tmwprecipAccumulation';
		this.name = "Forecast.io - Tomorrow's Snow accumulation";
	}
	util.inherits(tmwprecipAccumulation, stream);
	
	function sunsetTime() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 9002;
		this.G = 'sunsetTime';
		this.name = "Forecast.io - Sunset";
	}
	util.inherits(sunsetTime, stream);
	
	function sunriseTime() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 9002;
		this.G = 'sunriseTime';
		this.name = "Forecast.io - Sunrise";
	}
	util.inherits(sunriseTime, stream);
	
	function alerts() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 23;
		this.G = 'alerts';
		this.name = "Forecast.io - Alerts";
	}
	util.inherits(alerts, stream);
	
	function nearestStormDistance() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'nearestStormDistance';
		this.name = "Forecast.io - Nearest storm distance";
	}
	util.inherits(nearestStormDistance, stream);
	
	function nearestStormBearing() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 23;
		this.G = 'nearestStormBearing';
		this.name = "Forecast.io - Nearest storm bearing";
	}
	util.inherits(nearestStormBearing, stream);
	
	function moonPhase() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 23;
		this.G = 'moonPhase';
		this.name = "Forecast.io - Moon phase";
	}
	util.inherits(moonPhase, stream);
	
	function temperatureMinTime() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 9002;
		this.G = 'temperatureMinTime';
		this.name = "Forecast.io - Tonight's minimum time";
	}
	util.inherits(temperatureMinTime, stream);
	
	function temperatureMaxTime() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 9002;
		this.G = 'temperatureMaxTime';
		this.name = "Forecast.io - Today's maximum time";
	}
	util.inherits(temperatureMaxTime, stream);
	
	function tmwTemperatureMaxTime() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 9002;
		this.G = 'tmwTemperatureMaxTime';
		this.name = "Forecast.io - Tomorrow's maximum time";
	}
	util.inherits(tmwTemperatureMaxTime, stream);

	function nextHourTemperature() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 20;
		this.G = 'nextHourTemperature';
		this.name = "Forecast.io - Next hour temperature";
	}
	util.inherits(nextHourTemperature, stream);
	
	function nextHourApparentTemperature() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 20;
		this.G = 'nextHourApparentTemperature';
		this.name = "Forecast.io - Next hour apparent temperature";
	}
	util.inherits(nextHourApparentTemperature, stream);
	
	function nextHourPrecipProbability() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 21;
		this.G = 'nextHourPrecipProbability';
		this.name = "Forecast.io - Next hour precipitation probability";
	}
	util.inherits(nextHourPrecipProbability, stream);
	
	function nextHourPrecipIntensity() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'nextHourPrecipIntensity';
		this.name = "Forecast.io - Next hour precipitation intensity";
	}
	util.inherits(nextHourPrecipIntensity, stream);
	
	function tmwPrecipIntensityMax() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 2000;
		this.G = 'tmwPrecipIntensityMax';
		this.name = "Forecast.io - Tomorrow precipitation intensity maximum";
	}
	util.inherits(tmwPrecipIntensityMax, stream);
	
	function tmwPrecipIntensityMaxTime() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 9002;
		this.G = 'tmwPrecipIntensityMaxTime';
		this.name = "Forecast.io - Tomorrow precipitation intensity maximum time";
	}
	util.inherits(tmwPrecipIntensityMaxTime, stream);
	
	function apparentTemperatureMax() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 20;
		this.G = 'apparentTemperatureMax';
		this.name = "Forecast.io - Apparent temperature maximum";
	}
	util.inherits(apparentTemperatureMax, stream);
	
	function apparentTemperatureMaxTime() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 9002;
		this.G = 'apparentTemperatureMaxTime';
		this.name = "Forecast.io - Apparent temperature maximum time";
	}
	util.inherits(apparentTemperatureMaxTime, stream);
	
	function apparentTemperatureMin() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 20;
		this.G = 'apparentTemperatureMin';
		this.name = "Forecast.io - Overnight apparent temperature minimum";
	}
	util.inherits(apparentTemperatureMin, stream);
	
	function apparentTemperatureMinTime() {
		this.readable = true;
		this.writeable = false;
		this.V = index;
		this.D = 9002;
		this.G = 'apparentTemperatureMinTime';
		this.name = "Forecast.io - Overnight apparent temperature minimum time";
	}
	util.inherits(apparentTemperatureMinTime, stream);
	
	this.devices = {};
  	if (this.NF_humidity == "yes") {
		this.devices.humidity = new humidity();
	};
	if (this.NF_wind_dir == "yes") {
		this.devices.windBearing = new windBearing();
	};
	if (this.NF_wind_spd == "yes") {
		this.devices.windSpeed = new windSpeed();
	};
	if (this.NF_temp == "yes") {
		this.devices.temperature = new temperature();
	};
	if (this.NF_app_temp == "yes") {
		this.devices.apparentTemperature = new apparentTemperature();
	};
	if (this.NF_precip_prob == "yes") {
		this.devices.precipProbability = new precipProbability();
	};
	if (this.NF_precip_int == "yes") {
		this.devices.precipIntensity = new precipIntensity();
	};
	if (this.NF_precip_type == "yes") {
		this.devices.precipType = new precipType();
	};
	if (this.NF_pressure == "yes") {
		this.devices.pressure = new pressure();
	};
	if (this.NF_dewpoint == "yes") {
		this.devices.dewPoint = new dewPoint();
	};
	if (this.NF_current == "yes") {
		this.devices.summary = new summary();
	};
	if (this.NF_day_summ == "yes") {
		this.devices.daysummary = new daysummary();
	};
	if (this.NF_icon == "yes") {
		this.devices.icon = new icon();
	};
	if (this.NF_visibility == "yes") {
		this.devices.visibility = new visibility();
	};
	if (this.NF_cloudCover == "yes") {
		this.devices.cloudCover = new cloudCover();
	};
	if (this.NF_ozone == "yes") {
		this.devices.ozone = new ozone();
	};
	if (this.NF_tonightTemperatureMin == "yes") {
		this.devices.tonightTemperatureMin = new tonightTemperatureMin();
	};
	if (this.NF_todayTemperatureMax == "yes") {
		this.devices.todayTemperatureMax = new todayTemperatureMax();
	};
	if (this.NF_tmwTemperatureMax == "yes") {
		this.devices.tmwTemperatureMax = new tmwTemperatureMax();
	};
	if (this.NF_precipAccumulation == "yes") {
		this.devices.precipAccumulation = new precipAccumulation();
	};
	if (this.NF_tmwprecipAccumulation == "yes") {
		this.devices.tmwprecipAccumulation = new tmwprecipAccumulation();
	};
	if (this.NF_sunsetTime == "yes") {
		this.devices.sunsetTime = new sunsetTime();
	};
	if (this.NF_sunriseTime == "yes") {
		this.devices.sunriseTime = new sunriseTime();
	};
	if (this.NF_alerts == "yes") {
		this.devices.alerts = new alerts();
	};
	if (this.NF_nearestStormDistance == "yes") {
		this.devices.nearestStormDistance = new nearestStormDistance();
	};
	if (this.NF_nearestStormBearing == "yes") {
		this.devices.nearestStormBearing = new nearestStormBearing();
	};
	if (this.NF_moonPhase == "yes") {
		this.devices.moonPhase = new moonPhase();
	};
	if (this.NF_temperatureMinTime == "yes") {
		this.devices.temperatureMinTime = new temperatureMinTime();
	};
	if (this.NF_temperatureMaxTime == "yes") {
		this.devices.temperatureMaxTime = new temperatureMaxTime();
	};
	if (this.NF_tmwTemperatureMaxTime == "yes") {
		this.devices.tmwTemperatureMaxTime = new tmwTemperatureMaxTime();
	};
	if (this.NF_nextHourTemperature == "yes") {
		this.devices.nextHourTemperature = new nextHourTemperature();
	};
	if (this.NF_nextHourApparentTemperature == "yes") {
		this.devices.nextHourApparentTemperature = new nextHourApparentTemperature();
	};
	if (this.NF_nextHourPrecipProbability == "yes") {
		this.devices.nextHourPrecipProbability = new nextHourPrecipProbability();
	};
	if (this.NF_nextHourPrecipIntensity == "yes") {
		this.devices.nextHourPrecipIntensity = new nextHourPrecipIntensity();
	};
	if (this.NF_tmwPrecipIntensityMax == "yes") {
		this.devices.tmwPrecipIntensityMax = new tmwPrecipIntensityMax();
	};
	if (this.NF_tmwPrecipIntensityMaxTime == "yes") {
		this.devices.tmwPrecipIntensityMaxTime = new tmwPrecipIntensityMaxTime();
	};
	if (this.NF_apparentTemperatureMax == "yes") {
		this.devices.apparentTemperatureMax = new apparentTemperatureMax();
	};
	if (this.NF_apparentTemperatureMaxTime == "yes") {
		this.devices.apparentTemperatureMaxTime = new apparentTemperatureMaxTime();
	};
	if (this.NF_apparentTemperatureMin == "yes") {
		this.devices.apparentTemperatureMin = new apparentTemperatureMin();
	};
	if (this.NF_apparentTemperatureMinTime == "yes") {
		this.devices.apparentTemperatureMinTime = new apparentTemperatureMinTime();
	};
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
		exclude: 'minutely,flags',
		//exclude: 'daily',
		units: this.NF_units
	};
  
	forecast.get(this.NF_latitude, this.NF_longitude, options, function (err, res, data) {
		var self = this;
		if (err) throw err;
		this.data = data;
		callback(data);
	});
};

/*function updateDevices_outlook(snapshot_url, callback) {	// runs every "updateInterval" seconds

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
		exclude: 'minutely,flags,hourly,alerts,currently',
		units: this.NF_units
	};
  
	forecast.get(this.NF_latitude, this.NF_longitude, options, function (err, res, data) {
		var self = this;
		if (err) throw err;
		this.data = data;
		callback(data);
	});
};*/

Device.prototype.write = function(dataRcvd) {
	//dummy
};
