var configMessages = require('./config-messages');

/**
 * Called from the driver's config method when a
 * user wants to see a menu to configure the driver
 * @param  {Function} cb Callback to send a response back to the user
 */
exports.menu = function(nic_opt,interval_opt,cb) {
  var returnMenu = configMessages.menu;
  returnMenu.contents[2].value = nic_opt;
  returnMenu.contents[3].value = interval_opt;
  cb(null,configMessages.menu);
};

/**
 * Called when a user clicks the 'Echo back to me'
 * button we sent in the menu request
 * @param  {Object}   params Parameter object
 * @param  {Function} cb     Callback to send back to the user
 */

exports.echo = function(opts,params,cb) {

  var echoText = params.echoText;
  var payloadToSend = configMessages.echo;
  opts.poll_interval = params.poll_interval;
  opts.nic = params.nic;
  this.save();

  if (payloadToSend.contents[1] && payloadToSend.contents[2]) {
    payloadToSend.contents[1].text = "The Ninja Network Monitor will refresh throughput on " + params.nic + " every " + params.poll_interval + " seconds.";
    payloadToSend.contents[2].text = params.poll_interval;
  } else if (payloadToSend.contents[1] && !payloadToSend.contents[2]) {
    payloadToSend.contents[1].text = "The Ninja Network Monitor will refresh throughput on " + params.nic + " every " + params.poll_interval + " seconds.";
  } else if (payloadToSend.contents[2] && !payloadToSend.contents[1]) {
    payloadToSend.contents[1].text = "The Ninja Network Monitor will refresh throughput on " + params.nic + " every " + params.poll_interval + " seconds.";
  } else {
    payloadToSend.contents.push({ "type": "paragraph", "text": "The Ninja Network Monitor will refresh throughput on " + params.nic + " every " + params.poll_interval + " seconds." });
    payloadToSend.contents.push({ "type": "close"    , "name": "Close" });
  }

  cb(null,payloadToSend);
};
