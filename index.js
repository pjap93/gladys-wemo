module.exports = function(sails) {
    
    var setup = require('./lib/setup.js');
    var exec = require('./lib/exec.js');
    var motion = require('./lib/motion.js');
    
    gladys.on('ready', function(){
	motion();
    });

    return {
        setup: setup,
        exec: exec,
	motion: motion
    };
};
