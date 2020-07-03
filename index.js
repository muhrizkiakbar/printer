const Service = require('./service.js')
const OS = require('os');


try {
  service = new Service()
  service.on('open', () => {
    isStart = true
    console.log('Service Started')
  })
  service.on('close', () => {
    isStart = false
    service = null
    console.log('Service Stoped')
  })
  service.on('message', () => {
    console.log('Receive printing message')
  })
  service.on('error', (e) => {
    console.log(e)
  })
  service.start().catch((e) => {
    console.log(e)
  })
} catch (e) {
  console.log(e)
}
