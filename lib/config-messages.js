exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Welcome to the Ninja Network Monitor"},
    { "type": "paragraph", "text": "You can choose how often you want the network monitor to update (in seconds) and which network card you want to monitor. \n\rThe default refresh interval is 5 seconds and the default interface is wlan0."},
    { "type": "input_field_text", "field_name": "nic", "value": "wlan0", "label": "Network Interface", "required": true},
    { "type": "input_field_text", "field_name": "poll_interval", "value": "5", "label": "Update Interval", "required": true},
    { "type": "submit", "name": "Save", "rpc_method": "echo" },
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "The Ninja Network Monitor will refresh traffic on the following interface every x seconds: "}
  ]
};
