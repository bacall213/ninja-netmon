exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Welcome to the Ninja CPU Monitor"},
    { "type": "paragraph", "text": "You can choose how often you want the CPU usage to be updated. For example, a value of 1000 updates every 1 second and a value of 5000 updates every 5 seconds.\n\rThe default value is 4 seconds (4000)."},
    { "type": "input_field_text", "field_name": "poll_interval", "value": "4000", "label": "Update Frequency", "required": true},
    { "type": "submit", "name": "Save", "rpc_method": "echo" },
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "The following update frequency has been saved: "}
  ]
};
