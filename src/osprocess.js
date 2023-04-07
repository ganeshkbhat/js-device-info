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


/**
 * CREDITS:
 * CPU TIMES taken from Repository
 * https://www.npmjs.com/package/node-os-utils
 */

var oscpuinfo = {
  average: function () {
    var totalIdle = 0
    var totalTick = 0
    var cpus = os.cpus()

    for (var i = 0, len = cpus.length; i < len; i++) {
      var cpu = cpus[i]
      for (var type in cpu.times) {
        totalTick += cpu.times[type]
      }
      totalIdle += cpu.times.idle
    }

    return {
      totalIdle: totalIdle,
      totalTick: totalTick,
      avgIdle: (totalIdle / cpus.length),
      avgTotal: (totalTick / cpus.length)
    }
  },
  usage: function (interval) {
    var self = this

    if (!interval) {
      interval = bucket.options.INTERVAL
    }

    return new Promise(function (resolve) {
      if (typeof interval !== 'number') {
        throw new TypeError('interval must be a number!')
      }

      var startMeasure = self.average()

      setTimeout(function () {
        var endMeasure = self.average()
        var idleDifference = endMeasure.avgIdle - startMeasure.avgIdle
        var totalDifference = endMeasure.avgTotal - startMeasure.avgTotal
        var cpuPercentage = (10000 - Math.round(10000 * idleDifference / totalDifference)) / 100

        return resolve(cpuPercentage)
      }, interval)
    })
  },
  free: function (interval) {
    var self = this

    if (!interval) {
      interval = bucket.options.INTERVAL
    }

    return new Promise(function (resolve) {
      if (typeof interval !== 'number') {
        throw new TypeError('interval must be a number!')
      }

      self.usage(interval)
        .then(function (cpuPercentage) {
          return resolve(100 - cpuPercentage)
        })
    })
  },
  count: function () {
    return os.cpus().length
  },
  model: function () {
    return os.cpus()[0].model
  },
  loadavg: function () {
    return os.loadavg()
  },
  loadavgTime: function (time) {
    time = parseInt(time, 10)

    var loads = os.loadavg()

    switch (time) {
      case 5:
        return loads[1]
      case 15:
        return loads[2]
      default: return loads[0]
    }
  }
}

result.oscpuinfo = oscpuinfo;

