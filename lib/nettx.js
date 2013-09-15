var stream = require('stream')
  , util = require('util')
  , os = require('os')
  , exec = require('child_process').exec
  , child;

// Give our device a stream interface
util.inherits(NetTxDevice,stream);

// Export it
module.exports=NetTxDevice;

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
function NetTxDevice(app, opts) {

  var self = this;
  this._app = app;

  // This device will emit data
  this.readable = true;
  // This device cannot be actuated
  this.writeable = false;

  this.G = "0"; // G is a string a represents the channel
  this.V = 0; // 0 is Ninja Blocks' device list
  this.D = 541; // 541 Outgoing Ninjablock network activity (Kbps)
  this.name = 'Network@' + os.hostname() + ' ('+opts.nic+' | Tx | Kbps)';

  var real_poll_interval = opts.poll_interval * 1000;

  process.nextTick(function() {

    setInterval(function() {

    switch(opts.nic)
    {
    case "wlan0":
      var execcmdtx = 'tx1=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; sleep 1; tx2=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; tx_bps=$((($tx2*8)-($tx1*8))); tx_kbps=$(($tx_bps / 1024)); echo $tx_kbps;'
      
      break;
    case "eth0":
      var execcmdtx = 'tx1=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; sleep 1; tx2=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; tx_bps=$((($tx2*8)-($tx1*8))); tx_kbps=$(($tx_bps / 1024)); echo $tx_kbps;'

      break;
    case "en0":
      var execcmdtx = 'tx1=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; sleep 1; tx2=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; tx_bps=$((($tx2*8)-($tx1*8))); tx_kbps=$(($tx_bps / 1024)); echo $tx_kbps;'

      break;
    case "lo":
      var execcmdtx = 'tx1=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; sleep 1; tx2=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; tx_bps=$((($tx2*8)-($tx1*8))); tx_kbps=$(($tx_bps / 1024)); echo $tx_kbps;'

      break;
    case "l0":
      var execcmdtx = 'tx1=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; sleep 1; tx2=`cat /sys/class/net/'+ opts.nic +'/statistics/tx_bytes`; tx_bps=$((($tx2*8)-($tx1*8))); tx_kbps=$(($tx_bps / 1024)); echo $tx_kbps;'

      break;
    default:
      var execcmdtx = 'tx1=`cat /sys/class/net/wlan0/statistics/tx_bytes`; sleep 1; tx2=`cat /sys/class/net/wlan0/statistics/tx_bytes`; tx_bps=$((($tx2*8)-($tx1*8))); tx_kbps=$(($tx_bps / 1024)); echo $tx_kbps;'

      break;
    }

    child = exec(execcmdtx,
    function (error, stdout, stderr) {
      stdout.replace(/(\n|\r|\r\n)$/, '');
      self._app.log.debug('[ninja-netmon] %s Tx: %s. Updating every %s seconds.', opts.nic, stdout, opts.poll_interval);
      self.emit('data', stdout);
      });
    }, real_poll_interval);
  });
};

/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
NetTxDevice.prototype.write = function(data) {

  // I'm being actuated with data!
  self._app.log.error('[ninja-netmon] Was actuated but should not have been');
};
