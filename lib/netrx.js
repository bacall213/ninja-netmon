var stream = require('stream')
  , util = require('util')
  , os = require('os')
  , exec = require('child_process').exec
  , child;

// Give our device a stream interface
util.inherits(NetRxDevice,stream);

// Export it
module.exports=NetRxDevice;

/**
 * Creates a new Device Object
 *
 * @property {Boolean} readable Whether the device emits data
 * @property {Boolean} writable Whether the data can be actuated
 *
 * @property {Number} G - the channel of this device
 * @property {Number} V - the vendor ID of this device
 * @property {Number} D - the device ID of this device
 *
 * @property {Function} write Called when data is received from the Ninja Platform
 *
 * @fires data - Emit this when you wish to send data to the Ninja Platform
 */
function NetRxDevice(app, opts) {

  var self = this;
  this._app = app;

  // This device will emit data
  this.readable = true;
  // This device cannot be actuated
  this.writeable = false;

  this.G = "0"; // G is a string a represents the channel
  this.V = 0; // 0 is Ninja Blocks' device list
  this.D = 531; // 531 Incoming Ninjablock network activity (Kbps)
  this.name = 'Net@' + os.hostname() + ' ('+opts.nic+'|Rx)';

  var real_poll_interval = opts.poll_interval * 1000;
  var ifaces = os.networkInterfaces();

  process.nextTick(function() {

    setInterval(function() {

      if (opts.nic in ifaces) {
        self._app.log.debug('[ninja-netmon] found ' + opts.nic + ' for monitoring');

        var execcmdrx = 'rx1=`cat /sys/class/net/'+ opts.nic +'/statistics/rx_bytes`; sleep 1; rx2=`cat /sys/class/net/'+ opts.nic +'/statistics/rx_bytes`; rx_bps=$((($rx2*8)-($rx1*8))); rx_kbps=$(($rx_bps / 1024)); echo $rx_kbps;'

        child = exec(execcmdrx,
        function (error, stdout, stderr) {
          stdout.replace(/(\n|\r|\r\n)$/, '');
          self._app.log.debug('[ninja-netmon] %s Rx: %s. Updating every %s seconds.', opts.nic, stdout, opts.poll_interval);
          self.emit('data',stdout);
          });
      } else {
        /** 
          * User-specific NIC wasn't found in os.networkInterfaces()
          * Output error and move on
          * Something else should happen here
        **/
        self._app.log.error('[ninja-netmon] is trying to monitor ' + opts.nic + ', but I cannot find it on this system.');
      };
    }, real_poll_interval);
  });
};

/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
NetRxDevice.prototype.write = function(data) {

  // I'm being actuated with data!
  self._app.log.error('[ninja-netmon] Was actuated but should not have been');
};
