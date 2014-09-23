exports.probeGreeting = {
  "contents":[
    { "type":"paragraph",  "text":"Manage your forecast.io API keys"},
	{ "type":"paragraph", "text":""},
    { "type":"submit", "name": "Add New", "rpc_method": "manual_get_url" },
    { "type":"submit", "name": "Remove Existing", "rpc_method": "manual_show_remove" },
	{ "type":"paragraph", "text":""},
    { "type":"close", "text":"Close"}
  ]
};

exports.fetchIpModal = {
  "contents":[
    { "type":"paragraph", "text":"Please enter your location name, forecast.io API key, latitude and longitude, update frequency, preferred units and desired devices"},
	{ "type":"paragraph", "text":""},
	{ "type":"input_field_text", "field_name": "name", "value": "", "label": "Location", "placeholder": "", "required": true},
    { "type":"input_field_text", "field_name": "snapshot_url", "value": "", "label": "API key", "placeholder": "", "required": true},
    { "type":"input_field_text", "field_name": "latitude", "value": "", "label": "Latitude", "placeholder": "", "required": true},
    { "type":"input_field_text", "field_name": "longitude", "value": "", "label": "Longitude", "placeholder": "", "required": true},
    { "type":"input_field_text", "field_name": "frequency", "value": "", "label": "Update frequency (min)", "placeholder": "", "required": true},
	{ "type":"input_field_select", "field_name": "units", "label": "Preferred units", "options": [{ "name": "SI", "value": "si", "selected": true},{ "name": "US", "value": "us", "selected": false},{ "name": "CA", "value": "ca", "selected": false},{ "name": "UK", "value": "uk", "selected": false}], "required": true },
	{ "type":"paragraph", "text":""},
	{ "type":"paragraph", "text":"Current:"},
	{ "type":"input_field_select", "field_name": "temp", "label": "Temperature", "options": [{ "name": "Yes", "value": "yes", "selected": true},{ "name": "No", "value": "no", "selected": false}], "required": true },
	{ "type":"input_field_select", "field_name": "app_temp", "label": "Apparent Temperature", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "humidity", "label": "Humidity", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "wind_spd", "label": "Wind Speed", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "wind_dir", "label": "Wind Direction", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "precip_prob", "label": "Precipitation Probability", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "precip_int", "label": "Precipitation Intensity", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "precip_type", "label": "Precipitation Type", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "dewpoint", "label": "Dewpoint", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "pressure", "label": "Barometric Pressure", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "current", "label": "Current Summary", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "icon", "label": "Icon", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "visibility", "label": "Visibility", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "cloudCover", "label": "Cloud Cover", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "ozone", "label": "Ozone", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "alerts", "label": "Weather Alerts", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"paragraph", "text":""},
	{ "type":"paragraph", "text":"Outlook:"},
	{ "type":"input_field_select", "field_name": "day_summ", "label": "Next 24h Summary", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "tonightTemperatureMin", "label": "Overnight minimum", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "todayTemperatureMax", "label": "Today's maximum", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "tmwTemperatureMax", "label": "Tomorrow's maximum", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "precipAccumulation", "label": "Snow accumulation", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "tmwprecipAccumulation", "label": "Tomorrow's snow accumulation", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "sunsetTime", "label": "Sunset", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"input_field_select", "field_name": "sunriseTime", "label": "Sunrise (tomorrow)", "options": [{ "name": "Yes", "value": "yes", "selected": false},{ "name": "No", "value": "no", "selected": true}], "required": true },
	{ "type":"paragraph", "text":""},
	{ "type":"submit", "name": "Add", "rpc_method": "manual_set_url" },
	{ "type":"submit", "name": "Back", "rpc_method": "back" },
	{ "type":"paragraph", "text":""},
    { "type":"link", "name": "Get API key", "href": "https://developer.forecast.io/register" },
	{ "type":"paragraph", "text":""},    
	{ "type":"link", "name": "Get lat/long", "href": "http://www.latlong.net/" },
	{ "type":"paragraph", "text":""},
	{ "type":"link", "name": "Forecast.io API docs", "href": "https://developer.forecast.io/docs/v2" },
	{ "type":"paragraph", "text":""},
	{ "type":"close", "text":"Cancel"}
  ]
};

exports.removeIpModal = {
  "contents":[
    { "type":"paragraph", "text":"Please choose the API key to remove"},
    { "type":"input_field_select", "field_name": "snapshot_url", "label": "Choose device", "options": [{ "name": "No devices", "value": "", "selected": true}], "required": false },
    { "type":"submit", "name": "Remove", "rpc_method": "manual_remove_url" },
	{ "type":"submit", "name": "Back", "rpc_method": "back" },
	{ "type":"paragraph", "text":""},
    { "type":"close", "text":"Close"}
  ]
};


exports.removeIpSuccess = {
  "contents": [
    { "type":"paragraph",    "text":"Your API key device has been removed."},
    { "type":"paragraph",    "text":"Important: you will still need to manually delete the device(s) from your dashboard"},
	{ "type":"paragraph", "text":""},
    { "type":"close", "text":"Close"}
  ]
}

exports.finish = {
  "finish": true
};