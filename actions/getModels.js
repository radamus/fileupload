var helpers = require("../helpers");
var KEY_FILE = "key.json";

var task =  function(request, callback){
	var keyConfig = helpers.readJSONFile(KEY_FILE).key;		
	var key = request.query.key;
	console.log(keyConfig);
	console.log(key);
	if(key !== keyConfig) {
		callback("wrong access key");	
	}
	else {
		callback(null, {binary:true, filePath:__dirname + "\\zad.zip"});
	}

}

exports.action = task