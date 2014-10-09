var messages = require('./config-messages');

exports.probe = function(cb) {

  cb(null,messages.probeGreeting);
};

exports.manual_get_url = function(params,cb) {

  cb(null,messages.fetchIpModal);
};

exports.manual_set_url = function(params,cb) {

if (!params.name) {console.log("Ninja-forecast config error: no name entered"); return;}
if (!params.latitude) {console.log("Ninja-forecast config error: no latitude entered"); return;}
if (!params.longitude) {console.log("Ninja-forecast config error: no longitude entered"); return;}
if (!params.snapshot_url) {console.log("Ninja-forecast config error: no forecast.io API key entered"); return;}
if (!params.units) {console.log("Ninja-forecast config error: no units entered"); return;}

  var snapshot_url = "name:"+params.name+"=:=latitude:"+params.latitude+"=:=longitude:"+params.longitude+"=:=APIkey:"+params.snapshot_url+"=:=units:"+params.units+"=:=frequency:"+params.frequency+"=:=temp:"+params.temp+"=:=app_temp:"+params.app_temp+"=:=humidity:"+params.humidity+"=:=wind_spd:"+params.wind_spd+"=:=wind_dir:"+params.wind_dir+"=:=precip_prob:"+params.precip_prob+"=:=precip_int:"+params.precip_int+"=:=precip_type:"+params.precip_type+"=:=dewpoint:"+params.dewpoint+"=:=pressure:"+params.pressure+"=:=current:"+params.current+"=:=day_summ:"+params.day_summ+"=:=icon:"+params.icon+"=:=visibility:"+params.visibility+"=:=cloudCover:"+params.cloudCover+"=:=ozone:"+params.ozone+"=:=tonightTemperatureMin:"+params.tonightTemperatureMin+"=:=todayTemperatureMax:"+params.todayTemperatureMax+"=:=tmwTemperatureMax:"+params.tmwTemperatureMax+"=:=precipAccumulation:"+params.precipAccumulation+"=:=tmwprecipAccumulation:"+params.tmwprecipAccumulation+"=:=sunsetTime:"+params.sunsetTime+"=:=sunriseTime:"+params.sunriseTime+"=:=alerts:"+params.alerts+"=:=nearestStormDistance:"+params.nearestStormDistance+"=:=nearestStormBearing:"+params.nearestStormBearing+"=:=moonPhase:"+params.moonPhase+"=:=temperatureMinTime:"+params.temperatureMinTime+"=:=temperatureMaxTime:"+params.temperatureMaxTime+"=:=tmwTemperatureMaxTime:"+params.tmwTemperatureMaxTime+"=:=nextHourTemperature:"+params.nextHourTemperature+"=:=nextHourApparentTemperature:"+params.nextHourApparentTemperature+"=:=nextHourPrecipProbability:"+params.nextHourPrecipProbability+"=:=nextHourPrecipIntensity:"+params.nextHourPrecipIntensity+"=:=tmwPrecipIntensityMax:"+params.tmwPrecipIntensityMax+"=:=tmwPrecipIntensityMaxTime:"+params.tmwPrecipIntensityMaxTime+"=:=apparentTemperatureMax:"+params.apparentTemperatureMax+"=:=apparentTemperatureMaxTime:"+params.apparentTemperatureMaxTime+"=:=apparentTemperatureMin:"+params.apparentTemperatureMin+"=:=apparentTemperatureMinTime:"+params.apparentTemperatureMinTime;
  var indexa = this._opts.urls.indexOf(snapshot_url||'');
  
  /*this._opts.name.push(params.name);
  this._opts.latitude.push(params.latitude);
  this._opts.longitude.push(params.longitude);
  this._opts.APIkey.push(params.APIkey);
  this._opts.units.push(params.units);
  this._opts.frequency.push(params.frequency);
  this._opts.temp.push(params.temp);
  this._opts.app_temp.push(params.app_temp);
  this._opts.humidity.push(params.humidity);
  this._opts.wind_spd.push(params.wind_spd);
  this._opts.wind_dir.push(params.wind_dir);
  this._opts.precip_prob.push(params.precip_prob);
  this._opts.precip_int.push(params.precip_int);
  this._opts.precip_type.push(params.precip_type);
  this._opts.dewpoint.push(params.dewpoint);
  this._opts.pressure.push(params.pressure);
  this._opts.current.push(params.current);
  this._opts.day_summ.push(params.day_summ);
  this._opts.icon.push(params.icon);
  this._opts.visibility.push(params.visibility);
  this._opts.cloudCover.push(params.cloudCover);
  this._opts.ozone.push(params.ozone);
  this._opts.tonightTemperatureMin.push(params.tonightTemperatureMin);
  this._opts.todayTemperatureMax.push(params.todayTemperatureMax);
  this._opts.tmwTemperatureMax.push(params.tmwTemperatureMax);
  this._opts.precipAccumulation.push(params.precipAccumulation);
  this._opts.tmwprecipAccumulation.push(params.tmwprecipAccumulation);
  this._opts.sunsetTime.push(params.sunsetTime);
  this._opts.sunriseTime.push(params.sunriseTime);
  this._opts.alerts.push(params.alerts);
  this._opts.nearestStormDistance.push(params.nearestStormDistance);
  this._opts.nearestStormBearing.push(params.nearestStormBearing);
  this._opts.moonPhase.push(params.moonPhase);
  this._opts.temperatureMinTime.push(params.temperatureMinTime);
  this._opts.temperatureMaxTime.push(params.temperatureMaxTime);
  this._opts.tmwTemperatureMaxTime.push(params.tmwTemperatureMaxTime);
  this._opts.nextHourTemperature.push(params.nextHourTemperature);
  this._opts.nextHourApparentTemperature.push(params.nextHourApparentTemperature);
  this._opts.nextHourPrecipProbability.push(params.nextHourPrecipProbability);
  this._opts.nextHourPrecipIntensity.push(params.nextHourPrecipIntensity);
  this._opts.tmwPrecipIntensityMax.push(params.tmwPrecipIntensityMax);
  this._opts.tmwPrecipIntensityMaxTime.push(params.tmwPrecipIntensityMaxTime);
  this._opts.apparentTemperatureMax.push(params.apparentTemperatureMax);
  this._opts.apparentTemperatureMaxTime.push(params.apparentTemperatureMaxTime);
  this._opts.apparentTemperatureMin.push(params.apparentTemperatureMin);
  this._opts.apparentTemperatureMinTime.push(params.apparentTemperatureMinTime);*/
  
  if (indexa===-1) {
    this._opts.urls.push(snapshot_url);
    this.save();
	var index = this._opts.urls.indexOf(snapshot_url||'');
	this.createCameraByUrl(snapshot_url,index);
  }

  cb(null,messages.finish);
};

exports.manual_show_remove = function(params,cb) {

  var toShow = messages.removeIpModal;

  var urls = this._opts.urls;

  var optionArr = [];

  for (var i=0;i<urls.length;i++) {
	
	var split_snapshot = urls[i].split("=:=");
    this.NF_name = split_snapshot[0].slice(5);
    
	optionArr.push({name:this.NF_name,value:urls[i]});
  }

  if (optionArr.length>0) {
    toShow.contents[1].options = optionArr;
  }

  cb(null,toShow);
};

exports.manual_remove_url = function(params,cb) {

  var index = this._opts.urls.indexOf(params.snapshot_url||'');

  if (index>-1) {
    this._opts.urls.splice(index,1);
    this.save();
  }
  cb(null,messages.removeIpSuccess);
};