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
    { "type":"paragraph", "text":"Please enter your forecast.io API key"},
	{ "type":"paragraph", "text":""},
	{ "type":"input_field_text", "field_name": "name", "value": "", "label": "Location", "placeholder": "", "required": true},
    { "type":"input_field_text", "field_name": "snapshot_url", "value": "", "label": "API key", "placeholder": "", "required": true},
    { "type":"input_field_text", "field_name": "latitude", "value": "", "label": "Latitude", "placeholder": "", "required": true},
    { "type":"input_field_text", "field_name": "longitude", "value": "", "label": "Longitude", "placeholder": "", "required": true},
	{ "type":"input_field_select", "field_name": "units", "label": "Preferred units", "options": [{ "name": "SI", "value": "si", "selected": true},{ "name": "US", "value": "us", "selected": false},{ "name": "CA", "value": "ca", "selected": false},{ "name": "UK", "value": "uk", "selected": false}], "required": true },
	{ "type":"submit", "name": "Add", "rpc_method": "manual_set_url" },
	{ "type":"submit", "name": "Back", "rpc_method": "back" },
	{ "type":"paragraph", "text":""},
    { "type":"link", "name": "Get API key", "href": "https://developer.forecast.io/register" },
	{ "type":"paragraph", "text":""},    
	{ "type":"link", "name": "Get lat/long", "href": "http://www.latlong.net/" },
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
    { "type":"paragraph",    "text":"Important: you will still need to manually delete the widget from your dashboard"},
	{ "type":"paragraph", "text":""},
	{ "type":"submit", "name": "Remove another device", "rpc_method": "manual_show_remove" },
	{ "type":"paragraph", "text":""},
    { "type":"close", "text":"Close"}
  ]
}

exports.finish = {
  "finish": true
};