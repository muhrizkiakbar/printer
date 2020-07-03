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
      key : _.random(1000000000, 9999999999).toString(), if you need more secure your printer set your key, see the documentation of recta host !!
    },
  },
}


const PRINT_TEST = "Test Print"

module.exports = {
  CFG, PRINT_TEST
}
