Ninja Network Monitor
=====================
Author: Brian Call 
Version: 0.0.7
Status: Stable 
License: MIT


### Installation
#### Step 1 - Fetch the driver
```
cd PATH_TO_NINJA_CLIENT/drivers
git clone https://github.com/bacall213/ninja-netmon.git
cd ninja-netmon
npm install
```


#### Step 2 - Restart the Ninja Block process
```
sudo service ninjablock restart
```


### Notes
- Default interface: wlan0
- Default refresh rate: 1 second
- Driver creates individual graphs for Tx and Rx
- Data refresh rate behind the scenes is 1 second and is not configurable through the web UI, thus refreshing more often than once every second will have to be configured in lib/netrx.js and lib/nettx.js.
- Interface identifiers: wlan0, eth0, en0, lo, l0
- Data parsed from /sys/class/net/<device>/statistics/<rx_bytes|tx_bytes>



### Change History
##### 0.0.7
- Removed unneeded switch statement
- Added check to ensure user-selected interface is in os.networkInterfaces()
- Shortened default titles to prevent wrapping on widget
- Added debug messages for success/fail when interface is found
- TODO: Need to do something more than output a debug message when the device isn't found


##### 0.0.6
- Added change history to readme
- Changed device IDs from 2000 (sandbox) to 531 and 541 (ninjablock incoming/outout network)
- Updated config handlers with cleaner output
- Removed the poll interval from the network stat statements. The poll interval for the driver should be adjustable, but the actual poll interval peformed in the background to get Kbps should always be 1 second. 
- Added require('os') into each driver so that os.hostname() can be used to produce a more descriptive widget title



### License
Copyright (c) 2013 Brian Call

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
