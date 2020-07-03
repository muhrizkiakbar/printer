
const Service = require('./service.js')
const OS = require('os');
const LibUSB = require('usb');

a = new Service();
//a.on('open', () => {
// this.isStart = true
//
// this.log('Service Started')
//})
try {
 a.printer.print("tes");
} catch (e) {
 console.log(e)
}


