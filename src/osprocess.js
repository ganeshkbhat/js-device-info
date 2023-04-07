/**
 * 
 * Package: jssysinfo
 * Author: Ganesh B
 * Description: Nodejs npm module to provide all hardware device, os, drivers information of the system. supports major operating systems
 * Install: npm i jssysinfo --save
 * Github: https://github.com/ganeshkbhat/js-device-info
 * npmjs Link: https://www.npmjs.com/package/jssysinfo
 * File: osprocess.js
 * File Description: 
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';

var os = require('os');

var os_methods = [
  'hostname', 'type', 'platform', 'arch', 
  'release', 'uptime', 'loadavg', 'totalmem', 
  'freemem', 'cpus', 'networkInterfaces'
];

var process_methods = [
  'cwd', 'getgid', 'getuid', 'memoryUsage' 
];

var process_properties = [
  'env', 'version', 'versions', 'installPrefix', 'pid', 'title' 
];

var result = module.exports = { os: {}, process: {} };

os_methods.forEach(function (method) {
  result.os[method] = os[method]();
});

process_methods.forEach(function (method) {
  result.process[method] = process[method]();
});

process_properties.forEach(function (property) {
  result.process[property] = process[property];
});

var now = new Date();

result.timestamp = now.valueOf();
result.currentDate = now;
