/**
 * 
 * Package: jssysinfo
 * Author: Ganesh B
 * Description: Nodejs npm module to provide all hardware device, os, drivers information of the system. supports major operating systems
 * Install: npm i jssysinfo --save
 * Github: https://github.com/ganeshkbhat/js-device-info
 * npmjs Link: https://www.npmjs.com/package/jssysinfo
 * File: linux.js
 * File Description: 
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';


let macLinuxCommands = {
    "DEVICES_CPUARCH_UNAME": "uname -a",
    "DEVICES_CPUINFO": "cat /proc/cpuinfo",
    "DEVICES_LSCPU": "lscpu",
    "DEVICES_MEMINFO": "cat /proc/meminfo",
    "DEVICES_ALL_LSHW": "lshw -numeric",
    "DEVICES_LSUSB": "lsusb -v",
    "DEVICES_LSPCI": "lspci -v",
    "DEVICES_CPU_TOPUSAGE_PS": "ps -eo pcpu,user,args --no-headers | sort -k 1 -n | tail -n 10 | sort -k 1 -nr | cut -c 1-70",
    "DEVICES_MEM_TOPUSAGE_PS": "ps -eo pmem,pid,cmd | sort -k 1 -n | tail -n 10 | sort -k 1 -nr | cut -c 1-70",
    "DEVICES_MEM_SYSCTL": "sysctl vm.page_pageable_internal_count",
    "DISKINFO_DF_KP": "df -kP",
    "DISKINFO_DF": "df -h",
    "DRIVEINFO_FREE": "free -h",
    "DRIVEINFO_PARTITIONS": "cat /proc/partitions",
    "OS_ISSUES": "cat /etc/issue",
    "DMIDECODE": "export LC_ALL=C; dmidecode ; unset LC_ALL",
    "DMIDECODE_CPU": "export LC_ALL=C; dmidecode -t processor -t cache; unset LC_ALL",
    "VMSTATS": "vmstat -S m",
    "VM_STATS": "vm_stat",
    "NETWORK_OPENPORTS_LSOF": "lsof -Pni4 | grep ESTABLISHED",
    "NETWORK_IFCONFIG": "ifconfig",
    "NETWORK_NETSTAT_IP": "ip -s link",
    "FILESYSTEM_OPENFILES": "cat /proc/sys/fs/file-nr",
    "PROCESSESUSERS_PS": "ps hax -o user | sort | uniq -c",
    "PROCESSESUSERS_WHO": "who",
    "PROCESSESUSERS_ALL": "who | grep -v localhost | wc -l",
    "PROCESSESUSERS_WHOAMI": "whoami",
    "PROCESSESUSERS_TOP_TOTAL": "top -bn1 | awk 'NR > 7 && $8 ~ /R|S|D|T/ { print $12 }'",
    "PROCESSESUSERS_TOP_SLEEPING": "top -bn1 | awk 'NR > 7 && $8 ~ /Z/ { print $12 }'",
    "PROCESSESUSERS_ALL": "ps -aux",
    "PROCESSESUSERS_PROC": "ls -l /proc | grep '^d'",
    "PROCESSESUSERS_PROC_CRYPTO": "cat /proc/crypto",
    "PROCESSESUSERS_PROC_DISKSTATS": "cat /proc/diskstats",
    "PROCESSESUSERS_PROC_FILESYSTEMS": "cat /proc/filesystems",
    "PROCESSESUSERS_PROC_KMSG": "cat /proc/kmsg",
    "PROCESSESUSERS_PROC_MEMINFO": "cat /proc/meminfo",
    "PROCESSESUSERS_PROC_SCSI": "cat /proc/scsi",
    "PROCESSESUSERS_PROC_TTY": "cat /proc/tty",
    "PROCESSESUSERS_PROC_VERSION": "cat /proc/version",

    // PID => Replace PID
    "PROCESSESUSERS_PID_CMDLINE": "/proc/PID/cmdline",
    "PROCESSESUSERS_PID_CPU": "/proc/PID/cpu",
    "PROCESSESUSERS_PID_CWD": "/proc/PID/cwd",
    "PROCESSESUSERS_PID_ENVIRON": "/proc/PID/environ",
    "PROCESSESUSERS_PID_EXE": "/proc/PID/exe",
    "PROCESSESUSERS_PID_FD": "/proc/PID/fd",
    "PROCESSESUSERS_PID_MAPS": "/proc/PID/maps",
    "PROCESSESUSERS_PID_MEM": "/proc/PID/mem",
    "PROCESSESUSERS_PID_ROOT": "/proc/PID/root",
    "PROCESSESUSERS_PID_STAT": "/proc/PID/stat",
    "PROCESSESUSERS_PID_STATM": "/proc/PID/statm",
    "PROCESSESUSERS_PID_STATUS": "/proc/PID/status",

}

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
