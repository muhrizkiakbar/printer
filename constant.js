

const _ = require('lodash');

const CFG = {
  defaults: {
    printer: {
      adapter: 'serial',
      option : {
        comport: 'COM10',
        baudrate: 9600
      },
    },
    app: {
      port: 1811,
      key : _.random(1000000000, 9999999999).toString(),
    },
  },
}


const PRINT_TEST =
`\x1b\x40\x1b\x61\x01
***   PRINTER TEST  ***
***   RECTA PRINT   ***
***     v     ***
*** --------------- ***
\x1b\x61\x00LEFT ALIGN
\x1b\x61\x01CENTER ALIGN
\x1b\x61\x02RIGHT ALIGN
\x1b\x61\x00\x1b\x2d\x01UNDERLINE
\x1b\x2d\x02UNDERLINE DOUBLE
\x1b\x2d\x00\x1b\x45\x01EMPHASIZED
\x1b\x45\x00\x1b\x47\x01DOUBLE STRIKE
\x1b\x47\x00\x1b\x61\x01
\x1d\x6b\x41\x0c123456789012\n\n`

module.exports = {
  CFG, PRINT_TEST
}
