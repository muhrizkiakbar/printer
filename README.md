# Printer POS
This repo adopts from [recta-host](https://github.com/adenvt/recta-host), but i customize the scripts because have a issues that service sometimes force close. so i decided to remake the script without electron package.

Dont forget !! You must use [Zadig](http://zadig.akeo.ie/) to install the WinUSB driver for your USB device.
Otherwise you will get LIBUSB_ERROR_NOT_SUPPORTED when attempting to open devices.

# How to use it
* You must change `const CFG` value in  `constant.js`.
* Adapters only have three option (`usb`, `serial`, and `network`). Every options have a class that need option setting for your device(printer), look at adapter folder.
* `npm install`
* Enjoy it !!!

