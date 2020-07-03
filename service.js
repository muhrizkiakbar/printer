// import EventEmitter from 'events'
// import HTTP from 'http'
// import Socket from 'socket.io'
// import Printer from './printer.js'
// import { CFG } from './constant.js'

const EventEmitter = require('events');
const HTTP = require('http');
const Socket = require('socket.io');
const Printer = require('./printer.js');
const { CFG } = require('./constant.js');

class Service extends EventEmitter {
  constructor () {
    super()

    this.http = HTTP.createServer((req, res) => {
      res.end('Recta Print Service')
    })
    this.http.setTimeout(1000)

    this.io = new Socket(this.http)
    this.io.use((socket, next) => {
      const token = socket.handshake.query.token
      const appkey = 0

      // if (token !== appkey)
      //   return next(new Error('Not Authorized'))

      return next()
    })
    this.io.on('connection', (socket) => {
      socket.on('message', (data) => {
        this.emit('message', data)

        this.printer.print(Buffer.from(data))
      })
    })

    this.printer = new Printer('serial', {
        option: {
            comport: "COM10",
            baudrate: "9600"
        }
    })
    this.printer.on('open', () => {
      this.emit('printer:open')
    })
    this.printer.on('close', () => {
      if (this.http.listening) {
        this.io.close(() => {
          this.http.close(() => {
            this.emit('error', new Error('Printer has closed'))
            this.emit('close')
          })
        })
      }

      this.emit('printer:close')
    })
    this.printer.on('error', (e) => {
      this.emit('error', e)
      this.emit('printer:error', e)
    })
  }

  start () {
    return new Promise((resolve, reject) => {
      this.http.listen(1811, () => {
        this.printer.open().then(() => {
          this.emit('open')

          return resolve()
        }).catch((e) => {
          this.http.close(() => {
            return reject(e)
          })
        })
      }).once('error', (error) => {
        return reject(error)
      })
    })
  }

  stop () {
    return new Promise((resolve, reject) => {
      this.io.close(() => {
        this.http.close(() => {
          this.printer.close().then(() => {
            this.emit('close')

            return resolve()
          }).catch((e) => {
            return reject(e)
          })
        })
      })
    })
  }
}

module.exports = Service
