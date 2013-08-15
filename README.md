Ninja Network Monitor
=====================
Author: Brian Call 
Version: 0.0.5
Status: Stable 
License: MIT


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


## License
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
