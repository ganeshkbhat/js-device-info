/**
 * 
 * Package: jssysinfo
 * Author: Ganesh B
 * Description: Nodejs npm module to provide all hardware device, os, drivers information of the system. supports major operating systems
 * Install: npm i jssysinfo --save
 * Github: https://github.com/ganeshkbhat/js-device-info
 * npmjs Link: https://www.npmjs.com/package/jssysinfo
 * File: mac.js
 * File Description: 
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';



var sysinfo = {
    os: {},
    devices: {
        motherboard: {},
        networkInterfaces: {},
        scsi: {},
        pci: {},
        usb: {},
        drives: {},
        cpus: {},
        gpus: {},
        dmi: {},
        memory: {}
    },
    filesystem: {},
    processes: {
        processes: {},
        users: {}
    },
    processPid: {},
    network: {}
}

module.exports = sysinfo;
