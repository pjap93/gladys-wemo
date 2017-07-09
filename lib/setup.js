var WeMo = require('wemo'); 
var motion = require('./motion.js');
var devicestypefound = require('./devicestype.js');

module.exports = function(){
  var client = WeMo.Search();
  
  client.on('found', function(device) {
    
    if (device.deviceType === devicestypefound.Switch) {
    var newDevice = {
      device: {
        name: device.friendlyName,
        protocol: 'wifi',
        service: 'wemo',
        identifier: device.ip + ':' + device.port,
      },
      types: [
        {
          type:'binary',
          sensor: false,
          min: 0,
          max: 1,
	  value: 0
        }
      ]
    };
    
    gladys.device.create(newDevice);
    };


    if (device.deviceType === devicestypefound.Motion) {
    var newDevice = {
      device: {
        name: device.friendlyName,
        protocol: 'wifi',
        service: 'wemo',
        identifier: device.ip + ':' + device.port,
      },
      types: [
        {
	  identifier:'Motion',
          type:'motion',
          sensor: true,
          min: -1,
          max: 1,
	  value: -1,
	  display: true
        }
      ]
    };
    
    gladys.device.create(newDevice);
    motion();
    };


  });

  return Promise.resolve();
};
