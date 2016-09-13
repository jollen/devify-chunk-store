var server = require('./libs/coap-broker');
var mem = require('memory-chunk-store');
var chunks = mem(10);

var onmessage = function(payload) {
	var obj = JSON.parse(payload.data);
	var paths = payload.pathname.split('/');
	var deviceId = paths[2];

	// devify chunk store message
	var index = obj.index;
	var chunk = obj.chunk;

	if (!index) return;
	if (!chunk) return;

	chunks.put(index, new Buffer(chunk), function (err) {
	  if (err) throw err

	  chunks.get(index, function (err, chunk) {
	    if (err) throw err
	    console.log('[chunk] put: ' + chunk);
	  })
	});
};

server.start({
	onmessage: onmessage
});
