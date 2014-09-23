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

  var snapshot_url = "name:"+params.name+"=:=latitude:"+params.latitude+"=:=longitude:"+params.longitude+"=:=APIkey:"+params.snapshot_url+"=:=units:"+params.units+"=:=frequency:"+params.frequency+"=:=temp:"+params.temp+"=:=app_temp:"+params.app_temp+"=:=humidity:"+params.humidity+"=:=wind_spd:"+params.wind_spd+"=:=wind_dir:"+params.wind_dir+"=:=precip_prob:"+params.precip_prob+"=:=precip_int:"+params.precip_int+"=:=precip_type:"+params.precip_type+"=:=dewpoint:"+params.dewpoint+"=:=pressure:"+params.pressure+"=:=current:"+params.current+"=:=day_summ:"+params.day_summ+"=:=icon:"+params.icon+"=:=visibility:"+params.visibility+"=:=cloudCover:"+params.cloudCover+"=:=ozone:"+params.ozone+"=:=tonightTemperatureMin:"+params.tonightTemperatureMin+"=:=todayTemperatureMax:"+params.todayTemperatureMax+"=:=tmwTemperatureMax:"+params.tmwTemperatureMax+"=:=precipAccumulation:"+params.precipAccumulation+"=:=tmwprecipAccumulation:"+params.tmwprecipAccumulation+"=:=sunsetTime:"+params.sunsetTime+"=:=sunriseTime:"+params.sunriseTime+"=:=alerts:"+params.alerts;
  var indexa = this._opts.urls.indexOf(snapshot_url||'');

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