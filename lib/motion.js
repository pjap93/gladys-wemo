var WeMo = require('wemo'); 
var Promise = require('bluebird');

module.exports = function motion(){
    
gladys.device.getByService({service: 'wemo'})
.then(function(devices){
//console.log(devices);

for (dev in devices){
	if(devices[dev]['name'] === "WeMo Motion") {
		//console.log(devices[dev]);
		var Vid = devices[dev]['id'];
		//console.log(Vid);

		gladys.deviceType.getByDevice({device: devices[dev]['id']})
		.then(function(devicestype){
			console.log(devicestype);

		}); 

		gladys.deviceType.getAll()
		.then(function(devicestype){
			//console.log(devicestype);
			for (devtype in devicestype){
				console.log(devices[dev]['id']);
				console.log(devicestype[devtype]['device']);
				if(devices[dev]['id'] === devicestype[devtype]['device']){
				
				var para = devices[dev]['identifier'].split(':');
				
				var wemoMotion = new WeMo(para[0], para[1]);
				wemoMotion.state = 0;
				setInterval(function() {
					wemoMotion.getBinaryState(function(err, result) {
					if (err) console.error(err);
						console.log(parseInt(result));
						console.log(parseInt(wemoMotion.state));

						console.log(devicestype[devtype]['id']);
						var d = new Date();
						switch (parseInt(result) - wemoMotion.state) {
						case 1  : 
							console.log('move!');
							//gladys.deviceType.exec({devicetype: devicestype[devtype]['id'], value: 1})
							gladys.deviceState.create({devicetype: devicestype[devtype]['id'], value: 1, datetime: d})
							  .then(console.log)
							  .catch(console.log);
							break;
						case 0  : 
							//console.log('.');         
							break;
						case -1 : 
							console.log('no motion'); 
							//gladys.deviceType.exec({devicetype: devicestype[devtype]['id'], value: 0})
							gladys.deviceState.create({devicetype: devicestype[devtype]['id'], value: 0, datetime: d})
							  .then(console.log)
							  .catch(console.log);
							break;
						default : console.error('unexpected error'); break;
						}
					wemoMotion.state = parseInt(result);
					});
				}, 2000);

				};
			};

		}); 

	};
};

});

};
