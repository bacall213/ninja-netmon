Ninja Network Monitor
=====================
Author: Brian Call
Version: 0.0.3
Status: Stable
License: BSD


## Installation
### Step 1 - Fetch the driver
```
cd PATH_TO_NINJA_CLIENT/drivers
git clone https://github.com/bacall213/ninja-netmon.git
cd ninja-netmon
npm install
```


### Step 2 - Restart the Ninja Block process
```
sudo service ninjablock restart
```


## Notes
- Install instructions have not been checked
- Default interface: wlan0
- Default refresh rate: 1 second
- Driver creates individual graphs for Tx and Rx
- Data refresh rate behind the scenes is 1 second and is not configurable through the web UI, thus refreshing more often than once every second will have to be configured in lib/netrx.js and lib/nettx.js.
- Interface identifiers: wlan0, eth0, en0, lo, l0
- Data parsed from /sys/class/net/<device>/statistics/<rx_bytes|tx_bytes>
