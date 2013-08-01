var stream = require('stream')
  , util = require('util')
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

  this.G = "3"; // G is a string a represents the channel
  this.V = 0; // 0 is Ninja Blocks' device list
  this.D = 2000; // 2000 is a generic sandbox device
  this.name = 'Ninja Network Monitor ('+opts.nic+' | Rx | Kbps)';

  var real_poll_interval = opts.poll_interval * 1000;

  process.nextTick(function() {

    setInterval(function() {

    // Possible ways to monitor network usage:
    //  bwm-ng
    //  iftop (requires root)
    //  parse /proc/net/dev
    //  parse /sys/class/net/<iface>/statistics/[tx_bytes | rx_bytes]

    // RX_BYTES from /sys/class/net/wlan0/statistics
    // rx1=`cat /sys/class/net/wlan0/statistics/rx_bytes`; sleep 1; rx2=`cat /sys/class/net/wlan0/statistics/rx_bytes`; rx_bps=$(((($rx2*8)-($rx1*8))); rx_kbps=$(($rx_bps / 1024));

    var execcmdrx = 'rx1=`cat /sys/class/net/wlan0/statistics/rx_bytes`; sleep 1; rx2=`cat /sys/class/net/wlan0/statistics/rx_bytes`; rx_bps=$((($rx2*8)-($rx1*8))); rx_kbps=$(($rx_bps / 1024)); echo $rx_kbps;'
    child = exec(execcmdrx,
    function (error, stdout, stderr) {
      stdout.replace(/(\n|\r|\r\n)$/, '');
      self._app.log.debug('[ninja-netmon] %s Rx: %s. Updating every %s seconds.', opts.nic, stdout, opts.poll_interval);
      self.emit('data',stdout);
      });

//    var execcmdtx = 'tx1=`cat /sys/class/net/wlan0/statistics/tx_bytes`; sleep 1; tx2=`cat /sys/class/net/wlan0/statistics/tx_bytes`; tx_bps=$((($tx2*8)-($tx1*8))); tx_kbps=$(($tx_bps / 1024)); echo $tx_kbps;'

//    child = exec(execcmdtx,
//    function (error, stdout, stderr) {
//      stdout.replace(/(\n|\r|\r\n)$/, '');
//      self._app.log.debug('[ninja-netmon] %s Tx: %s. Updating every %s seconds.', opts.nic, stdout, opts.poll_interval);
//      self.emit('data', stdout);
//      });
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
